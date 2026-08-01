import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBookingToken } from "@/lib/auth";
import { sendAdminNotice } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const payload = token ? await verifyBookingToken(token) : null;
    if (!payload) return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 401 });

    const booking = await prisma.booking.update({
      where: { id: payload.bookingId },
      data: { status: "CANCELLED" },
    });

    await sendAdminNotice(
      `RDV annulé - ${booking.name}`,
      `Le rendez-vous de <strong>${booking.name}</strong> (${booking.email})${booking.date ? ` prévu le ${booking.date} à ${booking.time}` : ""} a été <strong>annulé</strong> par le client.`
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
