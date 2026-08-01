"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, ChevronDown } from "lucide-react";

export type InvoiceRow = {
  id: string;
  number: string;
  clientName: string;
  status: string;
  currency: string;
  total: number;
  issueDate: string;
  dueDate: string | null;
};

const STATUSES = ["DRAFT", "SENT", "PAID", "OVERDUE"];
const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  SENT: "Envoyée",
  PAID: "Payée",
  OVERDUE: "En retard",
};
const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-white/[0.06] text-[#aaa] border-white/10",
  SENT: "bg-[#C3B1E1]/15 text-[#C3B1E1] border-[#C3B1E1]/20",
  PAID: "bg-[#A8D8C8]/15 text-[#A8D8C8] border-[#A8D8C8]/20",
  OVERDUE: "bg-[#F2B5D4]/15 text-[#F2B5D4] border-[#F2B5D4]/20",
};

export default function InvoicesList({ invoices }: { invoices: InvoiceRow[] }) {
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(null);

  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOpen(null);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette facture ?")) return;
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    router.refresh();
  };

  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] py-16 text-center text-sm text-[#666]">
        Aucune facture. Créez-en une pour commencer.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden divide-y divide-white/[0.05]">
      {invoices.map((inv) => (
        <div
          key={inv.id}
          className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-4 items-center px-5 md:px-6 py-4"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium">{inv.number}</p>
            <p className="text-xs text-[#777] md:hidden truncate">{inv.clientName}</p>
          </div>
          <p className="text-sm text-[#aaa] truncate hidden md:block">{inv.clientName}</p>
          <p className="text-sm hidden md:block">
            {inv.total.toLocaleString("fr-FR")} {inv.currency}
          </p>
          <div className="relative hidden md:block">
            <button
              onClick={() => setOpen(open === inv.id ? null : inv.id)}
              className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 ${STATUS_STYLES[inv.status]}`}
            >
              {STATUS_LABELS[inv.status]} <ChevronDown size={12} />
            </button>
            {open === inv.id && (
              <div className="absolute z-10 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg py-1 min-w-[140px] shadow-xl">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(inv.id, s)}
                    className="block w-full text-left px-4 py-2 text-xs text-[#ccc] hover:bg-white/[0.05]"
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className={`md:hidden text-[11px] px-2.5 py-1 rounded-full border ${STATUS_STYLES[inv.status]}`}>
              {STATUS_LABELS[inv.status]}
            </span>
            <a
              href={`/api/invoices/${inv.id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#A8D8C8]"
              title="Télécharger le PDF"
            >
              <Download size={16} />
            </a>
            <button onClick={() => remove(inv.id)} className="text-[#888] hover:text-[#F2B5D4]" title="Supprimer">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
