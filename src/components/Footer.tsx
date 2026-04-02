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
  { label: "Instagram", href: "#", letter: "Ig", color: "#E1306C" },
  { label: "LinkedIn", href: "#", letter: "Li", color: "#0A66C2" },
  { label: "X", href: "#", letter: "X", color: "#F5F5F0" },
];

export default function Footer() {
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#080808]">
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E130, #F2B5D430, #A8D8C830, transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
        {/* Logo centered */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={240}
            height={170}
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        {/* Description */}
        <p className="text-center text-sm text-[#777] font-light leading-[1.8] max-w-md mx-auto mb-12">
          Studio créatif, stratégique et opérationnel basé à Kinshasa.
          De la stratégie à l&apos;exécution.
        </p>

        {/* Navigation centered */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-[#888] hover:text-[#F5F5F0] transition-colors duration-300 font-light tracking-wide"
              onMouseEnter={() => handleHover(link.label)}
              onMouseLeave={() =>
                setHoverColors((prev) => ({ ...prev, [link.label]: "" }))
              }
              style={{ color: hoverColors[link.label] || undefined }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Socials centered */}
        <div className="flex items-center justify-center gap-5 mb-14">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-11 h-11 rounded-full border border-white/8 flex items-center justify-center transition-all duration-300 text-[11px] font-medium tracking-wider"
              style={{ color: `${s.color}60` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = s.color;
                e.currentTarget.style.borderColor = `${s.color}40`;
                e.currentTarget.style.boxShadow = `0 0 20px ${s.color}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${s.color}60`;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {s.letter}
            </a>
          ))}
        </div>

        {/* Separator */}
        <div
          className="h-[1px] max-w-xs mx-auto mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #C3B1E118, transparent)" }}
        />

        {/* Bottom */}
        <div className="text-center space-y-4">
          <p className="text-xs text-[#555] font-light tracking-wide">
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
