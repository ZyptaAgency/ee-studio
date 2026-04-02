"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  BarChart3,
  Search,
  Globe,
  Megaphone,
  GraduationCap,
  Send,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { PASTEL_COLORS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import FloatingShapes from "./FloatingShapes";
import type { Shape } from "./FloatingShapes";

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  BarChart3,
  Search,
  Globe,
  Megaphone,
  GraduationCap,
};

const consultingShapes: Shape[] = [
  { type: "ring", size: 120, x: "92%", y: "15%", color: PASTEL_COLORS[1], delay: 0, duration: 22 },
  { type: "diamond", size: 45, x: "4%", y: "40%", color: PASTEL_COLORS[3], delay: 1.5, duration: 19 },
  { type: "cross", size: 30, x: "85%", y: "75%", color: PASTEL_COLORS[5], delay: 3, duration: 17 },
  { type: "circle", size: 8, x: "30%", y: "10%", color: PASTEL_COLORS[0], delay: 2, duration: 14 },
  { type: "triangle", size: 50, x: "8%", y: "80%", color: PASTEL_COLORS[4], delay: 0.5, duration: 21 },
];

export default function Consulting() {
  const { t } = useI18n();
  const c = t.consulting;

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formColor, setFormColor] = useState<string>(PASTEL_COLORS[1]);
  const [colorIdx, setColorIdx] = useState(0);

  const nextColor = () => {
    const color = PASTEL_COLORS[(colorIdx + 1) % PASTEL_COLORS.length];
    setColorIdx((i) => i + 1);
    setFormColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    "w-full bg-[#0A0A0A] border border-white/8 rounded-xl py-3 px-4 text-[#F5F5F0] font-body text-sm placeholder:text-[#F5F5F0]/20 focus:outline-none transition-all duration-300";

  return (
    <section id="consulting" className="relative py-24 md:py-36 px-6 md:px-12 bg-[#111111]">
      <FloatingShapes shapes={consultingShapes} opacity={0.05} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
          >
            {c.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-5"
          >
            {c.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm font-light text-[#F5F5F0]/45 max-w-2xl mx-auto leading-relaxed"
          >
            {c.subtitle}
          </motion.p>
        </div>

        {/* Sub-services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {c.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            const isHovered = hoveredCard === i;
            const pastel = PASTEL_COLORS[i % PASTEL_COLORS.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(service.title)}
              >
                <div
                  className="relative p-6 rounded-2xl border border-white/5 bg-[#0A0A0A] overflow-hidden transition-all duration-500 h-full"
                  style={{ borderColor: isHovered ? `${pastel}30` : undefined }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 20% 20%, ${pastel}06 0%, transparent 70%)` }}
                  />

                  {/* Corner shape */}
                  <svg
                    className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700"
                    width="80" height="80" viewBox="0 0 80 80"
                  >
                    <circle cx="40" cy="40" r="35" fill="none" stroke={pastel} strokeWidth="1" />
                  </svg>

                  <div className="relative z-10">
                    {/* Number badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{ backgroundColor: isHovered ? `${pastel}15` : "#151515" }}
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            className="transition-colors duration-300"
                            style={{ color: isHovered ? pastel : "#F5F5F0" }}
                          />
                        )}
                      </div>
                      <span
                        className="font-heading text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-300"
                        style={{ color: isHovered ? pastel : "#F5F5F0" + "30" }}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-heading text-[15px] font-semibold mb-2 tracking-wide text-[#F5F5F0]/90">
                      {service.title}
                    </h3>

                    <p className="font-body text-[12px] font-light text-[#F5F5F0]/40 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Request Info Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 md:p-10 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-sm">
            {/* Decorative top line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full"
              style={{ backgroundColor: `${PASTEL_COLORS[1]}40` }}
            />

            <div className="text-center mb-8">
              <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight mb-2">
                {c.form.title}
              </h3>
              <p className="font-body text-xs text-[#F5F5F0]/35 leading-relaxed">
                {c.form.subtitle}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-10"
                >
                  <CheckCircle size={36} className="text-[#A8D8C8]" />
                  <p className="font-body text-sm text-[#F5F5F0]/70 text-center">
                    {c.form.success}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      required
                      placeholder={c.form.name}
                      className={inputClass}
                      style={{ borderColor: focused === "name" ? `${formColor}40` : undefined }}
                      onFocus={() => { setFocused("name"); nextColor(); }}
                      onBlur={() => setFocused(null)}
                      aria-label={c.form.name}
                    />
                    <input
                      type="email"
                      required
                      placeholder={c.form.email}
                      className={inputClass}
                      style={{ borderColor: focused === "email" ? `${formColor}40` : undefined }}
                      onFocus={() => { setFocused("email"); nextColor(); }}
                      onBlur={() => setFocused(null)}
                      aria-label={c.form.email}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder={c.form.company}
                    className={inputClass}
                    style={{ borderColor: focused === "company" ? `${formColor}40` : undefined }}
                    onFocus={() => { setFocused("company"); nextColor(); }}
                    onBlur={() => setFocused(null)}
                    aria-label={c.form.company}
                  />

                  <div className="relative">
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ borderColor: focused === "service" ? `${formColor}40` : undefined }}
                      onFocus={() => { setFocused("service"); nextColor(); }}
                      onBlur={() => setFocused(null)}
                      aria-label={c.form.service}
                    >
                      <option value="" disabled className="bg-[#0A0A0A] text-[#F5F5F0]/40">
                        {c.form.servicePlaceholder}
                      </option>
                      {c.services.map((s, i) => (
                        <option key={i} value={s.title} className="bg-[#0A0A0A] text-[#F5F5F0]">
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F5F5F0]/30">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <textarea
                    placeholder={c.form.message}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    style={{ borderColor: focused === "message" ? `${formColor}40` : undefined }}
                    onFocus={() => { setFocused("message"); nextColor(); }}
                    onBlur={() => setFocused(null)}
                    aria-label={c.form.message}
                  />

                  <div className="text-center pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={nextColor}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-body text-xs tracking-[0.15em] uppercase text-[#F5F5F0] transition-all duration-300"
                      style={{
                        backgroundColor: `${formColor}18`,
                        border: `1px solid ${formColor}35`,
                      }}
                    >
                      {c.form.send}
                      <Send size={14} />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
