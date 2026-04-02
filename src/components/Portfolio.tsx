"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PASTEL_COLORS } from "@/lib/constants";

const PROJECTS = [
  { title: "Campagne Digitale", category: "Marketing" },
  { title: "Identité Visuelle", category: "Branding" },
  { title: "Captation Événementielle", category: "Audiovisuel" },
  { title: "Stratégie ESG", category: "Consulting" },
  { title: "Contenu Réseaux Sociaux", category: "Création" },
  { title: "Direction Artistique", category: "Production" },
];

export default function Portfolio() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
        >
          Réalisations
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-20"
        >
          Portfolio
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => {
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Placeholder background */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, #1a1a1a 0%, #111111 100%)`,
                  }}
                />

                {/* Grid pattern placeholder */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `linear-gradient(${pastel}20 1px, transparent 1px), linear-gradient(90deg, ${pastel}20 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
                  style={{
                    backgroundColor: isHovered ? `${pastel}25` : "transparent",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <span className="font-heading text-xl md:text-2xl font-semibold text-[#F5F5F0] tracking-wide">
                    {project.title}
                  </span>
                  <span
                    className="mt-2 text-xs font-body tracking-[0.2em] uppercase"
                    style={{ color: pastel }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="font-body text-sm text-[#F5F5F0]/60">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm font-body text-[#F5F5F0]/30 tracking-wide"
        >
          Projets à venir — Restez connectés
        </motion.p>
      </div>
    </section>
  );
}
