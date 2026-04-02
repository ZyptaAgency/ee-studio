"use client";
import { useRef, useCallback } from "react";

const PASTELS = [
  "#F2B5D4", // rose
  "#C3B1E1", // lavande
  "#A8D8C8", // menthe
  "#FADADD", // pêche
  "#B5D8EB", // ciel
  "#F5E6C8", // sable
];

export function usePastelRotation() {
  const indexRef = useRef(0);

  const next = useCallback(() => {
    const color = PASTELS[indexRef.current];
    indexRef.current = (indexRef.current + 1) % PASTELS.length;
    return color;
  }, []);

  const random = useCallback(() => {
    const idx = Math.floor(Math.random() * PASTELS.length);
    return PASTELS[idx];
  }, []);

  return { next, random, pastels: PASTELS };
}
