"use client";
import Image from "next/image";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "#", icon: InstagramIcon, color: "#E1306C" },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon, color: "#0A66C2" },
  { label: "X / Twitter", href: "#", icon: TwitterXIcon, color: "#FFFFFF" },
];

export default function Footer() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const NAV_LINKS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#080808]">
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #C3B1E130, #F2B5D430, #A8D8C830, transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 py-14 md:py-16">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={200}
            height={141}
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>

        <p className="text-center text-xs text-[#666] font-light leading-[1.8] max-w-sm mx-auto mb-8">
          {t.footer.desc}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-[#777] hover:text-[#F5F5F0] transition-colors duration-300 font-light tracking-wide"
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

        <div className="flex items-center justify-center gap-4 mb-10">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  color: `${s.color}50`,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = s.color;
                  e.currentTarget.style.borderColor = `${s.color}35`;
                  e.currentTarget.style.boxShadow = `0 0 18px ${s.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${s.color}50`;
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>

        <div
          className="h-[1px] max-w-[200px] mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, transparent, #C3B1E115, transparent)" }}
        />

        <div className="text-center space-y-3">
          <p className="text-[11px] text-[#555] font-light tracking-wide">
            © {new Date().getFullYear()} EE Studio SARL — {t.footer.rights} —{" "}
            <a
              href="/confidentialite"
              className="text-[#555] hover:text-[#999] transition-colors duration-300 underline"
            >
              {t.footer.privacy}
            </a>
          </p>
          <a
            href="https://zypta.be"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] hover:opacity-80 transition-opacity duration-300 tracking-wider"
          >
            <span className="text-[#555]">{lang === "fr" ? "Développé par " : "Developed by "}</span>
            <span className="zypta-brand">Zypta</span>
            <span className="text-[#555]">.be</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
