import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (typeof body.done === "boolean") data.done = body.done;
  if (typeof body.title === "string") data.title = body.title.trim();
  if (["HIGH", "MEDIUM", "LOW"].includes(body.priority)) data.priority = body.priority;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;

  const todo = await prisma.todo.update({ where: { id }, data });
  return NextResponse.json({ todo });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
