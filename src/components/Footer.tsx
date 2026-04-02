"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={160}
            height={113}
            className="h-12 w-auto object-contain"
          />
          <p className="text-xs text-[#555] font-light">
            Studio créatif, stratégique et opérationnel.
          </p>
        </div>

        <div className="flex items-center gap-8">
          {["À propos", "Services", "Portfolio", "Contact"].map((label, i) => (
            <a
              key={i}
              href={`#${["about", "services", "portfolio", "contact"][i]}`}
              className="text-xs text-[#555] hover:text-[#999] transition-colors duration-300 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-[#444] font-light">
            © {new Date().getFullYear()} EE Studio SARL — Tous droits réservés
          </p>
          <a
            href="https://zypta.be"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#333] hover:text-[#555] transition-colors duration-300 tracking-wider"
          >
            Crafted by{" "}
            <span className="font-ethnocentric">ZYP</span>
            <span className="font-supernova">TA</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
