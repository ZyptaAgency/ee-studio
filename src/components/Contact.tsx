"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { PASTEL_COLORS } from "@/lib/constants";

export default function Contact() {
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
    "w-full bg-transparent border-b border-white/10 py-4 px-0 text-[#F5F5F0] font-body text-base placeholder:text-[#F5F5F0]/20 focus:outline-none transition-colors duration-300";

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-body tracking-[0.3em] uppercase text-[#F5F5F0]/40 block mb-4"
        >
          Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
        >
          Travaillons ensemble
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-lg font-light text-[#F5F5F0]/50 mb-16 max-w-2xl"
        >
          Une idée, un projet, une collaboration ? Parlons-en.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                className={inputClass}
                style={{
                  borderColor:
                    focused === "name" ? hoverColor : undefined,
                }}
                onFocus={() => {
                  setFocused("name");
                  nextColor();
                }}
                onBlur={() => setFocused(null)}
                aria-label="Votre nom"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Votre email"
                className={inputClass}
                style={{
                  borderColor:
                    focused === "email" ? hoverColor : undefined,
                }}
                onFocus={() => {
                  setFocused("email");
                  nextColor();
                }}
                onBlur={() => setFocused(null)}
                aria-label="Votre email"
              />
            </div>
            <div>
              <textarea
                placeholder="Votre message"
                rows={4}
                className={`${inputClass} resize-none`}
                style={{
                  borderColor:
                    focused === "message" ? hoverColor : undefined,
                }}
                onFocus={() => {
                  setFocused("message");
                  nextColor();
                }}
                onBlur={() => setFocused(null)}
                aria-label="Votre message"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={nextColor}
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 font-body text-sm tracking-[0.15em] uppercase text-[#F5F5F0] hover:border-transparent transition-all duration-300"
              style={{
                backgroundColor: `${hoverColor}15`,
                borderColor: `${hoverColor}40`,
              }}
            >
              Envoyer
              <Send size={16} />
            </motion.button>
          </motion.form>

          {/* Coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-10"
          >
            <div>
              <span className="text-xs font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-3">
                Email
              </span>
              <a
                href="mailto:contact@ee-studio.info"
                className="flex items-center gap-3 font-body text-lg text-[#F5F5F0]/80 hover:text-[#F5F5F0] transition-colors group"
              >
                <Mail size={18} className="text-[#F5F5F0]/40 group-hover:text-[#C3B1E1] transition-colors" />
                contact@ee-studio.info
              </a>
            </div>

            <div>
              <span className="text-xs font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-3">
                WhatsApp
              </span>
              <a
                href="https://wa.me/243XXXXXXXXX"
                className="flex items-center gap-3 font-body text-lg text-[#F5F5F0]/80 hover:text-[#F5F5F0] transition-colors group"
              >
                <Phone size={18} className="text-[#F5F5F0]/40 group-hover:text-[#A8D8C8] transition-colors" />
                +243 XXX XXX XXX
              </a>
            </div>

            <div>
              <span className="text-xs font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-3">
                Localisation
              </span>
              <p className="font-body text-lg text-[#F5F5F0]/80">
                Kinshasa, République Démocratique du Congo
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
