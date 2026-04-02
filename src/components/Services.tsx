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
import { PASTEL_COLORS, SERVICE_ICONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import FloatingShapes from "./FloatingShapes";
import type { Shape } from "./FloatingShapes";

const ICON_MAP: Record<string, LucideIcon> = {
  Video, Palette, Target, Leaf, Link, CalendarDays,
};

const servicesShapes: Shape[] = [
  { type: "triangle", size: 70, x: "3%", y: "25%", color: PASTEL_COLORS[1], delay: 0, duration: 20 },
  { type: "ring", size: 100, x: "92%", y: "60%", color: PASTEL_COLORS[4], delay: 2, duration: 24 },
  { type: "circle", size: 8, x: "50%", y: "5%", color: PASTEL_COLORS[3], delay: 1, duration: 15 },
  { type: "square", size: 25, x: "95%", y: "10%", color: PASTEL_COLORS[0], delay: 3, duration: 19, rotation: 30 },
];

export default function Services() {
  const { t } = useI18n();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-36 px-6 md:px-12">
      <FloatingShapes shapes={servicesShapes} opacity={0.06} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
          >
            {t.services.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl font-bold tracking-tight"
          >
            {t.services.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((service, i) => {
            const Icon = ICON_MAP[SERVICE_ICONS[i]];
            const isHovered = hoveredCard === i;
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative p-7 rounded-2xl border border-white/5 bg-[#111111] overflow-hidden transition-all duration-500 h-full"
                  style={{ borderColor: isHovered ? `${pastel}30` : undefined }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${pastel}06 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300"
                      style={{ backgroundColor: isHovered ? `${pastel}15` : "#1a1a1a" }}
                    >
                      {Icon && (
                        <Icon
                          size={20}
                          className="transition-colors duration-300"
                          style={{ color: isHovered ? pastel : "#F5F5F0" }}
                        />
                      )}
                    </div>

                    <h3 className="font-heading text-base md:text-lg font-semibold mb-2 tracking-wide">
                      <span className="relative">
                        {service.title}
                        <span
                          className="absolute -bottom-0.5 left-0 h-[2px] w-full transition-all duration-500 origin-left"
                          style={{
                            backgroundColor: pastel,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                          }}
                        />
                      </span>
                    </h3>

                    <p className="font-body text-[13px] font-light text-[#F5F5F0]/45 leading-relaxed">
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
