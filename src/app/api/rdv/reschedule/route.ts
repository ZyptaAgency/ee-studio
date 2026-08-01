import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBookingToken } from "@/lib/auth";
import { isWeekendISO } from "@/lib/booking-utils";
import { sendAdminNotice } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { token, meetingType, date, time } = await req.json();
    const payload = token ? await verifyBookingToken(token) : null;
    if (!payload) return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 401 });

    if (!date || !time) {
      return NextResponse.json({ error: "Date et heure requises" }, { status: 400 });
    }
    const type = meetingType === "in_person" ? "in_person" : "call";
    if (type === "call" && isWeekendISO(String(date))) {
      return NextResponse.json(
        { error: "Les appels ne sont pas disponibles le week-end. Choisissez un présentiel ou un jour de semaine." },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id: payload.bookingId },
      data: {
        meetingType: type,
        date: String(date),
        time: String(time),
        status: "PENDING",
      },
    });

    await sendAdminNotice(
      `RDV replanifié - ${booking.name}`,
      `Le rendez-vous de <strong>${booking.name}</strong> (${booking.email}) a été <strong>replanifié</strong> au <strong>${booking.date} à ${booking.time}</strong> (${type === "in_person" ? "présentiel" : "appel"}).`
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
