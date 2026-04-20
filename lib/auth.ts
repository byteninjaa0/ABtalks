import jwt, { type SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

type JwtExpiresIn = NonNullable<SignOptions["expiresIn"]>;

const COOKIE_NAME = "abtalks-token";
const MAX_AGE = 60 * 60; // 1 hour cookie; refresh token flow can extend session

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is required. Set a strong, non-empty secret before signing or verifying tokens.",
    );
  }
  return secret;
}

function isMsStyleDuration(value: string): value is Extract<JwtExpiresIn, string> {
  return /^\d+(ms|s|m|h|d|w|y)$/i.test(value);
}

function resolveJwtExpiresInFromEnv(): JwtExpiresIn {
  const value = process.env.JWT_EXPIRY?.trim();
  if (!value) return "1h";
  if (/^\d+$/.test(value)) return Number(value);
  if (isMsStyleDuration(value)) return value;
  return "1h";
}

const JWT_EXPIRES_IN: JwtExpiresIn = resolveJwtExpiresInFromEnv();

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

type JwtPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type SignJwtOptions = {
  expiresIn?: JwtExpiresIn;
};

/**
 * Signs a JWT with a validated secret and `expiresIn` compatible with jsonwebtoken's `SignOptions`.
 */
export function signToken(payload: JwtPayload, options?: SignJwtOptions): string {
  const secret = getJwtSecret();
  const expiresIn: JwtExpiresIn = options?.expiresIn ?? JWT_EXPIRES_IN;
  return jwt.sign(payload, secret, { expiresIn });
}

export function createToken(payload: JwtPayload): string {
  return signToken(payload);
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      selectedDomain: true,
      joinedAt: true,
      role: true,
    },
  });
}
