import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const data: Record<string, unknown> = {};

  for (const key of [
    "companyName",
    "companyEmail",
    "companyPhone",
    "companyAddress",
    "taxId",
    "logo",
    "defaultCurrency",
    "invoiceNotes",
    "weatherCity",
  ] as const) {
    if (typeof body[key] === "string") data[key] = body[key];
  }
  if (body.defaultTaxRate !== undefined) data.defaultTaxRate = Number(body.defaultTaxRate) || 0;
  if (body.revenueGoal !== undefined) data.revenueGoal = Number(body.revenueGoal) || 0;

  await getSettings(); // ensure the row exists
  const settings = await prisma.settings.update({ where: { id: "default" }, data });
  return NextResponse.json({ settings });
}
