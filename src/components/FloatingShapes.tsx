"use client";
import { motion } from "framer-motion";

const PASTEL_COLORS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#FADADD", "#B5D8EB", "#F5E6C8"];

interface Shape {
  type: "circle" | "ring" | "square" | "triangle" | "cross" | "dot" | "diamond" | "arc" | "hexagon";
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
  rotate?: number;
  opacity: number;
}

function generateShapes(count: number, seed: number): Shape[] {
  const types: Shape["type"][] = ["circle", "ring", "square", "triangle", "cross", "dot", "diamond", "arc", "hexagon"];
  const shapes: Shape[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i) % types.length;
    const sizeFactor = 18 + ((seed * (i + 1) * 7) % 40);
    shapes.push({
      type: types[idx],
      size: sizeFactor,
      x: `${3 + ((seed * (i + 1) * 13) % 94)}%`,
      y: `${3 + ((seed * (i + 1) * 17) % 94)}%`,
      color: PASTEL_COLORS[(seed + i) % PASTEL_COLORS.length],
      delay: i * 0.3,
      duration: 5 + (i % 5) * 2,
      rotate: (i % 3 === 0) ? 360 : (i % 3 === 1) ? -180 : 90,
      opacity: 0.12 + ((seed * i) % 5) * 0.03,
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
      return <rect width={size * 0.7} height={size * 0.7} x={size * 0.15} y={size * 0.15} fill="none" stroke={color} strokeWidth="1.5" rx="3" />;
    case "triangle":
      return <polygon points={`${size / 2},${size * 0.1} ${size * 0.1},${size * 0.9} ${size * 0.9},${size * 0.9}`} fill="none" stroke={color} strokeWidth="1.5" />;
    case "cross":
      return (
        <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
          <line x1={size * 0.25} y1={size / 2} x2={size * 0.75} y2={size / 2} />
          <line x1={size / 2} y1={size * 0.25} x2={size / 2} y2={size * 0.75} />
        </g>
      );
    case "dot":
      return <circle cx={size / 2} cy={size / 2} r={size / 3} fill={color} />;
    case "diamond":
      return (
        <polygon
          points={`${size / 2},${size * 0.1} ${size * 0.9},${size / 2} ${size / 2},${size * 0.9} ${size * 0.1},${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      );
    case "arc":
      return (
        <path
          d={`M ${size * 0.15} ${size * 0.6} A ${size * 0.35} ${size * 0.35} 0 0 1 ${size * 0.85} ${size * 0.6}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    case "hexagon": {
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.4;
      const pts = Array.from({ length: 6 }, (_, j) => {
        const angle = (Math.PI / 3) * j - Math.PI / 2;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      return <polygon points={pts} fill="none" stroke={color} strokeWidth="1.5" />;
    }
    default:
      return null;
  }
}

export default function FloatingShapes({ count = 10, seed = 1 }: { count?: number; seed?: number }) {
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
            opacity: [0, shape.opacity, shape.opacity * 0.5, shape.opacity, 0],
            scale: [0.4, 1.1, 0.9, 1.05, 0.4],
            y: [0, -30, 15, -20, 0],
            x: [0, 10, -10, 5, 0],
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
