"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/services";
import Link from "next/link";
import FloatingShapes from "./FloatingShapes";

const PASTEL_ACCENTS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#B5D8EB", "#FADADD", "#F5E6C8"];

export default function Services() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [activeColors, setActiveColors] = useState<Record<number, string>>({});
  const services = getServices(lang);

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
      <FloatingShapes count={12} seed={3} />

      <div className="absolute top-20 left-1/4 w-[350px] h-[350px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#A8D8C8" }} />
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#F2B5D4" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#A8D8C8] mb-5"
          >
            {t.services.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            {lang === "fr" ? "Nos " : "Our "}<span className="text-[#A8D8C8]">{t.services.title}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, i) => {
            const Icon = service.icon;
            const color = activeColors[i];
            const defaultAccent = PASTEL_ACCENTS[i % PASTEL_ACCENTS.length];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleLeave(i)}
                className="group relative rounded-2xl border border-white/5 bg-[#111] hover:bg-[#161616] transition-all duration-500 cursor-pointer overflow-hidden"
                style={{
                  borderColor: color ? `${color}30` : "rgba(255,255,255,0.05)",
                  transform: color ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
              <Link href={`/${service.slug}`} className="block p-8 md:p-10">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: color ? `radial-gradient(circle at 30% 30%, ${color}10 0%, transparent 70%)` : "none" }}
                />

                <div
                  className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${color || defaultAccent}15 0%, transparent 100%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-7">
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: color ? `${color}18` : `${defaultAccent}10`, width: 52, height: 52 }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className="transition-colors duration-300"
                        style={{ color: color || `${defaultAccent}90` }}
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

                  <motion.div
                    className="h-[1.5px] rounded-full mt-6 origin-left"
                    style={{ backgroundColor: color || `${defaultAccent}25`, width: color ? "100%" : "30%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
