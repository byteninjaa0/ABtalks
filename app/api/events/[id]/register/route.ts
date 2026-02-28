import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

type Params = {
  params: { id: string };
};

export async function POST(request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to register for this event." },
      { status: 401 }
    );
  }

  const eventId = params.id;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, collegeOrCompany } = body ?? {};
    if (!name || !email || !collegeOrCompany) {
      return NextResponse.json(
        { error: "Name, email and college/company are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: session.userId,
        },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You are already registered for this event." },
        { status: 400 }
      );
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        userId: session.userId,
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        collegeOrCompany: String(collegeOrCompany).trim(),
      },
    });

    return NextResponse.json({ registration });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not register for event" },
      { status: 500 }
    );
  }
}

