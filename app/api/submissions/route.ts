import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { challengeId, problemId, code } = body;
    if (!code || (typeof code !== "string")) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }
    if (!challengeId && !problemId) {
      return NextResponse.json(
        { error: "Either challengeId or problemId is required" },
        { status: 400 }
      );
    }
    if (challengeId && problemId) {
      return NextResponse.json(
        { error: "Provide only one of challengeId or problemId" },
        { status: 400 }
      );
    }
    if (problemId) {
      const problem = await prisma.problem.findUnique({
        where: { id: problemId },
        select: { id: true, domain: true },
      });
      if (!problem) {
        return NextResponse.json(
          { error: "Problem not found" },
          { status: 404 }
        );
      }
    }
    const result = "Passed";
    let challenge: { dayNumber: number; id: string; domain: "SE" | "ML" | "AI" } | null = null;
    if (challengeId) {
      challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: { dayNumber: true, id: true, domain: true },
      });
      if (!challenge) {
        return NextResponse.json(
          { error: "Challenge not found" },
          { status: 404 }
        );
      }
      const progress = await getOrCreateDomainProgress(session.userId, challenge.domain);
      if (progress.currentDay < challenge.dayNumber) {
        return NextResponse.json(
          { error: "Challenge is locked" },
          { status: 403 }
        );
      }
    }
    const submission = await prisma.submission.create({
      data: {
        userId: session.userId,
        challengeId: challengeId || undefined,
        problemId: problemId || undefined,
        code: code.slice(0, 100_000),
        result,
      },
    });
    if (challenge) {
      const progress = await getOrCreateDomainProgress(session.userId, challenge.domain);
      const now = new Date();
      const lastSubmission = await prisma.submission.findFirst({
        where: {
          userId: session.userId,
          challengeId: challenge.id,
        },
        orderBy: { createdAt: "desc" },
      });
      const isFirstSolveForThisChallenge = lastSubmission?.id === submission.id;
      if (!isFirstSolveForThisChallenge) {
        return NextResponse.json({ submission, result });
      }
      const nextDay = challenge.dayNumber + 1;
      const newCurrentDay =
        progress.currentDay < nextDay ? nextDay : progress.currentDay;
      const lastOtherSubmission = await prisma.submission.findFirst({
        where: {
          userId: session.userId,
          challengeId: { not: null },
          challenge: { domain: challenge.domain },
          id: { not: submission.id },
        },
        orderBy: { createdAt: "desc" },
      });
      const todayStr = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
      const yesterday = new Date(now);
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const yesterdayStr = `${yesterday.getUTCFullYear()}-${yesterday.getUTCMonth()}-${yesterday.getUTCDate()}`;
      const lastDayStr = lastOtherSubmission
        ? `${lastOtherSubmission.createdAt.getUTCFullYear()}-${lastOtherSubmission.createdAt.getUTCMonth()}-${lastOtherSubmission.createdAt.getUTCDate()}`
        : null;
      let newStreak: number;
      if (!lastDayStr) newStreak = 1;
      else if (lastDayStr === yesterdayStr) newStreak = progress.currentStreak + 1;
      else if (lastDayStr === todayStr) newStreak = progress.currentStreak;
      else newStreak = 1;
      const newLongest =
        newStreak > progress.longestStreak ? newStreak : progress.longestStreak;
      await prisma.domainProgress.update({
        where: { userId_domain: { userId: session.userId, domain: challenge.domain } },
        data: {
          currentDay: newCurrentDay,
          currentStreak: newStreak,
          longestStreak: newLongest,
        },
      });
    }
    return NextResponse.json({ submission, result });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
  const submissions = await prisma.submission.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      challenge: { select: { dayNumber: true } },
      problem: { select: { title: true } },
    },
  });
  return NextResponse.json({
    submissions: submissions.map((s) => ({
      id: s.id,
      challengeId: s.challengeId,
      problemId: s.problemId,
      dayNumber: s.challenge?.dayNumber,
      problemTitle: s.problem?.title,
      result: s.result,
      createdAt: s.createdAt,
    })),
  });
}
