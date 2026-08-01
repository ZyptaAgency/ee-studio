import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendBookingNotification } from "@/lib/email";

// Public: create a booking from the site form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, date, time, phone, message } = body ?? {};

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Link or create a client based on email
    const normalizedEmail = String(email).trim().toLowerCase();
    let client = await prisma.client.findFirst({ where: { email: normalizedEmail } });
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: String(name).trim(),
          email: normalizedEmail,
          phone: phone ? String(phone).trim() : null,
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        phone: phone ? String(phone).trim() : null,
        service: String(service).trim(),
        date: String(date),
        time: String(time),
        message: message ? String(message).trim() : null,
        clientId: client.id,
      },
    });

    // Notification email (ne bloque pas la réponse en cas d'échec)
    await sendBookingNotification({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      message: booking.message,
    }).catch((err) => console.error("Booking email error", err));

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
