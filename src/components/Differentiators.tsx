"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";
import AnimatedCounter from "./AnimatedCounter";

const PASTEL_ACCENTS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#B5D8EB"];

export default function Differentiators() {
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [colors, setColors] = useState<Record<number, string>>({});

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={10} seed={4} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(ellipse, #C3B1E1 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#F2B5D4] mb-5"
          >
            {t.differentiators.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            {t.differentiators.title_prefix}
            <span className="text-[#C3B1E1]">{t.differentiators.title_highlight}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 text-center">
          {t.differentiators.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onMouseEnter={() => setColors((p) => ({ ...p, [i]: next() }))}
              onMouseLeave={() => setColors((p) => { const c = { ...p }; delete c[i]; return c; })}
              className="cursor-default group"
            >
              <AnimatedCounter
                value={item.label}
                color={colors[i] || PASTEL_ACCENTS[i]}
                className="block text-4xl md:text-5xl lg:text-6xl font-['Outfit'] mb-5 transition-colors duration-300"
              />

              <motion.div
                className="w-8 h-[2px] rounded-full mx-auto mb-5"
                style={{ backgroundColor: `${PASTEL_ACCENTS[i]}40` }}
                whileHover={{ width: 48, backgroundColor: PASTEL_ACCENTS[i] }}
                transition={{ duration: 0.3 }}
              />

              <h3 className="text-base font-['Outfit'] mb-3 text-[#F5F5F0]" style={{ fontWeight: 600 }}>
                {item.title}
              </h3>
              <p className="text-sm text-[#888] font-light leading-[1.8]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
