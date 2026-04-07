"use client";
import Image from "next/image";
import Link from "next/link";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState, type ReactNode } from "react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="url(#ig-grad)" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
    </svg>
  );
}

/** Same colour stops as the Instagram SVG radial (logo-style ring) */
const INSTAGRAM_RING_GRADIENT =
  "conic-gradient(from 200deg at 50% 55%, #fdf497 0deg, #fd5949 72deg, #d6249f 144deg, #285AEB 216deg, #fdf497 360deg)";

interface SocialItem {
  label: string;
  href: string;
  icon: (props: { size?: number }) => ReactNode;
  color: string;
  gradientRing?: boolean;
  /** "r, g, b" for layered luminous glow (LinkedIn, YouTube) */
  glowRgb?: string;
}

const SOCIALS: SocialItem[] = [
  { label: "Instagram", href: "#", icon: InstagramIcon, color: "#E1306C", gradientRing: true },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon, color: "#0A66C2", glowRgb: "10, 102, 194" },
  { label: "YouTube", href: "#", icon: YouTubeIcon, color: "#FF0000", glowRgb: "255, 0, 0" },
];

function luminousShadow(rgb: string, hover: boolean) {
  if (hover) {
    return [
      `0 0 12px rgba(${rgb}, 0.65)`,
      `0 0 24px rgba(${rgb}, 0.45)`,
      `0 0 40px rgba(${rgb}, 0.28)`,
      `0 0 56px rgba(${rgb}, 0.12)`,
    ].join(", ");
  }
  return [
    `0 0 8px rgba(${rgb}, 0.5)`,
    `0 0 18px rgba(${rgb}, 0.32)`,
    `0 0 32px rgba(${rgb}, 0.18)`,
    `0 0 48px rgba(${rgb}, 0.08)`,
  ].join(", ");
}

export default function Footer() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const NAV_LINKS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.booking, href: "#booking" },
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

        <div className="flex items-center justify-center gap-5 mb-10">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            if (s.gradientRing) {
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="rounded-full p-[2px] flex items-center justify-center transition-all duration-300"
                  style={{
                    background: INSTAGRAM_RING_GRADIENT,
                    boxShadow:
                      "0 0 14px rgba(253, 89, 73, 0.28), 0 0 22px rgba(214, 36, 159, 0.2), 0 0 28px rgba(40, 90, 235, 0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 22px rgba(253, 89, 73, 0.45), 0 0 32px rgba(214, 36, 159, 0.35), 0 0 40px rgba(40, 90, 235, 0.25)";
                    e.currentTarget.style.transform = "scale(1.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 14px rgba(253, 89, 73, 0.28), 0 0 22px rgba(214, 36, 159, 0.2), 0 0 28px rgba(40, 90, 235, 0.12)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span className="w-10 h-10 rounded-full bg-[#080808] flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                </a>
              );
            }
            const rgb = s.glowRgb ?? "128, 128, 128";
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: s.color,
                  boxShadow: luminousShadow(rgb, false),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = luminousShadow(rgb, true);
                  e.currentTarget.style.transform = "scale(1.15)";
                  e.currentTarget.style.backgroundColor = `${s.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = luminousShadow(rgb, false);
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon size={18} />
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
            © {new Date().getFullYear()} EE Studio SARL - {t.footer.rights} -{" "}
            <Link
              href="/confidentialite"
              className="text-[#555] hover:text-[#999] transition-colors duration-300 underline"
            >
              {t.footer.privacy}
            </Link>
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
