"use client";

import { useCallback, useRef } from "react";

const PASTEL_COLORS = [
  "#F2B5D4", // Rose doux
  "#C3B1E1", // Lavande
  "#A8D8C8", // Menthe
  "#FADADD", // Pêche
  "#B5D8EB", // Bleu ciel
  "#F5E6C8", // Jaune sable
];

export function usePastelRotation() {
  const indexRef = useRef(0);

  const next = useCallback(() => {
    const color = PASTEL_COLORS[indexRef.current];
    indexRef.current = (indexRef.current + 1) % PASTEL_COLORS.length;
    return color;
  }, []);

  const random = useCallback(() => {
    const idx = Math.floor(Math.random() * PASTEL_COLORS.length);
    return PASTEL_COLORS[idx];
  }, []);

  return { next, random, colors: PASTEL_COLORS };
}

export { PASTEL_COLORS };
