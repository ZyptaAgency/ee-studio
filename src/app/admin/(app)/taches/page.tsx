import { prisma } from "@/lib/prisma";
import TodosManager, { type TodoRow } from "./TodosManager";

export const dynamic = "force-dynamic";

export default async function TachesPage() {
  const todos = await prisma.todo.findMany({ orderBy: [{ done: "asc" }, { createdAt: "desc" }] });
  const rows: TodoRow[] = todos.map((t) => ({
    id: t.id,
    title: t.title,
    done: t.done,
    priority: t.priority,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Tâches</h1>
        <p className="text-sm text-[#777] mt-1">Organise ton suivi : relances, préparations, livrables</p>
      </div>
      <TodosManager todos={rows} />
    </div>
  );
}
