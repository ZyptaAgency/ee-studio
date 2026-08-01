"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, Calendar } from "lucide-react";

export type TodoRow = {
  id: string;
  title: string;
  done: boolean;
  priority: string;
  dueDate: string | null;
};

const PRIORITY = {
  HIGH: { label: "Haute", cls: "bg-[#F2B5D4]/15 text-[#F2B5D4]" },
  MEDIUM: { label: "Moyenne", cls: "bg-[#F2D5A8]/15 text-[#F2D5A8]" },
  LOW: { label: "Basse", cls: "bg-[#A8D8C8]/15 text-[#A8D8C8]" },
} as const;

export default function TodosManager({ todos }: { todos: TodoRow[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [saving, setSaving] = useState(false);

  const filtered = todos.filter((t) =>
    filter === "all" ? true : filter === "pending" ? !t.done : t.done
  );

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, dueDate: dueDate || null }),
    });
    setSaving(false);
    setTitle("");
    setDueDate("");
    setPriority("MEDIUM");
    router.refresh();
  };

  const toggle = async (id: string, done: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <form onSubmit={add} className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nouvelle tâche…"
            className="flex-1 bg-transparent border-b border-white/[0.1] py-2.5 text-sm text-[#F5F5F0] placeholder-[#555] outline-none focus:border-[#A8D8C8]"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#A8D8C8]/40"
          >
            <option value="HIGH">Haute</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="LOW">Basse</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-[#0f0f0f] border border-white/[0.08] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#A8D8C8]/40 [color-scheme:dark]"
          />
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] disabled:opacity-50"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </form>

      <div className="flex gap-2 mb-5">
        {(["all", "pending", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs border transition-colors ${
              filter === f ? "bg-white/[0.08] text-[#F5F5F0] border-white/10" : "text-[#888] border-white/[0.06] hover:text-[#F5F5F0]"
            }`}
          >
            {f === "all" ? "Toutes" : f === "pending" ? "À faire" : "Terminées"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] py-16 text-center text-sm text-[#666]">
          Aucune tâche.
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] divide-y divide-white/[0.05]">
          {filtered.map((t) => {
            const p = PRIORITY[t.priority as keyof typeof PRIORITY] ?? PRIORITY.MEDIUM;
            const overdue = t.dueDate && !t.done && new Date(t.dueDate) < new Date(new Date().toDateString());
            return (
              <div key={t.id} className="flex items-center gap-4 px-5 py-4">
                <button
                  onClick={() => toggle(t.id, t.done)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    t.done ? "bg-[#A8D8C8] border-[#A8D8C8]" : "border-white/20 hover:border-[#A8D8C8]"
                  }`}
                >
                  {t.done && <Check size={13} className="text-[#0a0a0a]" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${t.done ? "line-through text-[#666]" : "text-[#F5F5F0]"}`}>{t.title}</p>
                  {t.dueDate && (
                    <p className={`text-xs flex items-center gap-1 mt-0.5 ${overdue ? "text-[#F2B5D4]" : "text-[#777]"}`}>
                      <Calendar size={11} /> {new Date(t.dueDate).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full ${p.cls} shrink-0`}>{p.label}</span>
                <button onClick={() => remove(t.id)} className="text-[#666] hover:text-[#F2B5D4] shrink-0">
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
