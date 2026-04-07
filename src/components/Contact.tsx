"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { getServices } from "@/lib/services";
import { useState, useRef } from "react";
import { Mail, MessageCircle, MapPin, Paperclip, X } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

export default function Contact() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const services = getServices(lang);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [btnColor, setBtnColor] = useState("#333");
  const [focusColors, setFocusColors] = useState<Record<string, string>>({});
  const [selectedService, setSelectedService] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFocus = (field: string) => {
    setFocusColors((p) => ({ ...p, [field]: next() }));
  };

  const handleBlur = (field: string) => {
    setFocusColors((p) => {
      const c = { ...p };
      delete c[field];
      return c;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const inputStyle = (field: string) => ({
    borderBottomColor: focusColors[field] || "rgba(255,255,255,0.08)",
    borderBottomWidth: "1.5px" as const,
    boxShadow: focusColors[field] ? `0 4px 15px ${focusColors[field]}10` : "none",
  });

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
          <motion.form
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
                style={inputStyle(field.name)}
              />
            ))}

            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                onFocus={() => handleFocus("service")}
                onBlur={() => handleBlur("service")}
                className="w-full bg-transparent border-b py-5 text-base font-light outline-none transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  ...inputStyle("service"),
                  color: selectedService ? "#F5F5F0" : "#555",
                }}
              >
                <option value="" disabled className="bg-[#111] text-[#555]">
                  {t.contact.service_placeholder}
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title} className="bg-[#111] text-[#F5F5F0]">
                    {s.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </div>
            </div>

            <textarea
              placeholder={t.contact.message}
              rows={5}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              className="w-full bg-transparent border-b py-5 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none resize-none transition-all duration-300 focus:placeholder-[#888]"
              style={inputStyle("message")}
            />

            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => handleFocus("file")}
                onMouseLeave={() => handleBlur("file")}
                className="flex items-center gap-3 text-sm font-light transition-all duration-300 group"
                style={{ color: focusColors["file"] || "#666" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                  style={{
                    borderColor: focusColors["file"] || "rgba(255,255,255,0.08)",
                    backgroundColor: focusColors["file"] ? `${focusColors["file"]}10` : "transparent",
                  }}
                >
                  <Paperclip size={16} strokeWidth={1.5} />
                </div>
                {t.contact.attachment_label}
              </button>

              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <div
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span className="text-xs text-[#999] font-light truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-[#555] hover:text-[#F5F5F0] transition-colors duration-300 ml-3"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <p className="text-[11px] text-[#555] font-light">
                    {files.length} {t.contact.file_selected}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
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
          </motion.form>

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
