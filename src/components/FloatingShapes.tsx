"use client";

import { motion } from "framer-motion";
import { PASTEL_COLORS } from "@/lib/constants";

interface Shape {
  type: "circle" | "ring" | "square" | "triangle" | "cross" | "diamond";
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
  rotation?: number;
}

const defaultShapes: Shape[] = [
  { type: "ring", size: 120, x: "5%", y: "15%", color: PASTEL_COLORS[0], delay: 0, duration: 20 },
  { type: "circle", size: 8, x: "15%", y: "70%", color: PASTEL_COLORS[1], delay: 1, duration: 15 },
  { type: "square", size: 40, x: "85%", y: "20%", color: PASTEL_COLORS[2], delay: 2, duration: 25, rotation: 45 },
  { type: "triangle", size: 50, x: "90%", y: "75%", color: PASTEL_COLORS[3], delay: 0.5, duration: 18 },
  { type: "cross", size: 30, x: "10%", y: "45%", color: PASTEL_COLORS[4], delay: 3, duration: 22 },
  { type: "diamond", size: 35, x: "75%", y: "50%", color: PASTEL_COLORS[5], delay: 1.5, duration: 20 },
  { type: "ring", size: 60, x: "50%", y: "85%", color: PASTEL_COLORS[1], delay: 2.5, duration: 17 },
  { type: "circle", size: 12, x: "70%", y: "10%", color: PASTEL_COLORS[4], delay: 4, duration: 14 },
  { type: "square", size: 20, x: "30%", y: "30%", color: PASTEL_COLORS[0], delay: 1, duration: 23, rotation: 15 },
  { type: "triangle", size: 30, x: "60%", y: "60%", color: PASTEL_COLORS[2], delay: 3.5, duration: 19 },
];

function ShapeSVG({ shape }: { shape: Shape }) {
  const { type, size, color } = shape;

  switch (type) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill={color} />
        </svg>
      );
    case "ring":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FloatingShapes({
  shapes = defaultShapes,
  opacity = 0.12,
}: {
  shapes?: Shape[];
  opacity?: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            opacity,
            rotate: shape.rotation ?? 0,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [
              shape.rotation ?? 0,
              (shape.rotation ?? 0) + 90,
              (shape.rotation ?? 0) + 180,
              (shape.rotation ?? 0) + 270,
              (shape.rotation ?? 0) + 360,
            ],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          <ShapeSVG shape={shape} />
        </motion.div>
      ))}
    </div>
  );
}

export type { Shape };
