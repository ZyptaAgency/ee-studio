"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import Image from "next/image";
import FloatingShapes from "./FloatingShapes";

const PASTEL_ACCENTS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#B5D8EB", "#FADADD", "#F5E6C8"];

export default function Hero() {
  const { random } = usePastelRotation();
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [ctaColor, setCtaColor] = useState("#999");
  const [letterColors, setLetterColors] = useState<Record<number, string>>({});

  const titleLetters = "EE STUDIO".split("");

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <FloatingShapes count={16} seed={1} />

      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#C3B1E1" }} />
      <div className="absolute bottom-32 right-16 w-[250px] h-[250px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#F2B5D4" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#A8D8C8" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 md:mb-10 relative"
        style={{ marginRight: "-6%" }}
      >
        <Image
          src="/logo.png"
          alt="EE Studio Logo"
          width={430}
          height={304}
          className="w-48 md:w-72 h-auto object-contain"
          priority
        />
      </motion.div>

      <div className="flex items-center justify-center gap-1 md:gap-2 mb-6">
        {titleLetters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Outfit'] tracking-tight cursor-default"
            style={{
              fontWeight: 900,
              color: letterColors[i] || "#F5F5F0",
              transition: "color 0.05s ease-out, transform 0.15s ease-out",
              transform: letterColors[i] ? "scale(1.08)" : "scale(1)",
            }}
            onMouseEnter={() => setLetterColors((p) => ({ ...p, [i]: random() }))}
            onMouseLeave={() => setLetterColors((p) => { const c = { ...p }; delete c[i]; return c; })}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-lg md:text-xl font-light tracking-[0.2em] mb-16 text-center"
      >
        {t.hero.subtitle.split(". ").map((part, i, arr) => (
          <span key={i}>
            <span className="text-[#BBB]">{part.replace(".", "")}</span>
            {i < arr.length - 1 && (
              <span className="inline-block mx-2 w-1.5 h-1.5 rounded-full align-middle" style={{ backgroundColor: PASTEL_ACCENTS[i] }} />
            )}
            {i === arr.length - 1 && "."}
          </span>
        ))}
      </motion.p>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="group relative px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase font-light border transition-all duration-300"
        style={{
          color: ctaColor === "#999" ? "#BBB" : ctaColor,
          borderColor: ctaColor === "#999" ? "rgba(255,255,255,0.1)" : `${ctaColor}50`,
          boxShadow: ctaColor !== "#999" ? `0 0 30px ${ctaColor}18` : "none",
        }}
        onMouseEnter={() => setCtaColor(next())}
        onMouseLeave={() => setCtaColor("#999")}
      >
        {t.hero.cta}
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#666]">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8"
          style={{ background: "linear-gradient(to bottom, #C3B1E1, #F2B5D4, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
