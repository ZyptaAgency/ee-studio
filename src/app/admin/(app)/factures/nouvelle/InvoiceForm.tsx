"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

export type ClientOption = {
  id: string;
  name: string;
  email: string;
  company: string | null;
};

type Line = { description: string; quantity: string; unitPrice: string };

const CURRENCIES = ["USD", "EUR", "CDF"];

export default function InvoiceForm({ clients }: { clients: ClientOption[] }) {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddr, setClientAddr] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("0");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [lines, setLines] = useState<Line[]>([{ description: "", quantity: "1", unitPrice: "" }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPickClient = (id: string) => {
    setClientId(id);
    const c = clients.find((x) => x.id === id);
    if (c) {
      setClientName(c.name);
      setClientEmail(c.email);
    }
  };

  const updateLine = (i: number, key: keyof Line, value: string) => {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));
  };
  const addLine = () => setLines((p) => [...p, { description: "", quantity: "1", unitPrice: "" }]);
  const removeLine = (i: number) => setLines((p) => (p.length === 1 ? p : p.filter((_, idx) => idx !== i)));

  const { subtotal, taxAmount, total } = useMemo(() => {
    const sub = lines.reduce((s, l) => s + (Number(l.quantity) || 0) * (Number(l.unitPrice) || 0), 0);
    const tax = sub * ((Number(taxRate) || 0) / 100);
    return { subtotal: sub, taxAmount: tax, total: sub + tax };
  }, [lines, taxRate]);

  const fmt = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return setError("Indiquez un nom de client.");
    if (lines.every((l) => !l.description.trim())) return setError("Ajoutez au moins une prestation.");
    setSaving(true);
    setError(null);
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: clientId || null,
        clientName,
        clientEmail,
        clientAddr,
        currency,
        taxRate: Number(taxRate) || 0,
        dueDate: dueDate || null,
        notes,
        status,
        lines: lines
          .filter((l) => l.description.trim())
          .map((l) => ({
            description: l.description,
            quantity: Number(l.quantity) || 0,
            unitPrice: Number(l.unitPrice) || 0,
          })),
      }),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/factures");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Erreur lors de la création.");
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-white/[0.1] py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8]";

  return (
    <form onSubmit={submit} className="space-y-8 max-w-3xl">
      {/* Client */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-4">
        <h2 className="font-['Outfit'] font-medium">Client</h2>
        {clients.length > 0 && (
          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Client existant</label>
            <select
              value={clientId}
              onChange={(e) => onPickClient(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8]/40"
            >
              <option value="">— Nouveau / saisie manuelle —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.company ? `(${c.company})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Nom *</label>
            <input className={inputCls} value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          </div>
          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Email</label>
            <input className={inputCls} type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Adresse</label>
          <input className={inputCls} value={clientAddr} onChange={(e) => setClientAddr(e.target.value)} />
        </div>
      </div>

      {/* Lines */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-4">
        <h2 className="font-['Outfit'] font-medium">Prestations</h2>
        <div className="space-y-3">
          {lines.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_60px_90px_auto] gap-3 items-center">
              <input
                placeholder="Description"
                className={inputCls}
                value={l.description}
                onChange={(e) => updateLine(i, "description", e.target.value)}
              />
              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="Qté"
                className={`${inputCls} text-right`}
                value={l.quantity}
                onChange={(e) => updateLine(i, "quantity", e.target.value)}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="P.U."
                className={`${inputCls} text-right`}
                value={l.unitPrice}
                onChange={(e) => updateLine(i, "unitPrice", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLine(i)}
                className="text-[#666] hover:text-[#F2B5D4] p-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLine}
          className="flex items-center gap-2 text-sm text-[#A8D8C8] hover:underline"
        >
          <Plus size={15} /> Ajouter une ligne
        </button>
      </div>

      {/* Settings + totals */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-4">
          <h2 className="font-['Outfit'] font-medium">Paramètres</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Devise</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#A8D8C8]/40"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">TVA (%)</label>
              <input className={inputCls} type="number" min="0" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Échéance</label>
              <input className={`${inputCls} [color-scheme:dark]`} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Statut</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#A8D8C8]/40"
              >
                <option value="DRAFT">Brouillon</option>
                <option value="SENT">Envoyée</option>
                <option value="PAID">Payée</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-transparent border border-white/[0.08] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#A8D8C8]/40"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 flex flex-col">
          <h2 className="font-['Outfit'] font-medium mb-4">Récapitulatif</h2>
          <div className="space-y-3 text-sm text-[#aaa]">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>TVA ({taxRate || 0}%)</span>
              <span>{fmt(taxAmount)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-white/[0.08] text-[#F5F5F0] text-lg font-semibold">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
          {error && <p className="text-sm text-[#F2B5D4] mt-4">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="mt-auto pt-6 w-full"
          >
            <span className="block w-full py-3.5 rounded-full text-sm tracking-[0.12em] uppercase font-medium bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] transition-colors disabled:opacity-50 text-center">
              {saving ? "Création..." : "Créer la facture"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
