"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

export default function Contact() {
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [btnColor, setBtnColor] = useState("#333");
  const [focusColors, setFocusColors] = useState<Record<string, string>>({});

  const handleFocus = (field: string) => {
    setFocusColors((p) => ({ ...p, [field]: next() }));
  };

  const handleBlur = (field: string) => {
    setFocusColors((p) => { const c = { ...p }; delete c[field]; return c; });
  };

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={10} seed={6} />

      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#F5E6C8" }} />
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#C3B1E1" }} />

      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#F5E6C8] mb-5"
          >
            {t.contact.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            {t.contact.title_prefix}<span className="text-[#F5E6C8]">{t.contact.title_highlight}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-7"
          >
            {[
              { name: "name", placeholder: t.contact.name, type: "text" },
              { name: "email", placeholder: t.contact.email, type: "email" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                onFocus={() => handleFocus(field.name)}
                onBlur={() => handleBlur(field.name)}
                className="w-full bg-transparent border-b py-5 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none transition-all duration-300 focus:placeholder-[#888]"
                style={{
                  borderBottomColor: focusColors[field.name] || "rgba(255,255,255,0.08)",
                  borderBottomWidth: "1.5px",
                  boxShadow: focusColors[field.name] ? `0 4px 15px ${focusColors[field.name]}10` : "none",
                }}
              />
            ))}
            <textarea
              placeholder={t.contact.message}
              rows={5}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              className="w-full bg-transparent border-b py-5 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none resize-none transition-all duration-300 focus:placeholder-[#888]"
              style={{
                borderBottomColor: focusColors["message"] || "rgba(255,255,255,0.08)",
                borderBottomWidth: "1.5px",
                boxShadow: focusColors["message"] ? `0 4px 15px ${focusColors["message"]}10` : "none",
              }}
            />
            <div className="pt-4">
              <button
                onMouseEnter={() => setBtnColor(next())}
                onMouseLeave={() => setBtnColor("#333")}
                className="px-12 py-4 rounded-full text-sm tracking-[0.12em] uppercase font-light border transition-all duration-300"
                style={{
                  borderColor: btnColor === "#333" ? "rgba(255,255,255,0.1)" : btnColor,
                  color: btnColor === "#333" ? "#BBB" : btnColor,
                  boxShadow: btnColor !== "#333" ? `0 0 30px ${btnColor}18` : "none",
                }}
              >
                {t.contact.send}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-10 flex flex-col justify-center"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "contact@ee-studio.info",
                href: "mailto:contact@ee-studio.info",
                accent: "#C3B1E1",
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "+243 XXX XXX XXX",
                href: "https://wa.me/243XXXXXXXXX",
                accent: "#A8D8C8",
              },
              {
                icon: MapPin,
                label: t.contact.location_label,
                value: "Kinshasa, RDC",
                href: null,
                accent: "#F2B5D4",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-6 group"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${item.accent}12`,
                      boxShadow: `0 0 0px ${item.accent}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${item.accent}18`;
                      e.currentTarget.style.backgroundColor = `${item.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0px ${item.accent}00`;
                      e.currentTarget.style.backgroundColor = `${item.accent}12`;
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: item.accent }} />
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: `${item.accent}80` }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-light text-[#CCC] hover:text-[#F5F5F0] transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-light text-[#CCC]">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
