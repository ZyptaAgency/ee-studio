"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Trash2, ChevronDown, Building2, Paperclip, MapPin } from "lucide-react";

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  meetingType: string | null;
  service: string | null;
  date: string | null;
  time: string | null;
  message: string | null;
  attachmentUrl: string | null;
  attachmentName: string | null;
  status: string;
  createdAt: string;
};

const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  COMPLETED: "Terminé",
  CANCELLED: "Annulé",
};
const MEETING_LABELS: Record<string, string> = { call: "Appel", in_person: "Présentiel" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-[#F2D5A8]/15 text-[#F2D5A8] border-[#F2D5A8]/20",
  CONFIRMED: "bg-[#A8D8C8]/15 text-[#A8D8C8] border-[#A8D8C8]/20",
  COMPLETED: "bg-[#C3B1E1]/15 text-[#C3B1E1] border-[#C3B1E1]/20",
  CANCELLED: "bg-[#F2B5D4]/15 text-[#F2B5D4] border-[#F2B5D4]/20",
};

export default function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, status: string) => {
    setBusy(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce rendez-vous ?")) return;
    setBusy(id);
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["ALL", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs transition-colors border ${
              filter === s
                ? "bg-white/[0.08] text-[#F5F5F0] border-white/10"
                : "text-[#888] border-white/[0.06] hover:text-[#F5F5F0]"
            }`}
          >
            {s === "ALL" ? "Tous" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] py-16 text-center text-sm text-[#666]">
          Aucun rendez-vous.
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden divide-y divide-white/[0.05]">
          {filtered.map((b) => (
            <div key={b.id} className={busy === b.id ? "opacity-50" : ""}>
              <div
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1.5fr_1.5fr_1fr_auto] gap-4 items-center px-5 md:px-6 py-4 cursor-pointer hover:bg-white/[0.02]"
                onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate flex items-center gap-2">
                    {b.name}
                    {b.meetingType && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-[#999] shrink-0">
                        {MEETING_LABELS[b.meetingType] ?? b.meetingType}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#777] truncate md:hidden">{b.service || "Demande générale"}</p>
                </div>
                <p className="text-sm text-[#aaa] truncate hidden md:block">{b.service || "Demande générale"}</p>
                <p className="text-xs text-[#888] hidden md:block">
                  {b.date ? (
                    <>
                      {b.date}
                      <br />
                      {b.time}
                    </>
                  ) : (
                    <span className="text-[#555]">Pas de créneau</span>
                  )}
                </p>
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border ${STATUS_STYLES[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#555] transition-transform ${expanded === b.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {expanded === b.id && (
                <div className="px-5 md:px-6 pb-6 pt-1 bg-white/[0.015]">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3 text-sm">
                      <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-[#aaa] hover:text-[#A8D8C8]">
                        <Mail size={15} /> {b.email}
                      </a>
                      {b.phone && (
                        <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-[#aaa] hover:text-[#A8D8C8]">
                          <Phone size={15} /> {b.phone}
                        </a>
                      )}
                      {b.company && (
                        <p className="flex items-center gap-2 text-[#aaa]">
                          <Building2 size={15} /> {b.company}
                        </p>
                      )}
                      {b.meetingType && (
                        <p className="flex items-center gap-2 text-[#aaa]">
                          <MapPin size={15} /> {MEETING_LABELS[b.meetingType] ?? b.meetingType}
                        </p>
                      )}
                      {b.attachmentUrl && (
                        <a href={b.attachmentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A8D8C8] hover:underline">
                          <Paperclip size={15} /> {b.attachmentName || "Pièce jointe (PDF)"}
                        </a>
                      )}
                      <p className="text-xs text-[#666]">
                        Reçu le {new Date(b.createdAt).toLocaleDateString("fr-FR")}
                        {b.date ? ` · souhaite le ${b.date} à ${b.time}` : ""}
                      </p>
                      {b.message && (
                        <p className="text-sm text-[#999] bg-white/[0.03] rounded-lg p-3 mt-2">{b.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[11px] tracking-[0.15em] uppercase text-[#666]">Statut</label>
                      <div className="flex flex-wrap gap-2">
                        {STATUSES.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(b.id, s)}
                            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                              b.status === s
                                ? STATUS_STYLES[s]
                                : "text-[#888] border-white/[0.06] hover:text-[#F5F5F0]"
                            }`}
                          >
                            {STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => remove(b.id)}
                        className="flex items-center gap-2 text-xs text-[#888] hover:text-[#F2B5D4] mt-2 self-start"
                      >
                        <Trash2 size={14} /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
