import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

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
  const progress = await getOrCreateDomainProgress(session.userId, challenge.domain);
  const unlocked = challenge.dayNumber <= progress.currentDay;
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
