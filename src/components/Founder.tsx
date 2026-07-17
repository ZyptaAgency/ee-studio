"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import Image from "next/image";
import FloatingShapes from "./FloatingShapes";

export default function Founder() {
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [ctaColor, setCtaColor] = useState("#999");

  return (
    <section id="founder" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={8} seed={9} />

      <div className="absolute top-1/4 left-0 w-[360px] h-[360px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#F2B5D4" }} />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#C3B1E1" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, #F2B5D430, #C3B1E130, #A8D8C830)" }}
            />
            <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10">
              <Image
                src="/founder.png"
                alt="Lise-Laure Zuzi"
                width={682}
                height={1024}
                quality={95}
                sizes="(max-width: 768px) 90vw, 384px"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.5), transparent 45%)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-lg font-['Outfit'] font-semibold text-[#F5F5F0]">{t.founder.name}</p>
                <p className="text-xs tracking-[0.15em] uppercase text-[#C3B1E1] mt-1">{t.founder.role}</p>
              </div>
            </div>

            <motion.div
              className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl border pointer-events-none"
              style={{ borderColor: "#F2B5D440" }}
              animate={{ rotate: [0, 90, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-sm tracking-[0.25em] uppercase text-[#F2B5D4] mb-6">
              {t.founder.label}
            </p>

            <blockquote className="relative mb-8">
              <span
                className="absolute -left-2 -top-6 text-6xl font-['Outfit'] leading-none select-none pointer-events-none"
                style={{ color: "#F2B5D420" }}
              >
                “
              </span>
              <p className="text-2xl md:text-3xl font-['Outfit'] font-light leading-[1.45] text-[#F5F5F0]">
                {t.founder.quote}
              </p>
            </blockquote>

            <p className="text-base leading-[1.9] text-[#AAA] font-light mb-6">
              {t.founder.p1}
            </p>

            <p className="text-base leading-[1.9] text-[#AAA] font-light mb-10">
              <span className="text-[#C3B1E1] font-normal">E.E</span>
              {t.founder.p2.replace("E.E", "")}
            </p>

            <div className="flex items-center gap-5">
              <a
                href="#booking"
                className="px-8 py-3 rounded-full text-sm tracking-[0.12em] uppercase font-light border transition-all duration-300"
                style={{
                  color: ctaColor === "#999" ? "#BBB" : ctaColor,
                  borderColor: ctaColor === "#999" ? "rgba(255,255,255,0.12)" : ctaColor,
                  boxShadow: ctaColor !== "#999" ? `0 0 30px ${ctaColor}20` : "none",
                }}
                onMouseEnter={() => setCtaColor(next())}
                onMouseLeave={() => setCtaColor("#999")}
              >
                {t.founder.cta}
              </a>
              <div className="hidden sm:block h-[1px] flex-1 max-w-[120px]" style={{ background: "linear-gradient(90deg, #F2B5D440, transparent)" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
