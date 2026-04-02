"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  color: string;
  className?: string;
}

function parseValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
  }
  return { prefix: "", number: 0, suffix: value };
}

export default function AnimatedCounter({ value, color, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");
  const parsed = parseValue(value);
  const hasNumber = parsed.number > 0;

  useEffect(() => {
    if (!isInView || !hasNumber) return;

    const target = parsed.number;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplay(Math.round(current).toString());
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, hasNumber, parsed.number]);

  if (!hasNumber) {
    return (
      <motion.span
        ref={ref}
        className={className}
        style={{ color }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {parsed.prefix}
      <span>{isInView ? display : "0"}</span>
      {parsed.suffix}
    </motion.span>
  );
}
