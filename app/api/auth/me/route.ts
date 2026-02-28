import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrCreateDomainProgress } from "@/lib/domain-progress";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const progress = await getOrCreateDomainProgress(user.id, user.selectedDomain);
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      selectedDomain: user.selectedDomain,
      joinedAt: user.joinedAt,
      role: user.role,
      currentDay: progress.currentDay,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
    },
  });
}
