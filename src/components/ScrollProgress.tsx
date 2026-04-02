"use client";

import { useEffect, useState } from "react";
import { PASTEL_COLORS } from "@/lib/constants";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const [color, setColor] = useState<string>(PASTEL_COLORS[0]);

  useEffect(() => {
    setColor(PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)]);

    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${width}%`, backgroundColor: color }}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de la page"
    />
  );
}
