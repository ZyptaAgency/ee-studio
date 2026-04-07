"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { getServiceBySlug } from "@/lib/services";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface ServiceDetail {
  title: string;
  desc: string;
}

interface ServicePageProps {
  slug: string;
  icon: LucideIcon;
  title: string;
  heroLine: string;
  fullDesc: string;
  details: ServiceDetail[];
}

export default function ServicePage({
  slug,
  icon: Icon,
  title: defaultTitle,
  heroLine: defaultHeroLine,
  fullDesc: defaultFullDesc,
  details: defaultDetails,
}: ServicePageProps) {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [accentColor, setAccentColor] = useState("#666");
  const [cardColors, setCardColors] = useState<Record<number, string>>({});
  const [backColor, setBackColor] = useState("#666");

  const localized = getServiceBySlug(slug, lang);
  const title = localized?.title || defaultTitle;
  const heroLine = localized?.heroLine || defaultHeroLine;
  const fullDesc = localized?.fullDesc || defaultFullDesc;
  const details = localized?.details || defaultDetails;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-5 backdrop-blur-xl bg-[#0A0A0A]/90 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm tracking-wide transition-colors duration-300"
            style={{ color: backColor }}
            onMouseEnter={() => setBackColor(next())}
            onMouseLeave={() => setBackColor("#666")}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            {t.servicePage.back}
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>
      </nav>

      <main className="pt-32">
        <section className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Icon
              size={36}
              strokeWidth={1.5}
              className="transition-colors duration-300"
              style={{ color: accentColor }}
              onMouseEnter={() => setAccentColor(next())}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-['Outfit'] leading-tight mb-6"
            style={{ fontWeight: 800 }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-light tracking-wide mb-12"
            style={{ color: accentColor }}
            onMouseEnter={() => setAccentColor(next())}
          >
            {heroLine}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-[1px] bg-white/10 origin-left mb-16"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed text-[#BBB] font-light max-w-3xl"
          >
            {fullDesc}
          </motion.p>
        </section>

        <section className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto pb-32 md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase text-[#666] mb-16"
          >
            {t.servicePage.whatWeDo}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {details.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setCardColors((p) => ({ ...p, [i]: next() }))}
                onMouseLeave={() =>
                  setCardColors((p) => {
                    const c = { ...p };
                    delete c[i];
                    return c;
                  })
                }
                className="p-8 md:p-10 rounded-2xl border border-white/5 bg-[#111] transition-all duration-500"
                style={{
                  borderColor: cardColors[i] ? `${cardColors[i]}30` : "rgba(255,255,255,0.05)",
                  transform: cardColors[i] ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <span
                  className="text-xs font-['Outfit'] tracking-wider mb-4 block transition-colors duration-300"
                  style={{ color: cardColors[i] || "#444", fontWeight: 600 }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-lg font-['Outfit'] mb-3 transition-colors duration-300"
                  style={{ color: cardColors[i] || "#F5F5F0", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#888] font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-28 px-8 md:px-16 lg:px-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-['Outfit'] mb-8"
            style={{ fontWeight: 700 }}
          >
            {t.servicePage.projectInMind}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/#contact"
              className="inline-block px-8 py-3 rounded-full text-sm tracking-[0.1em] uppercase font-light border border-[#333] text-[#999] hover:text-[#F5F5F0] transition-all duration-400"
              onMouseEnter={(e) => {
                const c = next();
                e.currentTarget.style.borderColor = c;
                e.currentTarget.style.color = c;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.color = "#999";
              }}
            >
              {t.servicePage.contactUs}
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 px-8 md:px-16 text-center space-y-2">
        <p className="text-[11px] text-[#555] font-light">
          © {new Date().getFullYear()} EE Studio SARL - {t.footer.rights}
        </p>
        <a
          href="https://zypta.be"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] hover:opacity-80 transition-opacity duration-300 tracking-wider inline-block"
        >
          <span className="text-[#555]">{lang === "fr" ? "Développé par " : "Developed by "}</span>
          <span className="zypta-brand">Zypta</span>
          <span className="text-[#555]">.be</span>
        </a>
      </footer>
    </>
  );
}
