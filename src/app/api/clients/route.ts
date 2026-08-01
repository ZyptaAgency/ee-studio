import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true, invoices: true } } },
  });
  return NextResponse.json({ clients });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, company, notes } = body ?? {};
  if (!name || !email) return NextResponse.json({ error: "Nom et email requis" }, { status: 400 });

  const client = await prisma.client.create({
    data: {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      notes: notes ? String(notes).trim() : null,
    },
  });
  return NextResponse.json({ client });
}
