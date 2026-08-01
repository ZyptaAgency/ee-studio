import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: { lines: true },
  });
  return NextResponse.json({ invoices });
}

async function nextInvoiceNumber() {
  const year = new Date().getFullYear();
  const prefix = `EE-${year}-`;
  const last = await prisma.invoice.findFirst({
    where: { number: { startsWith: prefix } },
    orderBy: { number: "desc" },
    select: { number: true },
  });
  let seq = 1;
  if (last) {
    const n = parseInt(last.number.slice(prefix.length), 10);
    if (!Number.isNaN(n)) seq = n + 1;
  }
  return `${prefix}${String(seq).padStart(4, "0")}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      clientName,
      clientEmail,
      clientAddr,
      clientId,
      currency = "USD",
      taxRate = 0,
      dueDate,
      notes,
      status = "DRAFT",
      lines = [],
    } = body ?? {};

    if (!clientName || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: "Client et au moins une ligne requis" }, { status: 400 });
    }

    const normalizedLines = lines.map((l: { description?: string; quantity?: number; unitPrice?: number }) => {
      const quantity = Number(l.quantity) || 0;
      const unitPrice = Number(l.unitPrice) || 0;
      return {
        description: String(l.description ?? "").trim(),
        quantity,
        unitPrice,
        amount: Math.round(quantity * unitPrice * 100) / 100,
      };
    });

    const subtotal = Math.round(normalizedLines.reduce((s, l) => s + l.amount, 0) * 100) / 100;
    const rate = Number(taxRate) || 0;
    const taxAmount = Math.round(subtotal * (rate / 100) * 100) / 100;
    const total = Math.round((subtotal + taxAmount) * 100) / 100;

    const number = await nextInvoiceNumber();

    const invoice = await prisma.invoice.create({
      data: {
        number,
        clientName: String(clientName).trim(),
        clientEmail: clientEmail ? String(clientEmail).trim() : null,
        clientAddr: clientAddr ? String(clientAddr).trim() : null,
        clientId: clientId || null,
        currency,
        taxRate: rate,
        subtotal,
        taxAmount,
        total,
        notes: notes ? String(notes).trim() : null,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        lines: { create: normalizedLines },
      },
      include: { lines: true },
    });

    return NextResponse.json({ invoice });
  } catch (e) {
    console.error("Invoice create error", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
