"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";

const DIFFS = [
  {
    label: "360°",
    title: "Approche globale",
    desc: "De la stratégie à la création, jusqu'au terrain.",
  },
  {
    label: "100%",
    title: "Production interne",
    desc: "Matériel audiovisuel pro intégré, sans intermédiaire.",
  },
  {
    label: "2 en 1",
    title: "Marketing + ESG",
    desc: "Double compétence rare, une vision unique.",
  },
  {
    label: "Action",
    title: "On exécute",
    desc: "Pas seulement du conseil — on produit et on livre.",
  },
];

export default function Differentiators() {
  const { next } = usePastelRotation();
  const [colors, setColors] = useState<Record<number, string>>({});

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.2em] uppercase text-[#666] mb-4"
      >
        Pourquoi nous
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] mb-20"
        style={{ fontWeight: 700 }}
      >
        Ce qui nous différencie
      </motion.h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {DIFFS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setColors((p) => ({ ...p, [i]: next() }))}
            onMouseLeave={() => setColors((p) => { const c = { ...p }; delete c[i]; return c; })}
            className="cursor-default"
          >
            <span
              className="block text-4xl md:text-5xl font-['Outfit'] mb-4 transition-colors duration-300"
              style={{ color: colors[i] || "#F5F5F0", fontWeight: 800 }}
            >
              {item.label}
            </span>
            <h3 className="text-base font-['Outfit'] mb-2" style={{ fontWeight: 600 }}>
              {item.title}
            </h3>
            <p className="text-sm text-[#888] font-light leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
