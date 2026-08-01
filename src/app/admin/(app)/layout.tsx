import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = { title: "Tableau de bord - EE Studio" };

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5F0]">
      <AdminSidebar email={session.email} />
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12">{children}</div>
      </main>
    </div>
  );
}
