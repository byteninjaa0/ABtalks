import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { selectedDomain: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const progress = await getOrCreateDomainProgress(session.userId, user.selectedDomain);

  const [challengeSubs, recentSubs, allSubs] = await Promise.all([
    prisma.submission.findMany({
      where: { userId: session.userId, challengeId: { not: null } },
      select: { challengeId: true, challenge: { select: { dayNumber: true, category: true, difficulty: true } }, createdAt: true },
    }),
    prisma.submission.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        challenge: { select: { dayNumber: true } },
        problem: { select: { title: true } },
      },
    }),
    prisma.submission.findMany({
      where: { userId: session.userId },
      select: { createdAt: true, challenge: { select: { category: true } }, problem: { select: { category: true } } },
    }),
  ]);
  const solvedChallengeDays = new Set(
    challengeSubs
      .filter((s) => s.challenge)
      .map((s) => (s.challenge as { dayNumber: number }).dayNumber)
  );
  const totalSolved = solvedChallengeDays.size;
  const completionPercentage = Math.round((totalSolved / 60) * 100);
  const categoryCount: Record<string, number> = {};
  for (const s of challengeSubs) {
    const cat = (s.challenge as { category: string } | null)?.category;
    if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  }
  const difficultyCount: Record<string, number> = {};
  for (const s of challengeSubs) {
    const d = (s.challenge as { difficulty: string } | null)?.difficulty;
    if (d) difficultyCount[d] = (difficultyCount[d] || 0) + 1;
  }
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const byDay: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekAgo);
    d.setDate(d.getDate() + i);
    byDay[d.toISOString().slice(0, 10)] = 0;
  }
  for (const s of allSubs) {
    const key = s.createdAt.toISOString().slice(0, 10);
    if (byDay[key] !== undefined) byDay[key]++;
  }
  const weeklyData = Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({ day, submissions: count }));
  return NextResponse.json({
    currentDay: progress.currentDay,
    totalProblemsSolved: totalSolved,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    completionPercentage,
    recentActivity: recentSubs.map((s) => ({
      id: s.id,
      challengeId: s.challengeId,
      problemId: s.problemId,
      dayNumber: s.challenge?.dayNumber,
      problemTitle: s.problem?.title,
      result: s.result,
      createdAt: s.createdAt,
    })),
    categoryProgress: Object.entries(categoryCount).map(([name, value]) => ({ name, value })),
    difficultyBreakdown: Object.entries(difficultyCount).map(([name, value]) => ({ name, value })),
    weeklySubmissions: weeklyData,
  });
}
