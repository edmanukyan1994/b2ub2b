import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "crypto";

const COOKIE_NAME = "b2_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAdminUsername() {
  return process.env.ADMIN_USERNAME ?? "admin";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "b2ub2b";
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function signToken(token: string) {
  const secret = getAdminPassword();
  return createHash("sha256").update(`${token}:${secret}`).digest("hex");
}

export function verifyAdminCredentials(username: string, password: string) {
  return safeEqual(username, getAdminUsername()) && safeEqual(password, getAdminPassword());
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
