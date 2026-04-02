"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

interface ServiceDetail {
  title: string;
  desc: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  heroLine: string;
  fullDesc: string;
  details: ServiceDetail[];
}

export default function ServicePage({
  icon: Icon,
  title,
  heroLine,
  fullDesc,
  details,
}: ServicePageProps) {
  const { next } = usePastelRotation();
  const [accentColor, setAccentColor] = useState("#666");
  const [cardColors, setCardColors] = useState<Record<number, string>>({});
  const [backColor, setBackColor] = useState("#666");

  return (
    <>
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-xl bg-[#0A0A0A]/90 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 text-sm tracking-wide transition-colors duration-300"
            style={{ color: backColor }}
            onMouseEnter={() => setBackColor(next())}
            onMouseLeave={() => setBackColor("#666")}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            Retour
          </a>
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Icon
              size={36}
              strokeWidth={1.5}
              className="transition-colors duration-300"
              style={{ color: accentColor }}
              onMouseEnter={() => setAccentColor(next())}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-['Outfit'] leading-tight mb-6"
            style={{ fontWeight: 800 }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide mb-12"
            style={{ color: accentColor }}
            onMouseEnter={() => setAccentColor(next())}
          >
            {heroLine}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-[1px] bg-white/10 origin-left mb-16"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed text-[#BBB] font-light max-w-3xl"
          >
            {fullDesc}
          </motion.p>
        </section>

        {/* Details grid */}
        <section className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto pb-32 md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase text-[#666] mb-16"
          >
            Ce que nous faisons
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {details.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setCardColors((p) => ({ ...p, [i]: next() }))}
                onMouseLeave={() =>
                  setCardColors((p) => {
                    const c = { ...p };
                    delete c[i];
                    return c;
                  })
                }
                className="p-8 md:p-10 rounded-2xl border border-white/5 bg-[#111] transition-all duration-500"
                style={{
                  borderColor: cardColors[i] ? `${cardColors[i]}30` : "rgba(255,255,255,0.05)",
                  transform: cardColors[i] ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <span
                  className="text-xs font-['Outfit'] tracking-wider mb-4 block transition-colors duration-300"
                  style={{ color: cardColors[i] || "#444", fontWeight: 600 }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-lg font-['Outfit'] mb-3 transition-colors duration-300"
                  style={{ color: cardColors[i] || "#F5F5F0", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#888] font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="border-t border-white/5 py-24 px-6 md:px-12 lg:px-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-['Outfit'] mb-8"
            style={{ fontWeight: 700 }}
          >
            Un projet en tête ?
          </motion.h2>
          <motion.a
            href="/#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-8 py-3 rounded-full text-sm tracking-[0.1em] uppercase font-light border border-[#333] text-[#999] hover:text-[#F5F5F0] transition-all duration-400"
            onMouseEnter={(e) => {
              const c = next();
              e.currentTarget.style.borderColor = c;
              e.currentTarget.style.color = c;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.color = "#999";
            }}
          >
            Nous contacter
          </motion.a>
        </section>
      </main>

      {/* Mini footer */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-12 text-center">
        <p className="text-xs text-[#444] font-light">
          © {new Date().getFullYear()} EE Studio SARL — Tous droits réservés
        </p>
        <a
          href="https://zypta.be"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[#333] hover:text-[#555] transition-colors duration-300 tracking-wider mt-2 inline-block"
        >
          Crafted by{" "}
          <span className="font-ethnocentric">ZYP</span>
          <span className="font-supernova">TA</span>
        </a>
      </footer>
    </>
  );
}
