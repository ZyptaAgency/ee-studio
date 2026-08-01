"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Check, X } from "lucide-react";

export type SettingsData = {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  taxId: string;
  logo: string;
  defaultCurrency: string;
  defaultTaxRate: number;
  invoiceNotes: string;
  weatherCity: string;
  revenueGoal: number;
};

const CURRENCIES = ["USD", "EUR", "CDF"];

export default function SettingsForm({ initial }: { initial: SettingsData }) {
  const router = useRouter();
  const [form, setForm] = useState<SettingsData>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Logo : PNG, JPG ou WebP uniquement.");
      return;
    }
    if (file.size > 500 * 1024) {
      setError("Logo trop lourd (max 500 Ko).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      set("logo", reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    } else {
      setError("Échec de l'enregistrement.");
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-white/[0.1] py-2.5 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8] transition-colors";
  const label = "text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block";

  return (
    <form onSubmit={save} className="space-y-6 max-w-3xl">
      {/* Entreprise */}
      <section className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <h2 className="font-['Outfit'] font-medium mb-5">Entreprise</h2>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center overflow-hidden shrink-0">
            {form.logo ? (
              <Image src={form.logo} alt="Logo" width={80} height={80} className="object-contain w-full h-full" unoptimized />
            ) : (
              <span className="text-[10px] text-[#555] text-center px-2">Aucun logo</span>
            )}
          </div>
          <div>
            <input ref={logoRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onLogo} className="hidden" />
            <button type="button" onClick={() => logoRef.current?.click()} className="flex items-center gap-2 text-sm text-[#A8D8C8] hover:underline">
              <Upload size={15} /> Choisir un logo
            </button>
            {form.logo && (
              <button type="button" onClick={() => set("logo", "")} className="flex items-center gap-2 text-xs text-[#777] hover:text-[#F2B5D4] mt-2">
                <X size={13} /> Retirer
              </button>
            )}
            <p className="text-[11px] text-[#555] mt-2">PNG/JPG/WebP, 500 Ko max. Apparaît sur les factures PDF.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Nom de l&apos;entreprise</label>
            <input className={inputCls} value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
          </div>
          <div>
            <label className={label}>Identifiant (RCCM / ID Nat.)</label>
            <input className={inputCls} value={form.taxId} onChange={(e) => set("taxId", e.target.value)} />
          </div>
          <div>
            <label className={label}>Email</label>
            <input type="email" className={inputCls} value={form.companyEmail} onChange={(e) => set("companyEmail", e.target.value)} />
          </div>
          <div>
            <label className={label}>Téléphone</label>
            <input className={inputCls} value={form.companyPhone} onChange={(e) => set("companyPhone", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Adresse</label>
            <input className={inputCls} value={form.companyAddress} onChange={(e) => set("companyAddress", e.target.value)} />
          </div>
        </div>
      </section>

      {/* Facturation */}
      <section className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <h2 className="font-['Outfit'] font-medium mb-5">Facturation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Devise par défaut</label>
            <select className="w-full bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#A8D8C8]/40" value={form.defaultCurrency} onChange={(e) => set("defaultCurrency", e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>TVA par défaut (%)</label>
            <input type="number" min="0" step="0.1" className={inputCls} value={form.defaultTaxRate} onChange={(e) => set("defaultTaxRate", Number(e.target.value))} />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Mentions / conditions de paiement (bas de facture)</label>
            <textarea rows={3} className="w-full bg-transparent border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5F5F0] outline-none focus:border-[#A8D8C8]/40" value={form.invoiceNotes} onChange={(e) => set("invoiceNotes", e.target.value)} placeholder="Ex. Paiement à 30 jours. Merci pour votre confiance." />
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <h2 className="font-['Outfit'] font-medium mb-5">Dashboard</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Ville météo</label>
            <input className={inputCls} value={form.weatherCity} onChange={(e) => set("weatherCity", e.target.value)} />
          </div>
          <div>
            <label className={label}>Objectif de revenus mensuel</label>
            <input type="number" min="0" step="100" className={inputCls} value={form.revenueGoal} onChange={(e) => set("revenueGoal", Number(e.target.value))} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="px-8 py-3 rounded-full text-sm tracking-[0.1em] uppercase font-medium bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] transition-colors disabled:opacity-50">
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-[#A8D8C8]">
            <Check size={16} /> Enregistré
          </span>
        )}
        {error && <span className="text-sm text-[#F2B5D4]">{error}</span>}
      </div>
    </form>
  );
}
