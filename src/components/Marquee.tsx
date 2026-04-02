"use client";
import { motion } from "framer-motion";

const WORDS = "STRATÉGIE • CRÉATION • CONTENU • IMPACT • DURABLE • MARKETING • VISION • ";
const REPEATED = WORDS.repeat(4);

export default function Marquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-white/5 relative">
      {/* Pastel gradient line on top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E120, #F2B5D420, #A8D8C820, transparent)" }}
      />

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
        style={{ background: "linear-gradient(90deg, transparent, #A8D8C820, #B5D8EB20, #F5E6C820, transparent)" }}
      />
    </section>
  );
}
