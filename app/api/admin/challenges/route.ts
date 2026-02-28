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

  const challenges = await prisma.challenge.findMany({
    orderBy: [{ domain: "asc" }, { dayNumber: "asc" }],
  });
  return NextResponse.json({ challenges });
}

export async function POST(request: Request) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    const body = await request.json();
    const { dayNumber, domain, category, difficulty, description, industryNote } = body ?? {};
    const validDomains = ["SE", "ML", "AI"];
    if (
      dayNumber == null ||
      dayNumber === "" ||
      !category ||
      !difficulty ||
      !description
    ) {
      return NextResponse.json(
        { error: "dayNumber, category, difficulty and description are required" },
        { status: 400 }
      );
    }
    const day = Number(dayNumber);
    if (!Number.isInteger(day) || day < 1 || day > 60) {
      return NextResponse.json(
        { error: "dayNumber must be between 1 and 60" },
        { status: 400 }
      );
    }
    const domainValue = validDomains.includes(String(domain)) ? domain : "SE";
    const challenge = await prisma.challenge.create({
      data: {
        dayNumber: day,
        domain: domainValue,
        category: String(category).trim(),
        difficulty: String(difficulty).trim(),
        description: String(description).trim(),
        industryNote: String(industryNote ?? "").trim(),
      },
    });
    return NextResponse.json({ challenge });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
      return NextResponse.json(
        { error: "A challenge already exists for this day and domain" },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not create challenge" },
      { status: 500 }
    );
  }
}
