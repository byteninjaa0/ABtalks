import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

function requireAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  const problems = await prisma.problem.findMany({
    orderBy: { title: "asc" },
  });
  return NextResponse.json({ problems });
}

export async function POST(request: Request) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    const body = await request.json();
    const { title, description, domain, category, difficulty } = body ?? {};
    const validDomains = ["SE", "ML", "AI"];
    if (!title || !description || !category || !difficulty) {
      return NextResponse.json(
        { error: "Title, description, category and difficulty are required" },
        { status: 400 }
      );
    }
    const domainValue = validDomains.includes(String(domain)) ? domain : "SE";
    const problem = await prisma.problem.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        domain: domainValue,
        category: String(category).trim(),
        difficulty: String(difficulty).trim(),
      },
    });
    return NextResponse.json({ problem });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not create problem" },
      { status: 500 }
    );
  }
}
