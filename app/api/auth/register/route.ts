import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, createToken, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        password: hashed,
      },
    });
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
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
