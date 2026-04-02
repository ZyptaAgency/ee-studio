"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";

const PROJECTS = [
  { title: "Campagne Digitale", category: "Marketing" },
  { title: "Identité Visuelle", category: "Branding" },
  { title: "Couverture Événement", category: "Audiovisuel" },
  { title: "Stratégie ESG", category: "Consulting" },
];

export default function Portfolio() {
  const { next } = usePastelRotation();
  const [colors, setColors] = useState<Record<number, string>>({});

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FloatingShapes count={6} seed={5} />

      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase text-[#B5D8EB] mb-4"
        >
          Réalisations
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
          style={{ fontWeight: 700 }}
        >
          Portfolio
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setColors((p) => ({ ...p, [i]: next() }))}
            onMouseLeave={() => setColors((p) => { const c = { ...p }; delete c[i]; return c; })}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group"
            style={{ backgroundColor: "#111" }}
          >
            {/* Pastel gradient background on hover */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: colors[i]
                  ? `radial-gradient(circle at 50% 50%, ${colors[i]}12 0%, transparent 70%)`
                  : "transparent",
              }}
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center">
              <span
                className="text-xs tracking-[0.2em] uppercase mb-3 transition-colors duration-300"
                style={{ color: colors[i] || "#666" }}
              >
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-['Outfit']" style={{ fontWeight: 600 }}>
                {project.title}
              </h3>
            </div>

            {/* Corner accents */}
            <div
              className="absolute top-5 right-5 w-3 h-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: colors[i] || "transparent" }}
            />
            <div
              className="absolute bottom-5 left-5 w-2 h-2 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-60"
              style={{ backgroundColor: colors[i] || "transparent" }}
            />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-sm text-[#666] mt-12 font-light"
      >
        Plus de projets à venir — Restez connectés
      </motion.p>
    </section>
  );
}
