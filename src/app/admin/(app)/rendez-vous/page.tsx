import { prisma } from "@/lib/prisma";
import BookingsTable, { type BookingRow } from "./BookingsTable";

export const dynamic = "force-dynamic";

export default async function RendezVousPage() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });

  const rows: BookingRow[] = bookings.map((b) => ({
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone,
    company: b.company,
    meetingType: b.meetingType,
    service: b.service,
    date: b.date,
    time: b.time,
    message: b.message,
    attachmentUrl: b.attachmentUrl,
    attachmentName: b.attachmentName,
    status: b.status,
    createdAt: b.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Rendez-vous</h1>
        <p className="text-sm text-[#777] mt-1">Gérez les demandes reçues via le site</p>
      </div>
      <BookingsTable bookings={rows} />
    </div>
  );
}
