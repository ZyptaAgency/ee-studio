"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Stats = {
  revenueByMonth: { month: string; total: number }[];
  bookingsByMonth: { month: string; count: number }[];
  bookingsByStatus: { status: string; count: number }[];
};

const PIE_COLORS = ["#F2D5A8", "#A8D8C8", "#C3B1E1", "#F2B5D4"];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
      <p className="text-sm font-['Outfit'] font-medium mb-4">{title}</p>
      <div className="h-52">{children}</div>
    </div>
  );
}

export default function DashboardCharts() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 h-[248px] animate-pulse" />
        ))}
      </div>
    );
  }

  const hasStatus = stats.bookingsByStatus.some((s) => s.count > 0);

  const tooltipStyle = {
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    fontSize: 12,
    color: "#f5f5f0",
  };

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card title="Revenus encaissés (6 mois)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats.revenueByMonth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A8D8C8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#A8D8C8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#777", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#777", fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
            <Area type="monotone" dataKey="total" stroke="#A8D8C8" strokeWidth={2} fill="url(#rev)" name="Revenus" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Demandes reçues (6 mois)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.bookingsByMonth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#777", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: "#777", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="count" fill="#C3B1E1" radius={[4, 4, 0, 0]} name="Demandes" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Répartition par statut">
        {hasStatus ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.bookingsByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {stats.bookingsByStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-[#666]">Aucune donnée</div>
        )}
      </Card>
    </div>
  );
}
