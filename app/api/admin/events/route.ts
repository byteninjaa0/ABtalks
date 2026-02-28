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
  const errorResponse = requireAdmin(session);
  if (errorResponse) return errorResponse;

  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await getSession();
  const errorResponse = requireAdmin(session);
  if (errorResponse) return errorResponse;

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

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !guestName ||
      !guestBio ||
      !guestImage
    ) {
      return NextResponse.json(
        { error: "All event fields are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        date: new Date(date),
        time: String(time).trim(),
        location: String(location).trim(),
        guestName: String(guestName).trim(),
        guestBio: String(guestBio).trim(),
        guestImage: String(guestImage).trim(),
        outcomes: Array.isArray(outcomes)
          ? outcomes.map((o: string) => String(o).trim()).filter(Boolean)
          : [],
      },
    });

    return NextResponse.json({ event });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not create event" },
      { status: 500 }
    );
  }
}

