"use client";
import { motion } from "framer-motion";

const PASTEL_COLORS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#FADADD", "#B5D8EB", "#F5E6C8"];

interface Shape {
  type: "circle" | "ring" | "square" | "triangle" | "cross" | "dot";
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
  rotate?: number;
}

function generateShapes(count: number, seed: number): Shape[] {
  const types: Shape["type"][] = ["circle", "ring", "square", "triangle", "cross", "dot"];
  const shapes: Shape[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i) % types.length;
    shapes.push({
      type: types[idx],
      size: 12 + ((seed * (i + 1) * 7) % 30),
      x: `${5 + ((seed * (i + 1) * 13) % 90)}%`,
      y: `${5 + ((seed * (i + 1) * 17) % 90)}%`,
      color: PASTEL_COLORS[(seed + i) % PASTEL_COLORS.length],
      delay: i * 0.4,
      duration: 6 + (i % 4) * 2,
      rotate: (i % 2 === 0) ? 360 : -360,
    });
  }
  return shapes;
}

function ShapeSVG({ type, size, color }: { type: Shape["type"]; size: number; color: string }) {
  switch (type) {
    case "circle":
      return <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />;
    case "ring":
      return <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke={color} strokeWidth="1.5" />;
    case "square":
      return <rect width={size * 0.7} height={size * 0.7} x={size * 0.15} y={size * 0.15} fill="none" stroke={color} strokeWidth="1.5" rx="2" />;
    case "triangle":
      return <polygon points={`${size / 2},${size * 0.15} ${size * 0.15},${size * 0.85} ${size * 0.85},${size * 0.85}`} fill="none" stroke={color} strokeWidth="1.5" />;
    case "cross":
      return (
        <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
          <line x1={size * 0.3} y1={size / 2} x2={size * 0.7} y2={size / 2} />
          <line x1={size / 2} y1={size * 0.3} x2={size / 2} y2={size * 0.7} />
        </g>
      );
    case "dot":
      return <circle cx={size / 2} cy={size / 2} r={size / 4} fill={color} />;
    default:
      return null;
  }
}

export default function FloatingShapes({ count = 8, seed = 1 }: { count?: number; seed?: number }) {
  const shapes = generateShapes(count, seed);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.08, 0.15, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
            y: [0, -20, 10, -15, 0],
            rotate: [0, shape.rotate || 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width={shape.size} height={shape.size} viewBox={`0 0 ${shape.size} ${shape.size}`}>
            <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
