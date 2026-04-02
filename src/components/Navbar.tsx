"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import Image from "next/image";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-14 md:h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-light tracking-[0.08em] text-[#999] hover:text-[#F5F5F0] transition-colors duration-300"
                onMouseEnter={() => handleHover(link.href)}
                onMouseLeave={() =>
                  setHoverColors((prev) => ({ ...prev, [link.href]: "transparent" }))
                }
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 hover:w-full transition-all duration-300 rounded-full"
                  style={{ backgroundColor: hoverColors[link.href] || "transparent", width: hoverColors[link.href] && hoverColors[link.href] !== "transparent" ? "100%" : "0%" }}
                />
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#F5F5F0] transition-colors duration-300 hover:border-white/20"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
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
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-16 w-auto object-contain mb-8"
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
