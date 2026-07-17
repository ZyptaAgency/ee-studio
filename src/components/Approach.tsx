"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Check } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const PHASE_ACCENTS = ["#C3B1E1", "#F2B5D4", "#A8D8C8"];

export default function Approach() {
  const { t } = useI18n();

  return (
    <section id="approach" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={10} seed={8} />

      <div className="absolute top-20 right-1/4 w-[350px] h-[350px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#C3B1E1" }} />
      <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#A8D8C8" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.25em] uppercase text-[#C3B1E1] mb-5"
          >
            {t.approach.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']"
            style={{ fontWeight: 700 }}
          >
            {t.approach.title_prefix}
            <span className="text-[#C3B1E1]">{t.approach.title_highlight}</span> ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-[#888] font-light mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            {t.approach.intro}
          </motion.p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute top-[54px] left-[16%] right-[16%] h-[1px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, #C3B1E140, #F2B5D440, #A8D8C840)" }}
          />

          {t.approach.phases.map((phase, i) => {
            const accent = PHASE_ACCENTS[i % PHASE_ACCENTS.length];
            return (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="relative z-10 w-[70px] h-[70px] rounded-full flex items-center justify-center mb-7 border-2 bg-[#0A0A0A]"
                    style={{ borderColor: accent, boxShadow: `0 0 24px ${accent}25` }}
                  >
                    <span className="text-xl font-['Outfit'] font-bold" style={{ color: accent }}>
                      {phase.num}
                    </span>
                  </div>

                  <span
                    className="text-[11px] tracking-[0.22em] uppercase mb-3 px-3 py-1 rounded-full"
                    style={{ color: accent, backgroundColor: `${accent}12` }}
                  >
                    {phase.tag}
                  </span>

                  <h3 className="text-xl md:text-2xl font-['Outfit'] font-semibold mb-6 text-[#F5F5F0]">
                    {phase.title}
                  </h3>

                  <ul className="space-y-4 text-left w-full max-w-xs mx-auto">
                    {phase.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${accent}18` }}
                        >
                          <Check size={12} strokeWidth={2.5} style={{ color: accent }} />
                        </span>
                        <span className="text-sm leading-relaxed text-[#999] font-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
