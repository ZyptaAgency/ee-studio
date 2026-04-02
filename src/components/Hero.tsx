"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import FloatingShapes from "./FloatingShapes";
import { PASTEL_COLORS } from "@/lib/constants";
import type { Shape } from "./FloatingShapes";

const heroShapes: Shape[] = [
  { type: "ring", size: 200, x: "2%", y: "10%", color: PASTEL_COLORS[0], delay: 0, duration: 25 },
  { type: "circle", size: 10, x: "20%", y: "75%", color: PASTEL_COLORS[1], delay: 1, duration: 16 },
  { type: "triangle", size: 80, x: "88%", y: "15%", color: PASTEL_COLORS[2], delay: 2, duration: 22 },
  { type: "diamond", size: 50, x: "92%", y: "70%", color: PASTEL_COLORS[3], delay: 0.5, duration: 19 },
  { type: "cross", size: 40, x: "8%", y: "55%", color: PASTEL_COLORS[4], delay: 3, duration: 21 },
  { type: "square", size: 30, x: "78%", y: "45%", color: PASTEL_COLORS[5], delay: 1.5, duration: 24, rotation: 20 },
  { type: "circle", size: 6, x: "45%", y: "90%", color: PASTEL_COLORS[0], delay: 4, duration: 13 },
  { type: "ring", size: 70, x: "65%", y: "8%", color: PASTEL_COLORS[4], delay: 2.5, duration: 18 },
];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  const title = "EE STUDIO";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#111111]" />

      <FloatingShapes shapes={heroShapes} opacity={0.08} />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12"
        >
          <Image
            src="/logo.png"
            alt="EE Studio Logo"
            width={180}
            height={180}
            className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain"
            priority
          />
        </motion.div>

        <h1
          ref={titleRef}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.15em] leading-none"
          style={{ perspective: "1000px" }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          className="mt-6 md:mt-8 text-lg md:text-2xl font-body font-light tracking-[0.3em] text-[#F5F5F0]/60"
        >
          Strategy. Creation. Impact.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="inline-block mt-16 md:mt-24 text-sm font-body tracking-[0.2em] text-[#F5F5F0]/40 hover:text-[#F5F5F0] transition-all duration-300 group"
        >
          <span className="relative">
            Discover
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#C3B1E1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#F5F5F0]/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
