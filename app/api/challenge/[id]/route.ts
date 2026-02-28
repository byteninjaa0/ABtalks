import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const challenge = await prisma.challenge.findUnique({
    where: { id },
  });
  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { currentDay: true, selectedDomain: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (challenge.domain !== user.selectedDomain) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }
  const unlocked = challenge.dayNumber <= user.currentDay;
  const solved = await prisma.submission.findFirst({
    where: {
      userId: session.userId,
      challengeId: id,
    },
  });
  return NextResponse.json({
    ...challenge,
    unlocked,
    solved: !!solved,
  });
}
