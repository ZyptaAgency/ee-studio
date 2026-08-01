import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    if (!checkCredentials(email, password)) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }
    const token = await createSessionToken(email.trim().toLowerCase());
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
