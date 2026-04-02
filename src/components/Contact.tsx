"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { PASTEL_COLORS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import FloatingShapes from "./FloatingShapes";
import type { Shape } from "./FloatingShapes";

const contactShapes: Shape[] = [
  { type: "ring", size: 100, x: "88%", y: "15%", color: PASTEL_COLORS[2], delay: 0, duration: 22 },
  { type: "cross", size: 30, x: "5%", y: "75%", color: PASTEL_COLORS[0], delay: 2, duration: 17 },
  { type: "circle", size: 8, x: "60%", y: "85%", color: PASTEL_COLORS[5], delay: 1, duration: 15 },
];

export default function Contact() {
  const { t } = useI18n();
  const [focused, setFocused] = useState<string | null>(null);
  const [hoverColor, setHoverColor] = useState<string>(PASTEL_COLORS[0]);
  const [colorIdx, setColorIdx] = useState(0);

  const nextColor = () => {
    const color = PASTEL_COLORS[(colorIdx + 1) % PASTEL_COLORS.length];
    setColorIdx((i) => i + 1);
    setHoverColor(color);
    return color;
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/10 py-3.5 px-0 text-[#F5F5F0] font-body text-sm placeholder:text-[#F5F5F0]/20 focus:outline-none transition-colors duration-300";

  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 md:px-12">
      <FloatingShapes shapes={contactShapes} opacity={0.06} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
          >
            {t.contact.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t.contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm font-light text-[#F5F5F0]/45 max-w-lg mx-auto"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder={t.contact.name}
              className={inputClass}
              style={{ borderColor: focused === "name" ? hoverColor : undefined }}
              onFocus={() => { setFocused("name"); nextColor(); }}
              onBlur={() => setFocused(null)}
              aria-label={t.contact.name}
            />
            <input
              type="email"
              placeholder={t.contact.email}
              className={inputClass}
              style={{ borderColor: focused === "email" ? hoverColor : undefined }}
              onFocus={() => { setFocused("email"); nextColor(); }}
              onBlur={() => setFocused(null)}
              aria-label={t.contact.email}
            />
            <textarea
              placeholder={t.contact.message}
              rows={4}
              className={`${inputClass} resize-none`}
              style={{ borderColor: focused === "message" ? hoverColor : undefined }}
              onFocus={() => { setFocused("message"); nextColor(); }}
              onBlur={() => setFocused(null)}
              aria-label={t.contact.message}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={nextColor}
              className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 font-body text-xs tracking-[0.15em] uppercase text-[#F5F5F0] hover:border-transparent transition-all duration-300"
              style={{
                backgroundColor: `${hoverColor}12`,
                borderColor: `${hoverColor}35`,
              }}
            >
              {t.contact.send}
              <Send size={14} />
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-2">
                Email
              </span>
              <a
                href="mailto:contact@ee-studio.info"
                className="flex items-center gap-2.5 font-body text-sm text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors group"
              >
                <Mail size={16} className="text-[#F5F5F0]/30 group-hover:text-[#C3B1E1] transition-colors" />
                contact@ee-studio.info
              </a>
            </div>
            <div>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-2">
                WhatsApp
              </span>
              <a
                href="https://wa.me/243XXXXXXXXX"
                className="flex items-center gap-2.5 font-body text-sm text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors group"
              >
                <Phone size={16} className="text-[#F5F5F0]/30 group-hover:text-[#A8D8C8] transition-colors" />
                +243 XXX XXX XXX
              </a>
            </div>
            <div>
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-2">
                {t.contact.location}
              </span>
              <p className="font-body text-sm text-[#F5F5F0]/70">
                {t.contact.locationValue}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
