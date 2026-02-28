import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, createToken, setSession } from "@/lib/auth";
import { ensureDomainProgressForUser } from "@/lib/domain-progress";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message = first.selectedDomain?.[0] ?? first.password?.[0] ?? first.email?.[0] ?? first.name?.[0] ?? "Invalid input";
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }
    const { name, email, password, selectedDomain } = parsed.data;
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
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashed,
        selectedDomain,
      },
    });
    await ensureDomainProgressForUser(user.id);
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
        selectedDomain: user.selectedDomain,
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
