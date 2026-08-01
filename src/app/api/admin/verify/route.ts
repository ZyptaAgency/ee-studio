import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, createSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/admin/login", req.url);

  if (!token) {
    loginUrl.searchParams.set("error", "link");
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyMagicToken(token);
  if (!payload) {
    loginUrl.searchParams.set("error", "expired");
    return NextResponse.redirect(loginUrl);
  }

  const session = await createSessionToken(payload.email);
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(SESSION_COOKIE_NAME, session, sessionCookieOptions());
  return res;
}
