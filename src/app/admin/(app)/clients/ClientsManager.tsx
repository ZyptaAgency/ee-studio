"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Building2, Plus, Trash2, X, CalendarClock, FileText } from "lucide-react";

export type ClientRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  notes: string | null;
  bookings: number;
  invoices: number;
};

export default function ClientsManager({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      (c.company ?? "").toLowerCase().includes(query.toLowerCase())
  );

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setForm({ name: "", email: "", phone: "", company: "", notes: "" });
      setShowForm(false);
      router.refresh();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce client ? Ses rendez-vous et factures liés perdront la liaison.")) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un client..."
          className="w-full sm:max-w-xs bg-[#111] border border-white/[0.06] rounded-full px-4 py-2.5 text-sm text-[#F5F5F0] placeholder-[#555] outline-none focus:border-[#A8D8C8]/40"
        />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] transition-colors shrink-0"
        >
          <Plus size={16} /> Nouveau client
        </button>
      </div>

      {showForm && (
        <form onSubmit={add} className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 mb-6 relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-[#666] hover:text-[#F5F5F0]">
            <X size={18} />
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nom *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" required />
            <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field label="Entreprise" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          </div>
          <div className="mt-4">
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full bg-transparent border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8]/40"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-5 px-6 py-2.5 rounded-full text-sm bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] py-16 text-center text-sm text-[#666]">
          Aucun client.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 group">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  {c.company && (
                    <p className="text-xs text-[#777] flex items-center gap-1.5 mt-0.5">
                      <Building2 size={12} /> {c.company}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => remove(c.id)}
                  className="text-[#555] hover:text-[#F2B5D4] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-[#999] hover:text-[#A8D8C8] truncate">
                  <Mail size={14} className="shrink-0" /> <span className="truncate">{c.email}</span>
                </a>
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-[#999] hover:text-[#A8D8C8]">
                    <Phone size={14} /> {c.phone}
                  </a>
                )}
              </div>
              {c.notes && <p className="mt-3 text-xs text-[#777] line-clamp-2">{c.notes}</p>}
              <div className="mt-4 pt-4 border-t border-white/[0.05] flex gap-4 text-xs text-[#888]">
                <span className="flex items-center gap-1.5">
                  <CalendarClock size={13} className="text-[#A8D8C8]" /> {c.bookings} RDV
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={13} className="text-[#C3B1E1]" /> {c.invoices} facture{c.invoices > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-white/[0.1] py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8]"
      />
    </div>
  );
}
