import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBookingToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const payload = await verifyBookingToken(token);
  if (!payload) return NextResponse.json({ error: "invalid" }, { status: 401 });

  const b = await prisma.booking.findUnique({ where: { id: payload.bookingId } });
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });

  return NextResponse.json({
    booking: {
      firstName: b.firstName,
      name: b.name,
      meetingType: b.meetingType,
      service: b.service,
      date: b.date,
      time: b.time,
      status: b.status,
    },
  });
}
