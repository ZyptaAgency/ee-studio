"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingShapes from "./FloatingShapes";
import { PASTEL_COLORS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import type { Shape } from "./FloatingShapes";

gsap.registerPlugin(ScrollTrigger);

const KEYWORDS_EN = ["creative", "strategic", "operational", "marketing", "audiovisual", "sustainable"];
const KEYWORDS_FR = ["créatif", "stratégique", "opérationnel", "marketing", "audiovisuel", "durable"];

const PASTEL_MAP: Record<string, string> = {
  creative: "#F2B5D4", créatif: "#F2B5D4",
  strategic: "#C3B1E1", stratégique: "#C3B1E1",
  operational: "#A8D8C8", opérationnel: "#A8D8C8", opérationnelle: "#A8D8C8",
  marketing: "#FADADD",
  audiovisual: "#B5D8EB", audiovisuel: "#B5D8EB",
  sustainable: "#F5E6C8", durable: "#F5E6C8",
};

const aboutShapes: Shape[] = [
  { type: "ring", size: 90, x: "90%", y: "20%", color: PASTEL_COLORS[2], delay: 0, duration: 20 },
  { type: "circle", size: 10, x: "5%", y: "60%", color: PASTEL_COLORS[3], delay: 2, duration: 14 },
  { type: "diamond", size: 40, x: "85%", y: "70%", color: PASTEL_COLORS[0], delay: 1, duration: 22 },
  { type: "cross", size: 25, x: "15%", y: "15%", color: PASTEL_COLORS[5], delay: 3, duration: 18 },
];

export default function About() {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const keywords = lang === "en" ? KEYWORDS_EN : KEYWORDS_FR;

  useEffect(() => {
    if (!sectionRef.current) return;
    const words = wordsRef.current.filter(Boolean);
    words.forEach((word) => {
      gsap.fromTo(
        word,
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((tr) => tr.kill());
  }, [lang]);

  const renderWords = () => {
    return t.about.text.split(" ").map((word, i) => {
      const clean = word.replace(/[.,]/g, "").toLowerCase();
      const isKeyword = keywords.includes(clean);
      const color = PASTEL_MAP[clean];
      return (
        <span
          key={`${lang}-${i}`}
          ref={(el) => { if (el) wordsRef.current[i] = el; }}
          className="inline-block mr-[0.3em] transition-colors duration-300"
          style={
            isKeyword && color
              ? {
                  backgroundColor: `${color}25`,
                  borderBottom: `2px solid ${color}`,
                  padding: "0 3px",
                  borderRadius: "2px",
                }
              : {}
          }
        >
          {word}
        </span>
      );
    });
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-36 px-6 md:px-12">
      <FloatingShapes shapes={aboutShapes} opacity={0.06} />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-8"
        >
          {t.about.label}
        </motion.span>

        <div className="text-xl sm:text-2xl md:text-3xl font-heading font-light leading-relaxed tracking-wide text-[#F5F5F0]/90">
          {renderWords()}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex flex-col md:flex-row gap-8 md:gap-12 text-left"
        >
          <div className="flex-1">
            <p className="text-sm md:text-[15px] font-body font-light text-[#F5F5F0]/55 leading-relaxed">
              {t.about.col1}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-[15px] font-body font-light text-[#F5F5F0]/55 leading-relaxed">
              {t.about.col2}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
