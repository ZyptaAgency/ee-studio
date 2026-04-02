"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";

const PASTEL_ACCENTS = ["#C3B1E1", "#F2B5D4", "#A8D8C8", "#B5D8EB"];

export default function Portfolio() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [colors, setColors] = useState<Record<number, string>>({});

  return (
    <section id="portfolio" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={10} seed={5} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#B5D8EB" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#B5D8EB] mb-5"
          >
            {t.portfolio.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            {lang === "fr" ? "Notre " : "Our "}<span className="text-[#B5D8EB]">{t.portfolio.title}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.portfolio.projects.map((project, i) => {
            const defaultColor = PASTEL_ACCENTS[i % PASTEL_ACCENTS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setColors((p) => ({ ...p, [i]: next() }))}
                onMouseLeave={() => setColors((p) => { const c = { ...p }; delete c[i]; return c; })}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group border transition-all duration-500"
                style={{
                  backgroundColor: "#111",
                  borderColor: colors[i] ? `${colors[i]}25` : "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: colors[i]
                      ? `radial-gradient(circle at 50% 50%, ${colors[i]}14 0%, transparent 70%)`
                      : `radial-gradient(circle at 50% 50%, ${defaultColor}06 0%, transparent 70%)`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span
                    className="text-xs tracking-[0.2em] uppercase mb-3 transition-colors duration-300"
                    style={{ color: colors[i] || `${defaultColor}80` }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-['Outfit']" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>

                  <motion.div
                    className="h-[2px] rounded-full mt-4"
                    style={{
                      backgroundColor: colors[i] || `${defaultColor}30`,
                      width: colors[i] ? 60 : 30,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div
                  className="absolute top-5 right-5 w-3 h-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: colors[i] || defaultColor }}
                />
                <div
                  className="absolute bottom-5 left-5 w-2 h-2 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-60"
                  style={{ backgroundColor: colors[i] || defaultColor }}
                />
                <div
                  className="absolute top-5 left-5 w-1.5 h-1.5 rounded-full transition-all duration-400 opacity-0 group-hover:opacity-40"
                  style={{ backgroundColor: colors[i] || defaultColor }}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm mt-14 font-light"
        >
          <span className="text-[#666]">{t.portfolio.coming}</span>{" "}
          <span className="text-[#C3B1E1]">{t.portfolio.stay}</span>
        </motion.p>
      </div>
    </section>
  );
}
