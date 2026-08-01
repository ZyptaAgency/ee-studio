import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MONTHS_FR = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function monthKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}`;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [paidInvoices, bookings, statusGroups] = await Promise.all([
    prisma.invoice.findMany({
      where: { status: "PAID", issueDate: { gte: start } },
      select: { total: true, issueDate: true, currency: true },
    }),
    prisma.booking.findMany({
      where: { createdAt: { gte: start } },
      select: { createdAt: true },
    }),
    prisma.booking.groupBy({ by: ["status"], _count: { status: true } }),
  ]);

  // Build 6-month skeleton
  const months: { key: string; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: monthKey(d), label: MONTHS_FR[d.getMonth()] });
  }

  const revenueMap = new Map<string, number>();
  for (const inv of paidInvoices) {
    const k = monthKey(new Date(inv.issueDate));
    revenueMap.set(k, (revenueMap.get(k) ?? 0) + inv.total);
  }
  const bookingMap = new Map<string, number>();
  for (const b of bookings) {
    const k = monthKey(new Date(b.createdAt));
    bookingMap.set(k, (bookingMap.get(k) ?? 0) + 1);
  }

  const revenueByMonth = months.map((m) => ({ month: m.label, total: Math.round(revenueMap.get(m.key) ?? 0) }));
  const bookingsByMonth = months.map((m) => ({ month: m.label, count: bookingMap.get(m.key) ?? 0 }));

  const statusLabels: Record<string, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmé",
    COMPLETED: "Terminé",
    CANCELLED: "Annulé",
  };
  const bookingsByStatus = statusGroups.map((g) => ({
    status: statusLabels[g.status] ?? g.status,
    count: g._count.status,
  }));

  return NextResponse.json({ revenueByMonth, bookingsByMonth, bookingsByStatus });
}
