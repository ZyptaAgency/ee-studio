"use client";

import { MARQUEE_WORDS } from "@/lib/constants";

export default function Marquee() {
  const repeated = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((word, i) => (
          <span
            key={i}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-[#F5F5F0]/[0.07] mx-6 md:mx-10 select-none"
          >
            {word}
            <span className="mx-6 md:mx-10">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
