import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "crypto";

const COOKIE_NAME = "b2_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "b2ub2b";
}

function signToken(token: string) {
  const secret = getAdminPassword();
  return createHash("sha256").update(`${token}:${secret}`).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const token = randomBytes(32).toString("hex");
  const signature = signToken(token);
  const jar = await cookies();
  jar.set(COOKIE_NAME, `${token}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [token, signature] = value.split(".");
  if (!token || !signature) return false;
  const expected = signToken(token);
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function assertAdminAuth(authed: boolean) {
  if (!authed) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
