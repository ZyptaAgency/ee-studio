import { prisma } from "@/lib/prisma";
import ClientsManager, { type ClientRow } from "./ClientsManager";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true, invoices: true } } },
  });

  const rows: ClientRow[] = clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    company: c.company,
    notes: c.notes,
    bookings: c._count.bookings,
    invoices: c._count.invoices,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Clients</h1>
        <p className="text-sm text-[#777] mt-1">Créés automatiquement à chaque rendez-vous, ou ajoutés manuellement</p>
      </div>
      <ClientsManager clients={rows} />
    </div>
  );
}
