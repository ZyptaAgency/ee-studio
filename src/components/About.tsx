"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingShapes from "./FloatingShapes";
import { PASTEL_COLORS } from "@/lib/constants";
import type { Shape } from "./FloatingShapes";

gsap.registerPlugin(ScrollTrigger);

const KEYWORDS = [
  "creative",
  "strategic",
  "operational",
  "marketing",
  "audiovisual",
  "sustainable",
];

const PASTEL_MAP: Record<string, string> = {
  creative: "#F2B5D4",
  strategic: "#C3B1E1",
  operational: "#A8D8C8",
  marketing: "#FADADD",
  audiovisual: "#B5D8EB",
  sustainable: "#F5E6C8",
};

const aboutShapes: Shape[] = [
  { type: "ring", size: 90, x: "90%", y: "20%", color: PASTEL_COLORS[2], delay: 0, duration: 20 },
  { type: "circle", size: 10, x: "5%", y: "60%", color: PASTEL_COLORS[3], delay: 2, duration: 14 },
  { type: "diamond", size: 40, x: "85%", y: "70%", color: PASTEL_COLORS[0], delay: 1, duration: 22 },
  { type: "cross", size: 25, x: "15%", y: "15%", color: PASTEL_COLORS[5], delay: 3, duration: 18 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const text =
    "EE Studio is a creative, strategic and operational studio based in Kinshasa. Founded by Lise-Laure, the studio supports brands in their marketing development, from strategy to audiovisual content production, with a creative, operational and sustainable approach.";

  const renderWords = () => {
    return text.split(" ").map((word, i) => {
      const clean = word.replace(/[.,]/g, "").toLowerCase();
      const isKeyword = KEYWORDS.includes(clean);
      return (
        <span
          key={i}
          ref={(el) => {
            if (el) wordsRef.current[i] = el;
          }}
          className="inline-block mr-[0.3em] transition-colors duration-300"
          style={
            isKeyword
              ? {
                  backgroundColor: `${PASTEL_MAP[clean]}30`,
                  borderBottom: `2px solid ${PASTEL_MAP[clean]}`,
                  padding: "0 4px",
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
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <FloatingShapes shapes={aboutShapes} opacity={0.06} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-8"
        >
          About
        </motion.span>

        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light leading-snug tracking-wide text-[#F5F5F0]/90">
          {renderWords()}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row gap-8 md:gap-16"
        >
          <div className="flex-1">
            <p className="text-base md:text-lg font-body font-light text-[#F5F5F0]/60 leading-relaxed">
              Lise-Laure doesn&apos;t just advise — she executes. With an
              integrated team and professional equipment, EE Studio handles
              every step, from strategic thinking to final delivery.
            </p>
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg font-body font-light text-[#F5F5F0]/60 leading-relaxed">
              The studio combines sharp marketing expertise with a responsible
              vision, integrating ESG considerations into every project for
              lasting impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
