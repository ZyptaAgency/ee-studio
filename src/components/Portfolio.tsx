"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";

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
    <section id="portfolio" className="py-32 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.2em] uppercase text-[#666] mb-4"
      >
        Réalisations
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] mb-20"
        style={{ fontWeight: 700 }}
      >
        Portfolio
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setColors((p) => ({ ...p, [i]: next() }))}
            onMouseLeave={() => setColors((p) => { const c = { ...p }; delete c[i]; return c; })}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
            style={{ backgroundColor: "#161616" }}
          >
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                backgroundColor: colors[i] ? `${colors[i]}10` : "#161616",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span
                className="text-xs tracking-[0.15em] uppercase mb-2 transition-colors duration-300"
                style={{ color: colors[i] || "#666" }}
              >
                {project.category}
              </span>
              <h3 className="text-lg md:text-xl font-['Outfit']" style={{ fontWeight: 600 }}>
                {project.title}
              </h3>
            </div>

            <div
              className="absolute top-6 right-6 w-3 h-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
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
        className="text-center text-sm text-[#555] mt-12 font-light"
      >
        Plus de projets à venir — Restez connectés
      </motion.p>
    </section>
  );
}
