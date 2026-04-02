"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";

export default function About() {
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [highlightColors, setHighlightColors] = useState<Record<string, string>>({});

  const handleKeywordHover = (word: string) => {
    setHighlightColors((prev) => ({ ...prev, [word]: next() }));
  };

  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={10} seed={2} />

      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#C3B1E1" }} />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#A8D8C8" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#C3B1E1] mb-5"
          >
            {t.about.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] leading-tight"
            style={{ fontWeight: 700 }}
          >
            {t.about.title_prefix}
            {t.about.keywords.map((word, i) => (
              <span key={word}>
                <span
                  className="relative cursor-default transition-colors duration-300 inline-block"
                  onMouseEnter={() => handleKeywordHover(word)}
                  style={{ color: highlightColors[word] || "#F5F5F0" }}
                >
                  {word}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                    style={{ backgroundColor: highlightColors[word] || "transparent", width: highlightColors[word] ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                {i < t.about.keywords.length - 1 ? (i === t.about.keywords.length - 2 ? t.about.and : ", ") : "."}
              </span>
            ))}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full hidden md:block" style={{ background: "linear-gradient(to bottom, #C3B1E140, transparent)" }} />
            <p className="text-base md:text-lg leading-[1.9] text-[#BBB] font-light text-center md:text-left md:pl-6">
              {t.about.p1}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full hidden md:block" style={{ background: "linear-gradient(to bottom, #F2B5D440, transparent)" }} />
            <p className="text-base md:text-lg leading-[1.9] text-[#BBB] font-light text-center md:text-left md:pl-6">
              {t.about.p2}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="h-[1px] mt-28 origin-center max-w-sm mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, #C3B1E150, #F2B5D450, #A8D8C850, transparent)" }}
        />
      </div>
    </section>
  );
}
