import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createToken, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = createToken({
      userId: user.id,
      email: user.email,
      role: (user as any).role ?? "USER",
    });
    await setSession(token);
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        currentDay: user.currentDay,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        role: (user as any).role ?? "USER",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
