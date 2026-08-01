import { NextRequest, NextResponse } from "next/server";
import { createMagicToken } from "@/lib/auth";
import { sendMagicLink } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const adminEmail = (process.env.ADMIN_EMAIL || "contact@ee-studio.info").toLowerCase();

    // Always answer the same way to avoid revealing whether the email exists.
    if (typeof email === "string" && email.trim().toLowerCase() === adminEmail) {
      const token = await createMagicToken(adminEmail);
      const origin = new URL(req.url).origin;
      const link = `${origin}/api/admin/verify?token=${encodeURIComponent(token)}`;
      await sendMagicLink(adminEmail, link).catch((e) => console.error("magic send", e));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
