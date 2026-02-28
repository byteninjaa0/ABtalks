import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

const VALID_DOMAINS = ["SE", "ML", "AI"] as const;

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const domainParam = searchParams.get("domain");
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { selectedDomain: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const domain =
    domainParam && VALID_DOMAINS.includes(domainParam as (typeof VALID_DOMAINS)[number])
      ? (domainParam as (typeof VALID_DOMAINS)[number])
      : user.selectedDomain;

  const [progress, challenges, challengeSubs] = await Promise.all([
    getOrCreateDomainProgress(session.userId, domain),
    prisma.challenge.findMany({
      where: { domain },
      orderBy: { dayNumber: "asc" },
    }),
    prisma.submission.findMany({
      where: {
        userId: session.userId,
        challengeId: { not: null },
        challenge: { domain },
      },
      select: { challenge: { select: { dayNumber: true } } },
    }),
  ]);

  const solvedDayNumbers = new Set(
    challengeSubs
      .filter((s) => s.challenge)
      .map((s) => (s.challenge as { dayNumber: number }).dayNumber)
  );
  const challengeByDay = new Map(challenges.map((c) => [c.dayNumber, c]));
  const maxUnlocked = progress.currentDay;

  const list = Array.from({ length: 60 }, (_, i) => {
    const dayNumber = i + 1;
    const challenge = challengeByDay.get(dayNumber);
    return {
      id: challenge?.id ?? null,
      dayNumber,
      category: challenge?.category ?? null,
      difficulty: challenge?.difficulty ?? null,
      description: challenge?.description ?? null,
      industryNote: challenge?.industryNote ?? null,
      solved: solvedDayNumbers.has(dayNumber),
      unlocked: dayNumber <= maxUnlocked,
      configured: !!challenge,
    };
  });

  return NextResponse.json({
    challenges: list,
    domain,
    currentDay: progress.currentDay,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    defaultDomain: user.selectedDomain,
  });
}
