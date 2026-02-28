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
    const { title, description, domain, category, difficulty } = body ?? {};
    const validDomains = ["SE", "ML", "AI"];
    const updateData: {
      title?: string;
      description?: string;
      domain?: "SE" | "ML" | "AI";
      category?: string;
      difficulty?: string;
    } = {};
    if (title !== undefined) updateData.title = String(title).trim();
    if (description !== undefined) updateData.description = String(description).trim();
    if (category !== undefined) updateData.category = String(category).trim();
    if (difficulty !== undefined) updateData.difficulty = String(difficulty).trim();
    if (domain !== undefined && validDomains.includes(String(domain))) {
      updateData.domain = domain as "SE" | "ML" | "AI";
    }
    const problem = await prisma.problem.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json({ problem });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2025") {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not update problem" },
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
    await prisma.problem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2025") {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not delete problem" },
      { status: 500 }
    );
  }
}
