import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import InvoicesList, { type InvoiceRow } from "./InvoicesList";

export const dynamic = "force-dynamic";

export default async function FacturesPage() {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: "desc" } });

  const rows: InvoiceRow[] = invoices.map((i) => ({
    id: i.id,
    number: i.number,
    clientName: i.clientName,
    status: i.status,
    currency: i.currency,
    total: i.total,
    issueDate: i.issueDate.toISOString(),
    dueDate: i.dueDate ? i.dueDate.toISOString() : null,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Factures</h1>
          <p className="text-sm text-[#777] mt-1">Créez et suivez vos factures</p>
        </div>
        <Link
          href="/admin/factures/nouvelle"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] transition-colors shrink-0"
        >
          <Plus size={16} /> Nouvelle facture
        </Link>
      </div>
      <InvoicesList invoices={rows} />
    </div>
  );
}
