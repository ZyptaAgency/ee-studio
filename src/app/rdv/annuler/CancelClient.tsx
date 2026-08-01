"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarX, CheckCircle, ArrowLeft } from "lucide-react";

type BookingInfo = {
  firstName: string | null;
  name: string;
  meetingType: string | null;
  service: string | null;
  date: string | null;
  time: string | null;
  status: string;
};

export default function CancelClient() {
  const token = useSearchParams().get("token");
  const [info, setInfo] = useState<BookingInfo | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "done" | "error">("loading");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!token) return setState("error");
    fetch(`/api/rdv/info?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setInfo(d.booking);
        setState(d.booking.status === "CANCELLED" ? "done" : "ready");
      })
      .catch(() => setState("error"));
  }, [token]);

  const cancel = async () => {
    setWorking(true);
    const res = await fetch("/api/rdv/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setWorking(false);
    if (res.ok) setState("done");
    else setState("error");
  };

  return (
    <Shell>
      {state === "loading" && <p className="text-[#888] text-sm">Chargement…</p>}

      {state === "error" && (
        <div className="text-center">
          <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">Lien invalide</h1>
          <p className="text-sm text-[#888]">Ce lien est invalide ou a expiré. Contacte-nous directement pour toute modification.</p>
        </div>
      )}

      {state === "ready" && info && (
        <div className="text-center">
          <CalendarX size={40} strokeWidth={1.5} className="mx-auto text-[#F2B5D4] mb-5" />
          <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">Annuler ce rendez-vous ?</h1>
          <Details info={info} />
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button onClick={cancel} disabled={working} className="px-6 py-3 rounded-full text-sm font-medium bg-[#F2B5D4] text-[#0a0a0a] hover:bg-[#eda3c8] transition-colors disabled:opacity-50">
              {working ? "Annulation…" : "Confirmer l'annulation"}
            </button>
            <Link href="/" className="px-6 py-3 rounded-full text-sm font-light border border-white/10 text-[#bbb] hover:text-[#F5F5F0] transition-colors">
              Garder mon rendez-vous
            </Link>
          </div>
        </div>
      )}

      {state === "done" && (
        <div className="text-center">
          <CheckCircle size={40} strokeWidth={1.5} className="mx-auto text-[#A8D8C8] mb-5" />
          <h1 className="text-xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">Rendez-vous annulé</h1>
          <p className="text-sm text-[#888] mb-6">C&apos;est noté. N&apos;hésite pas à reprendre rendez-vous quand tu veux.</p>
          <Link href="/#booking" className="inline-flex items-center gap-2 text-sm text-[#A8D8C8] hover:underline">
            <ArrowLeft size={14} /> Reprendre rendez-vous
          </Link>
        </div>
      )}
    </Shell>
  );
}

function Details({ info }: { info: BookingInfo }) {
  const type = info.meetingType === "in_person" ? "Présentiel" : info.meetingType === "call" ? "Appel" : null;
  return (
    <div className="text-sm text-[#aaa] space-y-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 inline-block text-left mt-2">
      {type && <p><span className="text-[#666]">Type :</span> {type}</p>}
      {info.service && <p><span className="text-[#666]">Service :</span> {info.service}</p>}
      {info.date && <p><span className="text-[#666]">Quand :</span> {info.date} à {info.time}</p>}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl bg-[#F2B5D4]" />
      <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full opacity-[0.05] blur-3xl bg-[#A8D8C8]" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="EE Studio" width={130} height={44} className="h-11 w-auto object-contain" />
        </div>
        <div className="bg-[#111]/80 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm">{children}</div>
      </div>
    </div>
  );
}
