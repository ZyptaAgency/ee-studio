"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import FloatingShapes from "./FloatingShapes";

export default function Services() {
  const { next } = usePastelRotation();
  const [activeColors, setActiveColors] = useState<Record<number, string>>({});

  const handleHover = (i: number) => {
    setActiveColors((prev) => ({ ...prev, [i]: next() }));
  };

  const handleLeave = (i: number) => {
    setActiveColors((prev) => {
      const copy = { ...prev };
      delete copy[i];
      return copy;
    });
  };

  return (
    <section id="services" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={8} seed={3} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#A8D8C8] mb-5"
          >
            Nos expertises
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            Services
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const color = activeColors[i];
            return (
              <motion.a
                key={i}
                href={`/${service.slug}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleLeave(i)}
                className="group relative p-8 md:p-10 rounded-2xl border border-white/5 bg-[#111] hover:bg-[#161616] transition-all duration-500 cursor-pointer block overflow-hidden"
                style={{
                  borderColor: color ? `${color}30` : "rgba(255,255,255,0.05)",
                  transform: color ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: color ? `radial-gradient(circle at 30% 30%, ${color}08 0%, transparent 70%)` : "none" }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-7">
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: color ? `${color}15` : "#1a1a1a", width: 52, height: 52 }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className="transition-colors duration-300"
                        style={{ color: color || "#888" }}
                      />
                    </div>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2"
                      style={{ color: color || "#666" }}
                    />
                  </div>
                  <h3
                    className="text-lg font-['Outfit'] mb-3 transition-colors duration-300"
                    style={{ color: color || "#F5F5F0", fontWeight: 600 }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-[#888] font-light">
                    {service.shortDesc}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
