import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CalendarClock, Users, FileText, Clock, ArrowRight } from "lucide-react";
import WeatherWidget from "./WeatherWidget";

export const dynamic = "force-dynamic";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-[#F2D5A8]/15 text-[#F2D5A8]",
  CONFIRMED: "bg-[#A8D8C8]/15 text-[#A8D8C8]",
  COMPLETED: "bg-[#C3B1E1]/15 text-[#C3B1E1]",
  CANCELLED: "bg-[#F2B5D4]/15 text-[#F2B5D4]",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  COMPLETED: "Terminé",
  CANCELLED: "Annulé",
};

export default async function OverviewPage() {
  const today = todayStr();

  const [totalBookings, pending, upcoming, totalClients, paidAgg, recent] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { date: { gte: today }, status: { in: ["PENDING", "CONFIRMED"] } } }),
    prisma.client.count(),
    prisma.invoice.aggregate({ _sum: { total: true }, where: { status: "PAID" } }),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const revenue = paidAgg._sum.total ?? 0;

  const kpis = [
    { label: "Rendez-vous à venir", value: upcoming, icon: CalendarClock, color: "#A8D8C8", href: "/admin/rendez-vous" },
    { label: "En attente", value: pending, icon: Clock, color: "#F2D5A8", href: "/admin/rendez-vous" },
    { label: "Clients", value: totalClients, icon: Users, color: "#C3B1E1", href: "/admin/clients" },
    { label: "Revenus encaissés", value: `${revenue.toLocaleString("fr-FR")} $`, icon: FileText, color: "#F2B5D4", href: "/admin/factures" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Vue d&apos;ensemble</h1>
        <p className="text-sm text-[#777] mt-1">
          {totalBookings} demande{totalBookings > 1 ? "s" : ""} reçue{totalBookings > 1 ? "s" : ""} au total
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid grid-cols-2 gap-5">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <Link
                key={k.label}
                href={k.href}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 hover:border-white/[0.12] transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${k.color}1a`, color: k.color }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <ArrowRight size={16} className="text-[#444] group-hover:text-[#888] transition-colors" />
                </div>
                <p className="text-2xl md:text-3xl font-['Outfit'] font-semibold">{k.value}</p>
                <p className="text-xs text-[#777] mt-1">{k.label}</p>
              </Link>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <h2 className="font-['Outfit'] font-medium">Dernières demandes</h2>
          <Link href="/admin/rendez-vous" className="text-xs text-[#A8D8C8] hover:underline flex items-center gap-1">
            Tout voir <ArrowRight size={13} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[#666]">Aucune demande pour le moment.</p>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {recent.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{b.name}</p>
                  <p className="text-xs text-[#777] truncate">{b.service}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-[#888] hidden sm:block">
                    {b.date} · {b.time}
                  </span>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full ${STATUS_STYLES[b.status] ?? ""}`}>
                    {STATUS_LABELS[b.status] ?? b.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
