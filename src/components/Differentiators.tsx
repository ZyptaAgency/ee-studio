"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DIFFERENTIATORS, PASTEL_COLORS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Differentiators() {
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    statsRef.current.filter(Boolean).forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
        >
          Pourquoi nous
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-20"
        >
          Ce qui nous distingue
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {DIFFERENTIATORS.map((item, i) => {
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];

            return (
              <div
                key={item.title}
                ref={(el) => {
                  if (el) statsRef.current[i] = el;
                }}
                className="text-center md:text-left"
              >
                <div
                  className="font-heading text-5xl md:text-6xl font-bold mb-4"
                  style={{ color: pastel }}
                >
                  {item.stat}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="font-body text-sm font-light text-[#F5F5F0]/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
