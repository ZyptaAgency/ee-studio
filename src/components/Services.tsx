"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Palette,
  Target,
  Leaf,
  Link,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, PASTEL_COLORS } from "@/lib/constants";
import FloatingShapes from "./FloatingShapes";
import type { Shape } from "./FloatingShapes";

const ICON_MAP: Record<string, LucideIcon> = {
  Video,
  Palette,
  Target,
  Leaf,
  Link,
  CalendarDays,
};

const servicesShapes: Shape[] = [
  { type: "triangle", size: 70, x: "3%", y: "25%", color: PASTEL_COLORS[1], delay: 0, duration: 20 },
  { type: "ring", size: 100, x: "92%", y: "60%", color: PASTEL_COLORS[4], delay: 2, duration: 24 },
  { type: "circle", size: 8, x: "50%", y: "5%", color: PASTEL_COLORS[3], delay: 1, duration: 15 },
  { type: "square", size: 25, x: "95%", y: "10%", color: PASTEL_COLORS[0], delay: 3, duration: 19, rotation: 30 },
];

export default function Services() {
  const [colorIndex, setColorIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getNextColor = () => {
    const color = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];
    setColorIndex((i) => i + 1);
    return color;
  };

  return (
    <section id="services" className="relative py-32 md:py-48 px-6 md:px-12">
      <FloatingShapes shapes={servicesShapes} opacity={0.06} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
        >
          Our expertise
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-20"
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            const isHovered = hoveredCard === i;
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];

            const gridClass = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-5",
              "md:col-span-7",
              "md:col-span-6",
              "md:col-span-6",
            ][i];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${gridClass} relative group cursor-pointer`}
                onMouseEnter={() => {
                  setHoveredCard(i);
                  getNextColor();
                }}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative p-8 md:p-10 rounded-2xl border border-white/5 bg-[#111111] overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: isHovered ? `${pastel}40` : undefined,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${pastel}08 0%, transparent 70%)`,
                    }}
                  />

                  {/* Decorative shape in corner */}
                  <motion.svg
                    className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                  >
                    <circle cx="60" cy="60" r="55" fill="none" stroke={pastel} strokeWidth="1.5" />
                    <circle cx="60" cy="60" r="35" fill="none" stroke={pastel} strokeWidth="1" />
                  </motion.svg>

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered ? `${pastel}20` : "#1a1a1a",
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={24}
                          className="transition-colors duration-300"
                          style={{ color: isHovered ? pastel : "#F5F5F0" }}
                        />
                      )}
                    </div>

                    <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3 tracking-wide">
                      <span className="relative">
                        {service.title}
                        <span
                          className="absolute -bottom-1 left-0 h-[3px] w-full transition-all duration-500 origin-left"
                          style={{
                            backgroundColor: pastel,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                      </span>
                    </h3>

                    <p className="font-body text-sm md:text-base font-light text-[#F5F5F0]/50 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
