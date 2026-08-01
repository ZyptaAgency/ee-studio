"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, CalendarClock, Users, FileText, LogOut, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/rendez-vous", label: "Rendez-vous", icon: CalendarClock },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/factures", label: "Factures", icon: FileText },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const nav = (
    <nav className="flex flex-col gap-1">
      {LINKS.map((l) => {
        const active = isActive(l.href, l.exact);
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              active
                ? "bg-[#A8D8C8]/10 text-[#A8D8C8]"
                : "text-[#999] hover:text-[#F5F5F0] hover:bg-white/[0.04]"
            }`}
          >
            <Icon size={18} strokeWidth={1.75} />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 h-16 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/[0.06]">
        <Image src="/logo.png" alt="EE Studio" width={100} height={34} className="h-8 w-auto object-contain" />
        <button onClick={() => setOpen((o) => !o)} className="text-[#F5F5F0] p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/70" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col p-5 transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-2 py-4 mb-4">
          <Image src="/logo.png" alt="EE Studio" width={120} height={40} className="h-9 w-auto object-contain" />
        </div>
        {nav}
        <div className="mt-auto pt-4 border-t border-white/[0.06]">
          <p className="px-4 text-[11px] text-[#666] truncate mb-3">{email}</p>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#999] hover:text-[#F2B5D4] hover:bg-white/[0.04] w-full transition-colors"
          >
            <LogOut size={18} strokeWidth={1.75} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
