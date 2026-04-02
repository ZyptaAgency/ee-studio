"use client";
import { motion } from "framer-motion";

const WORDS = "STRATÉGIE • CRÉATION • CONTENU • IMPACT • DURABLE • MARKETING • VISION • ";
const REPEATED = WORDS.repeat(4);

const PASTEL_ACCENTS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#B5D8EB", "#FADADD", "#F5E6C8"];

export default function Marquee() {
  return (
    <section className="py-14 overflow-hidden border-y border-white/5 relative">
      {/* Pastel gradient line on top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E130, #F2B5D430, #A8D8C830, transparent)" }}
      />

      {/* Pastel floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {PASTEL_ACCENTS.map((color, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: color,
              left: `${10 + i * 16}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.08, 0.2, 0.08],
              scale: [0.8, 1.2, 0.8],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
        }}
        className="whitespace-nowrap"
      >
        <span className="text-5xl md:text-7xl font-['Outfit'] text-white/[0.03] tracking-wider" style={{ fontWeight: 800 }}>
          {REPEATED}
        </span>
      </motion.div>

      {/* Pastel gradient line on bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #A8D8C830, #B5D8EB30, #F5E6C830, transparent)" }}
      />
    </section>
  );
}
