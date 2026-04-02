"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KEYWORDS = [
  "créatif",
  "stratégique",
  "opérationnel",
  "marketing",
  "audiovisuelle",
  "durable",
];

const PASTEL_MAP: Record<string, string> = {
  créatif: "#F2B5D4",
  stratégique: "#C3B1E1",
  opérationnel: "#A8D8C8",
  marketing: "#FADADD",
  audiovisuelle: "#B5D8EB",
  durable: "#F5E6C8",
};

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
    "EE Studio est un studio créatif, stratégique et opérationnel basé à Kinshasa. Fondé par Lise-Laure, le studio accompagne les marques dans leur développement marketing, de la stratégie à la production de contenu audiovisuelle, avec une approche créative, opérationnel et durable.";

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
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-8"
        >
          À propos
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
              Lise-Laure ne se contente pas de conseiller — elle exécute. Avec
              une équipe intégrée et du matériel professionnel, EE Studio prend
              en charge chaque étape, de la réflexion stratégique à la livraison
              finale.
            </p>
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg font-body font-light text-[#F5F5F0]/60 leading-relaxed">
              Le studio combine une expertise marketing pointue avec une vision
              responsable, intégrant les enjeux ESG dans chaque projet pour un
              impact qui dure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
