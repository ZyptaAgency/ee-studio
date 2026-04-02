"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";

export default function About() {
  const { next } = usePastelRotation();
  const [highlightColors, setHighlightColors] = useState<Record<string, string>>({});

  const keywords = ["créatif", "stratégique", "opérationnel", "durable"];

  const handleKeywordHover = (word: string) => {
    setHighlightColors((prev) => ({ ...prev, [word]: next() }));
  };

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FloatingShapes count={6} seed={2} />

      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase text-[#C3B1E1] mb-4"
        >
          À propos
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] leading-tight"
          style={{ fontWeight: 700 }}
        >
          Un studio{" "}
          {keywords.map((word, i) => (
            <span key={word}>
              <span
                className="relative cursor-default transition-colors duration-300 inline-block"
                onMouseEnter={() => handleKeywordHover(word)}
                style={{ color: highlightColors[word] || "#F5F5F0" }}
              >
                {word}
              </span>
              {i < keywords.length - 1 ? (i === keywords.length - 2 ? " et " : ", ") : "."}
            </span>
          ))}
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-base md:text-lg leading-relaxed text-[#BBB] font-light text-center md:text-left">
            EE Studio est un studio créatif et stratégique basé à Kinshasa, fondé par Lise-Laure.
            Nous accompagnons les marques dans leur développement marketing — de la réflexion
            stratégique à la production de contenu, en passant par l&apos;exécution terrain.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-base md:text-lg leading-relaxed text-[#BBB] font-light text-center md:text-left">
            Notre différence : une approche 360° qui combine marketing, production audiovisuelle
            et consulting en développement durable. On ne conseille pas seulement — on produit,
            on livre, on exécute.
          </p>
        </motion.div>
      </div>

      {/* Separator with pastel gradient */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="h-[1px] mt-24 origin-center max-w-md mx-auto"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E140, #F2B5D440, transparent)" }}
      />
    </section>
  );
}
