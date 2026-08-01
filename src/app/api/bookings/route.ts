import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendBookingNotification, sendBookingConfirmation } from "@/lib/email";

// Public: create a booking from the site form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      service,
      date,
      time,
      phone,
      company,
      message,
      attachmentUrl,
      attachmentName,
    } = body ?? {};

    const first = firstName ? String(firstName).trim() : "";
    const last = lastName ? String(lastName).trim() : "";
    const fullName = `${first} ${last}`.trim();

    if (!first || !last || !email) {
      return NextResponse.json(
        { error: "Prénom, nom et email sont requis" },
        { status: 400 }
      );
    }

    // Link or create a client based on email
    const normalizedEmail = String(email).trim().toLowerCase();
    let client = await prisma.client.findFirst({ where: { email: normalizedEmail } });
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: fullName,
          email: normalizedEmail,
          phone: phone ? String(phone).trim() : null,
          company: company ? String(company).trim() : null,
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        firstName: first,
        lastName: last,
        name: fullName,
        email: normalizedEmail,
        phone: phone ? String(phone).trim() : null,
        company: company ? String(company).trim() : null,
        service: service ? String(service).trim() : null,
        date: date ? String(date) : null,
        time: time ? String(time) : null,
        message: message ? String(message).trim() : null,
        attachmentUrl: attachmentUrl ? String(attachmentUrl) : null,
        attachmentName: attachmentName ? String(attachmentName) : null,
        clientId: client.id,
      },
    });

    // Emails (ne bloquent jamais la réponse)
    await Promise.allSettled([
      sendBookingNotification({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        company: booking.company,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        message: booking.message,
        attachmentUrl: booking.attachmentUrl,
        attachmentName: booking.attachmentName,
      }),
      sendBookingConfirmation({
        firstName: first,
        email: booking.email,
        service: booking.service,
        date: booking.date,
        time: booking.time,
      }),
    ]).catch((err) => console.error("Booking email error", err));

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (e) {
    console.error("Booking create error", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Protected: list bookings for the dashboard
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ bookings });
}
