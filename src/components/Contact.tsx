"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const { next } = usePastelRotation();
  const [btnColor, setBtnColor] = useState("#333");
  const [focusColors, setFocusColors] = useState<Record<string, string>>({});

  const handleFocus = (field: string) => {
    setFocusColors((p) => ({ ...p, [field]: next() }));
  };

  const handleBlur = (field: string) => {
    setFocusColors((p) => { const c = { ...p }; delete c[field]; return c; });
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.2em] uppercase text-[#666] mb-4"
      >
        Contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] mb-20"
        style={{ fontWeight: 700 }}
      >
        Travaillons ensemble
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          {[
            { name: "name", placeholder: "Votre nom", type: "text" },
            { name: "email", placeholder: "Votre email", type: "email" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onFocus={() => handleFocus(field.name)}
              onBlur={() => handleBlur(field.name)}
              className="w-full bg-transparent border-b border-white/10 py-4 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none transition-colors duration-300 focus:placeholder-[#888]"
              style={{
                borderBottomColor: focusColors[field.name] || "rgba(255,255,255,0.1)",
              }}
            />
          ))}
          <textarea
            placeholder="Votre message"
            rows={4}
            onFocus={() => handleFocus("message")}
            onBlur={() => handleBlur("message")}
            className="w-full bg-transparent border-b border-white/10 py-4 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none resize-none transition-colors duration-300 focus:placeholder-[#888]"
            style={{
              borderBottomColor: focusColors["message"] || "rgba(255,255,255,0.1)",
            }}
          />
          <button
            onMouseEnter={() => setBtnColor(next())}
            onMouseLeave={() => setBtnColor("#333")}
            className="mt-4 px-8 py-3 rounded-full text-sm tracking-[0.1em] uppercase font-light border transition-all duration-400"
            style={{
              borderColor: btnColor,
              color: btnColor === "#333" ? "#999" : btnColor,
            }}
          >
            Envoyer
          </button>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-8"
        >
          {[
            {
              icon: Mail,
              label: "Email",
              value: "contact@ee-studio.info",
              href: "mailto:contact@ee-studio.info",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+243 XXX XXX XXX",
              href: "https://wa.me/243XXXXXXXXX",
            },
            {
              icon: MapPin,
              label: "Localisation",
              value: "Kinshasa, RDC",
              href: null,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <Icon size={20} strokeWidth={1.5} className="text-[#555] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#555] mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base font-light text-[#BBB] hover:text-[#F5F5F0] transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-light text-[#BBB]">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
