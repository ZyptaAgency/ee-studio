import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, color: "#1a1a1a", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  brand: { fontSize: 22, fontWeight: "bold", color: "#111" },
  brandSub: { fontSize: 9, color: "#777", marginTop: 4 },
  invoiceTitle: { fontSize: 16, fontWeight: "bold", textAlign: "right" },
  meta: { fontSize: 9, color: "#555", textAlign: "right", marginTop: 4 },
  section: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  block: { maxWidth: 240 },
  label: { fontSize: 8, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  strong: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  text: { fontSize: 9, color: "#444", marginBottom: 1 },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    paddingBottom: 6,
    marginBottom: 6,
  },
  row: { flexDirection: "row", paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: "#e5e5e5" },
  cDesc: { flex: 4 },
  cQty: { flex: 1, textAlign: "right" },
  cPrice: { flex: 1.5, textAlign: "right" },
  cAmount: { flex: 1.5, textAlign: "right" },
  headText: { fontSize: 8, color: "#999", textTransform: "uppercase", letterSpacing: 1 },
  totals: { marginTop: 20, alignSelf: "flex-end", width: 220 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#111",
  },
  grandText: { fontSize: 13, fontWeight: "bold" },
  notes: { marginTop: 40, fontSize: 9, color: "#666" },
  footer: { position: "absolute", bottom: 32, left: 48, right: 48, textAlign: "center", fontSize: 8, color: "#aaa" },
});

function money(n: number, currency: string) {
  return `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

function fmtDate(d: Date | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("fr-FR");
}

const h = React.createElement;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const inv = await prisma.invoice.findUnique({ where: { id }, include: { lines: true } });
  if (!inv) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const doc = h(
    Document,
    {},
    h(
      Page,
      { size: "A4", style: styles.page },
      // Header
      h(
        View,
        { style: styles.header },
        h(
          View,
          {},
          h(Text, { style: styles.brand }, "EE Studio"),
          h(Text, { style: styles.brandSub }, "Stratégie. Création. Impact."),
          h(Text, { style: styles.brandSub }, "Kinshasa, RDC · contact@ee-studio.info")
        ),
        h(
          View,
          {},
          h(Text, { style: styles.invoiceTitle }, "FACTURE"),
          h(Text, { style: styles.meta }, `N° ${inv.number}`),
          h(Text, { style: styles.meta }, `Émise le ${fmtDate(inv.issueDate)}`),
          h(Text, { style: styles.meta }, `Échéance ${fmtDate(inv.dueDate)}`)
        )
      ),
      // Client
      h(
        View,
        { style: styles.section },
        h(
          View,
          { style: styles.block },
          h(Text, { style: styles.label }, "Facturé à"),
          h(Text, { style: styles.strong }, inv.clientName),
          inv.clientEmail ? h(Text, { style: styles.text }, inv.clientEmail) : null,
          inv.clientAddr ? h(Text, { style: styles.text }, inv.clientAddr) : null
        )
      ),
      // Table head
      h(
        View,
        { style: styles.tableHead },
        h(Text, { style: [styles.headText, styles.cDesc] }, "Description"),
        h(Text, { style: [styles.headText, styles.cQty] }, "Qté"),
        h(Text, { style: [styles.headText, styles.cPrice] }, "P.U."),
        h(Text, { style: [styles.headText, styles.cAmount] }, "Montant")
      ),
      // Rows
      ...inv.lines.map((l) =>
        h(
          View,
          { style: styles.row, key: l.id },
          h(Text, { style: styles.cDesc }, l.description),
          h(Text, { style: styles.cQty }, String(l.quantity)),
          h(Text, { style: styles.cPrice }, money(l.unitPrice, inv.currency)),
          h(Text, { style: styles.cAmount }, money(l.amount, inv.currency))
        )
      ),
      // Totals
      h(
        View,
        { style: styles.totals },
        h(
          View,
          { style: styles.totalRow },
          h(Text, { style: styles.text }, "Sous-total"),
          h(Text, { style: styles.text }, money(inv.subtotal, inv.currency))
        ),
        h(
          View,
          { style: styles.totalRow },
          h(Text, { style: styles.text }, `TVA (${inv.taxRate}%)`),
          h(Text, { style: styles.text }, money(inv.taxAmount, inv.currency))
        ),
        h(
          View,
          { style: styles.grandRow },
          h(Text, { style: styles.grandText }, "Total"),
          h(Text, { style: styles.grandText }, money(inv.total, inv.currency))
        )
      ),
      // Notes
      inv.notes ? h(Text, { style: styles.notes }, inv.notes) : null,
      h(Text, { style: styles.footer }, "Merci pour votre confiance — EE Studio")
    )
  );

  const buffer = await renderToBuffer(doc as unknown as React.ReactElement<DocumentProps>);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${inv.number}.pdf"`,
    },
  });
}
