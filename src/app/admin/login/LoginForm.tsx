"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Identifiants incorrects");
        return;
      }
      const from = params.get("from") || "/admin";
      router.replace(from);
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl bg-[#A8D8C8]" />
      <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full opacity-[0.05] blur-3xl bg-[#C3B1E1]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <Image src="/logo.png" alt="EE Studio" width={140} height={48} className="h-12 w-auto object-contain mb-6" />
          <h1 className="text-2xl font-['Outfit'] font-semibold text-[#F5F5F0]">Espace administrateur</h1>
          <p className="text-sm text-[#777] font-light mt-2">Connectez-vous pour accéder au tableau de bord</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111]/80 border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm space-y-6"
        >
          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-white/10 pl-7 py-3 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none focus:border-[#A8D8C8] transition-colors"
                placeholder="Adresse email"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] tracking-[0.15em] uppercase text-[#666] mb-2 block">Mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-white/10 pl-7 py-3 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none focus:border-[#A8D8C8] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-[#F2B5D4] font-light">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full text-sm tracking-[0.12em] uppercase font-medium bg-[#A8D8C8] text-[#0a0a0a] hover:bg-[#95cbb9] transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
