"use client";
import Image from "next/image";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", color: "#E1306C" },
  { label: "LinkedIn", href: "#", color: "#0A66C2" },
  { label: "X / Twitter", href: "#", color: "#F5F5F0" },
];

export default function Footer() {
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0A0A0A]">
      {/* Pastel gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E130, #F2B5D430, #A8D8C830, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top: centered logo + description */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={240}
              height={170}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <p className="text-sm text-[#777] font-light leading-relaxed max-w-md mx-auto">
            Studio créatif, stratégique et opérationnel basé à Kinshasa.
            De la stratégie à l&apos;exécution.
          </p>
        </div>

        {/* Middle: centered navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#888] hover:text-[#F5F5F0] transition-colors duration-300 font-light tracking-wide"
              onMouseEnter={() => handleHover(link.label)}
              onMouseLeave={() =>
                setHoverColors((prev) => ({ ...prev, [link.label]: "" }))
              }
              style={{
                color: hoverColors[link.label] || undefined,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Socials: centered icons */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-white/8 flex items-center justify-center transition-all duration-300 hover:border-white/20 text-xs font-medium tracking-wider"
              style={{ color: `${s.color}80` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = s.color;
                e.currentTarget.style.borderColor = `${s.color}40`;
                e.currentTarget.style.boxShadow = `0 0 15px ${s.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${s.color}80`;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {s.label[0]}
            </a>
          ))}
        </div>

        {/* Separator */}
        <div
          className="h-[1px] max-w-xs mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, #C3B1E120, transparent)" }}
        />

        {/* Bottom */}
        <div className="text-center space-y-3">
          <p className="text-xs text-[#555] font-light">
            © {new Date().getFullYear()} EE Studio SARL — Tous droits réservés
          </p>
          <a
            href="https://zypta.be"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-[#444] hover:text-[#888] transition-colors duration-300 tracking-wider"
          >
            Developed by{" "}
            <span className="font-ethnocentric">ZYP</span>
            <span className="font-supernova">TA</span>
            <span className="text-[#555]">.be</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
