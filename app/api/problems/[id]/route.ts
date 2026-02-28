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
  const problem = await prisma.problem.findUnique({
    where: { id },
  });
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }
  const solved = await prisma.submission.findFirst({
    where: { userId: session.userId, problemId: id },
  });
  return NextResponse.json({ ...problem, solved: !!solved });
}
