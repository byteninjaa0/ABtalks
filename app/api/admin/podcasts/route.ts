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

  const episodes = await prisma.podcast.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json({ episodes });
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
      guestName,
      guestBio,
      guestImage,
      episodeNumber,
      youtubeUrl,
      spotifyUrl,
      publishedAt,
    } = body ?? {};

    if (
      !title ||
      !description ||
      !guestName ||
      !guestBio ||
      !guestImage ||
      !episodeNumber ||
      !youtubeUrl ||
      !spotifyUrl ||
      !publishedAt
    ) {
      return NextResponse.json(
        { error: "All podcast fields are required" },
        { status: 400 }
      );
    }

    const episode = await prisma.podcast.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        guestName: String(guestName).trim(),
        guestBio: String(guestBio).trim(),
        guestImage: String(guestImage).trim(),
        episodeNumber: Number(episodeNumber),
        youtubeUrl: String(youtubeUrl).trim(),
        spotifyUrl: String(spotifyUrl).trim(),
        publishedAt: new Date(publishedAt),
      },
    });

    return NextResponse.json({ episode });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not create podcast episode" },
      { status: 500 }
    );
  }
}

