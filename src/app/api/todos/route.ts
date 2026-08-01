import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const todos = await prisma.todo.findMany({ orderBy: [{ done: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json({ todos });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  if (!body.title || !String(body.title).trim()) {
    return NextResponse.json({ error: "Titre requis" }, { status: 400 });
  }
  const todo = await prisma.todo.create({
    data: {
      title: String(body.title).trim(),
      priority: ["HIGH", "MEDIUM", "LOW"].includes(body.priority) ? body.priority : "MEDIUM",
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    },
  });
  return NextResponse.json({ todo });
}
