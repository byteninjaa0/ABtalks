import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      currentDay: user.currentDay,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      joinedAt: user.joinedAt,
    },
  });
}
