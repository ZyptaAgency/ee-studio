"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});
  const { lang, setLang, t } = useI18n();

  const NAV_LINKS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.booking, href: "#booking" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4">
        <div
          className={`max-w-5xl mx-auto flex items-center justify-between rounded-full border px-5 md:px-8 transition-all duration-500 ${
            scrolled
              ? "py-2.5 bg-[#0A0A0A]/80 backdrop-blur-2xl border-white/[0.08] shadow-lg shadow-black/30"
              : "py-3 bg-[#0A0A0A]/50 backdrop-blur-xl border-white/[0.06]"
          }`}
        >
          {/* Logo left */}
          <a href="#" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-8 md:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop links + lang switcher */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[12.5px] font-light tracking-[0.06em] text-[#999] hover:text-[#F5F5F0] transition-colors duration-300"
                onMouseEnter={() => handleHover(link.href)}
                onMouseLeave={() =>
                  setHoverColors((prev) => ({ ...prev, [link.href]: "transparent" }))
                }
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: hoverColors[link.href] || "transparent",
                    width: hoverColors[link.href] && hoverColors[link.href] !== "transparent" ? "100%" : "0%",
                  }}
                />
              </a>
            ))}

            {/* Language switcher */}
            <div className="flex items-center rounded-full border border-white/[0.08] overflow-hidden ml-2">
              <button
                onClick={() => setLang("fr")}
                className="px-2.5 py-1 text-[11px] tracking-wider font-medium transition-all duration-300"
                style={{
                  color: lang === "fr" ? "#0A0A0A" : "#666",
                  backgroundColor: lang === "fr" ? "#C3B1E1" : "transparent",
                }}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className="px-2.5 py-1 text-[11px] tracking-wider font-medium transition-all duration-300"
                style={{
                  color: lang === "en" ? "#0A0A0A" : "#666",
                  backgroundColor: lang === "en" ? "#C3B1E1" : "transparent",
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile: lang + burger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/[0.08] overflow-hidden">
              <button
                onClick={() => setLang("fr")}
                className="px-2 py-0.5 text-[10px] tracking-wider font-medium transition-all duration-300"
                style={{
                  color: lang === "fr" ? "#0A0A0A" : "#666",
                  backgroundColor: lang === "fr" ? "#C3B1E1" : "transparent",
                }}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className="px-2 py-0.5 text-[10px] tracking-wider font-medium transition-all duration-300"
                style={{
                  color: lang === "en" ? "#0A0A0A" : "#666",
                  backgroundColor: lang === "en" ? "#C3B1E1" : "transparent",
                }}
              >
                EN
              </button>
            </div>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#F5F5F0] transition-colors duration-300 hover:border-white/20"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-16 w-auto object-contain mb-6"
            />
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="text-2xl font-['Outfit'] font-light tracking-wide transition-colors duration-300"
                onClick={() => setOpen(false)}
                onMouseEnter={() => handleHover(link.href)}
                onMouseLeave={() =>
                  setHoverColors((prev) => ({ ...prev, [link.href]: "#F5F5F0" }))
                }
                style={{ color: hoverColors[link.href] || "#F5F5F0" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
