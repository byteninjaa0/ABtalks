import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { currentDay: true, selectedDomain: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const challenges = await prisma.challenge.findMany({
    where: { domain: user.selectedDomain },
    orderBy: { dayNumber: "asc" },
  });
  const solvedDayNumbers = new Set(
    (
      await prisma.submission.findMany({
        where: { userId: session.userId, challengeId: { not: null } },
        select: { challenge: { select: { dayNumber: true } } },
      })
    )
      .filter((s) => s.challenge)
      .map((s) => (s.challenge as { dayNumber: number }).dayNumber)
  );
  const maxUnlocked = user.currentDay;
  const list = challenges.map((c) => ({
    id: c.id,
    dayNumber: c.dayNumber,
    category: c.category,
    difficulty: c.difficulty,
    description: c.description,
    industryNote: c.industryNote,
    solved: solvedDayNumbers.has(c.dayNumber),
    unlocked: c.dayNumber <= maxUnlocked,
  }));
  return NextResponse.json({ challenges: list, currentDay: user.currentDay });
}
