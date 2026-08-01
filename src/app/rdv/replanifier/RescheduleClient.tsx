"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarClock, CheckCircle, Phone, MapPin } from "lucide-react";
import { TIME_SLOTS, getAvailableDates, type MeetingType } from "@/lib/booking-utils";

export default function RescheduleClient() {
  const token = useSearchParams().get("token");
  const [state, setState] = useState<"loading" | "ready" | "done" | "error">("loading");
  const [type, setType] = useState<MeetingType>("call");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!token) return setState("error");
    fetch(`/api/rdv/info?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (d.booking.meetingType === "in_person") setType("in_person");
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [token]);

  const dates = useMemo(() => getAvailableDates(type === "in_person"), [type]);

  useEffect(() => {
    // Reset the date if it becomes invalid after switching type (e.g. weekend + call)
    if (date && !dates.includes(date)) setDate("");
  }, [dates, date]);

  const submit = async () => {
    setError("");
    if (!date || !time) return setError("Choisis une date et une heure.");
    setWorking(true);
    const res = await fetch("/api/rdv/reschedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, meetingType: type, date, time }),
    });
    setWorking(false);
    if (res.ok) return setState("done");
    const d = await res.json().catch(() => ({}));
    setError(d.error || "Une erreur est survenue.");
  };

  const fmt = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });

  return (
    <Shell>
      {state === "loading" && <p className="text-[#888] text-sm">Chargement…</p>}

      {state === "error" && (
        <div className="text-center">
          <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">Lien invalide</h1>
          <p className="text-sm text-[#888]">Ce lien est invalide ou a expiré. Contacte-nous directement pour toute modification.</p>
        </div>
      )}

      {state === "ready" && (
        <div>
          <div className="text-center mb-6">
            <CalendarClock size={40} strokeWidth={1.5} className="mx-auto text-[#A8D8C8] mb-4" />
            <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0]">Replanifier mon rendez-vous</h1>
          </div>

          <label className="block text-xs uppercase tracking-wider text-[#666] mb-2">Type de rendez-vous</label>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <TypeBtn active={type === "call"} onClick={() => setType("call")} icon={<Phone size={16} />} label="Appel" />
            <TypeBtn active={type === "in_person"} onClick={() => setType("in_person")} icon={<MapPin size={16} />} label="Présentiel" />
          </div>
          {type === "call" && (
            <p className="text-[11px] text-[#777] -mt-3 mb-4">Les appels sont disponibles en semaine uniquement.</p>
          )}

          <label className="block text-xs uppercase tracking-wider text-[#666] mb-2">Date</label>
          <select value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] mb-5 outline-none focus:border-[#A8D8C8]/50">
            <option value="">Choisir une date</option>
            {dates.map((d) => (
              <option key={d} value={d} className="bg-[#111]">{fmt(d)}</option>
            ))}
          </select>

          <label className="block text-xs uppercase tracking-wider text-[#666] mb-2">Heure</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {TIME_SLOTS.map((t) => (
              <button key={t} onClick={() => setTime(t)} className={`py-2 rounded-lg text-sm transition-colors border ${time === t ? "bg-[#A8D8C8] text-[#0a0a0a] border-transparent" : "border-white/[0.08] text-[#bbb] hover:border-white/20"}`}>
                {t}
              </button>
            ))}
          </div>

          {error && <p className="text-sm text-[#F2B5D4] mb-4">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={submit} disabled={working} className="flex-1 px-6 py-3 rounded-full text-sm font-medium bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#96cbb9] transition-colors disabled:opacity-50">
              {working ? "Enregistrement…" : "Confirmer le nouveau créneau"}
            </button>
            <Link href="/" className="px-6 py-3 rounded-full text-sm font-light border border-white/10 text-[#bbb] hover:text-[#F5F5F0] transition-colors text-center">
              Retour
            </Link>
          </div>
        </div>
      )}

      {state === "done" && (
        <div className="text-center">
          <CheckCircle size={40} strokeWidth={1.5} className="mx-auto text-[#A8D8C8] mb-5" />
          <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">Créneau mis à jour</h1>
          <p className="text-sm text-[#888] mb-6">Ton rendez-vous a été replanifié. Nous te confirmerons les détails très vite.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#A8D8C8] hover:underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      )}
    </Shell>
  );
}

function TypeBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm border transition-colors ${active ? "bg-[#A8D8C8]/15 border-[#A8D8C8]/50 text-[#F5F5F0]" : "border-white/[0.08] text-[#bbb] hover:border-white/20"}`}>
      {icon}
      {label}
    </button>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl bg-[#A8D8C8]" />
      <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full opacity-[0.05] blur-3xl bg-[#F2B5D4]" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="EE Studio" width={130} height={44} className="h-11 w-auto object-contain" />
        </div>
        <div className="bg-[#111]/80 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm">{children}</div>
      </div>
    </div>
  );
}
