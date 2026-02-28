import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
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
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty");
  const category = searchParams.get("category");
  const domainParam = searchParams.get("domain");
  const validDomains = ["SE", "ML", "AI"] as const;
  const domain =
    domainParam && validDomains.includes(domainParam as (typeof validDomains)[number])
      ? (domainParam as (typeof validDomains)[number])
      : user.selectedDomain;
  const where: { difficulty?: string; category?: string; domain: "SE" | "ML" | "AI" } = { domain };
  if (difficulty) where.difficulty = difficulty;
  if (category) where.category = category;
  const problems = await prisma.problem.findMany({
    where,
    orderBy: { title: "asc" },
  });
  const solvedIds = new Set(
    (
      await prisma.submission.findMany({
        where: { userId: session.userId, problemId: { not: null } },
        select: { problemId: true },
      })
    )
      .map((s) => s.problemId)
      .filter(Boolean) as string[]
  );
  const list = problems.map((p) => ({
    ...p,
    solved: solvedIds.has(p.id),
  }));
  return NextResponse.json({ problems: list });
}
