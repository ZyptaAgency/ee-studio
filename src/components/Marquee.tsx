"use client";
import { motion } from "framer-motion";

const WORDS = "STRATÉGIE • CRÉATION • CONTENU • IMPACT • DURABLE • MARKETING • VISION • ";
const REPEATED = WORDS.repeat(4);

export default function Marquee() {
  return (
    <section className="py-16 overflow-hidden border-y border-white/5">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
        }}
        className="whitespace-nowrap"
      >
        <span className="text-5xl md:text-7xl font-['Outfit'] text-white/[0.04] tracking-wider" style={{ fontWeight: 800 }}>
          {REPEATED}
        </span>
      </motion.div>
    </section>
  );
}
