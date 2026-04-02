"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PASTEL_COLORS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import FloatingShapes from "./FloatingShapes";
import type { Shape } from "./FloatingShapes";

const portfolioShapes: Shape[] = [
  { type: "diamond", size: 50, x: "3%", y: "50%", color: PASTEL_COLORS[4], delay: 0, duration: 21 },
  { type: "triangle", size: 40, x: "93%", y: "30%", color: PASTEL_COLORS[1], delay: 1.5, duration: 18 },
  { type: "circle", size: 7, x: "50%", y: "90%", color: PASTEL_COLORS[5], delay: 3, duration: 14 },
];

export default function Portfolio() {
  const { t } = useI18n();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="portfolio" className="relative py-24 md:py-36 px-6 md:px-12">
      <FloatingShapes shapes={portfolioShapes} opacity={0.06} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
          >
            {t.portfolio.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl font-bold tracking-tight"
          >
            {t.portfolio.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.portfolio.projects.map((project, i) => {
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#111111]" />

                <div className="absolute inset-0 opacity-[0.08]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `linear-gradient(${pastel}18 1px, transparent 1px), linear-gradient(90deg, ${pastel}18 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-700"
                  width="100" height="100" viewBox="0 0 100 100"
                >
                  {i % 3 === 0 && <circle cx="50" cy="50" r="45" fill="none" stroke={pastel} strokeWidth="1" />}
                  {i % 3 === 1 && <polygon points="50,5 95,85 5,85" fill="none" stroke={pastel} strokeWidth="1" />}
                  {i % 3 === 2 && <rect x="8" y="8" width="84" height="84" fill="none" stroke={pastel} strokeWidth="1" rx="6" />}
                </svg>

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
                  style={{
                    backgroundColor: isHovered ? `${pastel}20` : "transparent",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <span className="font-heading text-lg md:text-xl font-semibold text-[#F5F5F0] tracking-wide">
                    {project.title}
                  </span>
                  <span className="mt-1.5 text-[11px] font-body tracking-[0.2em] uppercase" style={{ color: pastel }}>
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="font-body text-xs text-[#F5F5F0]/50">
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
          className="text-center mt-10 text-xs font-body text-[#F5F5F0]/25 tracking-wider"
        >
          {t.portfolio.coming}
        </motion.p>
      </div>
    </section>
  );
}
