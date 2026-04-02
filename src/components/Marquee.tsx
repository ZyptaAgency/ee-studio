"use client";

import { useI18n } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useI18n();
  const words = t.marquee;
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((word, i) => (
          <span
            key={i}
            className="font-heading text-4xl md:text-6xl font-bold tracking-wider text-[#F5F5F0]/[0.06] mx-5 md:mx-8 select-none"
          >
            {word}
            <span className="mx-5 md:mx-8">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
