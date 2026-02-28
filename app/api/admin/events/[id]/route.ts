import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

type Params = {
  params: { id: string };
};

function requireAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    const body = await request.json();
    const {
      title,
      description,
      date,
      time,
      location,
      guestName,
      guestBio,
      guestImage,
      outcomes,
    } = body ?? {};

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = String(title).trim();
    if (description !== undefined) updateData.description = String(description).trim();
    if (date !== undefined) updateData.date = new Date(date);
    if (time !== undefined) updateData.time = String(time).trim();
    if (location !== undefined) updateData.location = String(location).trim();
    if (guestName !== undefined) updateData.guestName = String(guestName).trim();
    if (guestBio !== undefined) updateData.guestBio = String(guestBio).trim();
    if (guestImage !== undefined) updateData.guestImage = String(guestImage).trim();
    if (outcomes !== undefined) {
      updateData.outcomes = Array.isArray(outcomes)
        ? outcomes.map((o: string) => String(o).trim()).filter(Boolean)
        : [];
    }

    const event = await prisma.event.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json({ event });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  const err = requireAdmin(session);
  if (err) return err;

  try {
    await prisma.event.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not delete event" },
      { status: 500 }
    );
  }
}

