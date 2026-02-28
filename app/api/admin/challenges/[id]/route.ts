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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    const body = await request.json();
    const { dayNumber, domain, category, difficulty, description, industryNote } = body ?? {};
    const validDomains = ["SE", "ML", "AI"];
    const updateData: {
      dayNumber?: number;
      domain?: "SE" | "ML" | "AI";
      category?: string;
      difficulty?: string;
      description?: string;
      industryNote?: string;
    } = {};
    if (dayNumber !== undefined) {
      const day = Number(dayNumber);
      if (Number.isInteger(day) && day >= 1 && day <= 60) updateData.dayNumber = day;
    }
    if (domain !== undefined && validDomains.includes(String(domain))) {
      updateData.domain = domain as "SE" | "ML" | "AI";
    }
    if (category !== undefined) updateData.category = String(category).trim();
    if (difficulty !== undefined) updateData.difficulty = String(difficulty).trim();
    if (description !== undefined) updateData.description = String(description).trim();
    if (industryNote !== undefined) updateData.industryNote = String(industryNote).trim();

    const challenge = await prisma.challenge.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json({ challenge });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2025") {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
      return NextResponse.json(
        { error: "A challenge already exists for this day and domain" },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not update challenge" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    await prisma.challenge.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2025") {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not delete challenge" },
      { status: 500 }
    );
  }
}
