"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const { next } = usePastelRotation();
  const [ctaColor, setCtaColor] = useState("#999");

  const titleLetters = "EE STUDIO".split("");
  const subtitle = "Stratégie. Création. Impact.";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 md:mb-10"
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

      {/* Big title */}
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
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Outfit'] tracking-tight"
            style={{ fontWeight: 900 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-lg md:text-xl text-[#999] font-light tracking-[0.2em] mb-16"
      >
        {subtitle}
      </motion.p>

      {/* CTA */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="group relative text-sm tracking-[0.15em] uppercase font-light transition-colors duration-300 pb-1"
        style={{ color: ctaColor }}
        onMouseEnter={() => setCtaColor(next())}
        onMouseLeave={() => setCtaColor("#999")}
      >
        Découvrir
        <span
          className="block h-[1px] mt-2 transition-all duration-500 group-hover:w-full w-0"
          style={{ backgroundColor: ctaColor }}
        />
      </motion.a>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-white/20"
        />
      </motion.div>
    </section>
  );
}
