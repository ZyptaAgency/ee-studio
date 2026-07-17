"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

export default function CtaBand() {
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [primaryColor, setPrimaryColor] = useState("#F5F5F0");
  const [secondaryColor, setSecondaryColor] = useState("#999");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-y border-white/5">
      <FloatingShapes count={8} seed={11} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.05] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #C3B1E1, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto px-8 md:px-16 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] leading-tight mb-5"
          style={{ fontWeight: 700 }}
        >
          {t.cta_band.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-[#999] font-light mb-10"
        >
          {t.cta_band.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300"
            style={{
              backgroundColor: primaryColor,
              color: "#0A0A0A",
              boxShadow: primaryColor !== "#F5F5F0" ? `0 0 36px ${primaryColor}40` : "none",
            }}
            onMouseEnter={() => setPrimaryColor(next())}
            onMouseLeave={() => setPrimaryColor("#F5F5F0")}
          >
            <Calendar size={16} strokeWidth={2} />
            {t.cta_band.primary}
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-light border transition-all duration-300"
            style={{
              color: secondaryColor === "#999" ? "#BBB" : secondaryColor,
              borderColor: secondaryColor === "#999" ? "rgba(255,255,255,0.12)" : secondaryColor,
            }}
            onMouseEnter={() => setSecondaryColor(next())}
            onMouseLeave={() => setSecondaryColor("#999")}
          >
            {t.cta_band.secondary}
            <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
