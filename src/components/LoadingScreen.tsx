"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const PASTELS = ["#F2B5D4", "#C3B1E1", "#A8D8C8", "#B5D8EB", "#FADADD", "#F5E6C8"];

const SHAPES = [
  { type: "circle", x: "12%", y: "18%", size: 24, color: PASTELS[0], delay: 0.2, dur: 4 },
  { type: "ring", x: "85%", y: "22%", size: 30, color: PASTELS[1], delay: 0.5, dur: 5 },
  { type: "square", x: "8%", y: "75%", size: 20, color: PASTELS[2], delay: 0.3, dur: 4.5 },
  { type: "triangle", x: "88%", y: "70%", size: 26, color: PASTELS[3], delay: 0.7, dur: 5.5 },
  { type: "diamond", x: "22%", y: "40%", size: 18, color: PASTELS[4], delay: 0.1, dur: 3.5 },
  { type: "cross", x: "78%", y: "45%", size: 22, color: PASTELS[5], delay: 0.6, dur: 4 },
  { type: "dot", x: "35%", y: "15%", size: 10, color: PASTELS[1], delay: 0.4, dur: 3 },
  { type: "dot", x: "65%", y: "82%", size: 12, color: PASTELS[0], delay: 0.8, dur: 3.5 },
  { type: "ring", x: "50%", y: "10%", size: 16, color: PASTELS[2], delay: 0.9, dur: 4.5 },
  { type: "circle", x: "45%", y: "88%", size: 14, color: PASTELS[5], delay: 0.3, dur: 3.8 },
  { type: "diamond", x: "70%", y: "30%", size: 15, color: PASTELS[3], delay: 1.0, dur: 4.2 },
  { type: "square", x: "30%", y: "65%", size: 16, color: PASTELS[4], delay: 0.5, dur: 5 },
];

function ShapeSVG({ type, size, color }: { type: string; size: number; color: string }) {
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
    default:
      return null;
  }
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: `${5 + (i * 47 + 13) % 90}%`,
  y: `${5 + (i * 31 + 7) % 90}%`,
  color: PASTELS[i % PASTELS.length],
  size: 2 + (i % 3),
  delay: i * 0.12,
  dur: 2 + (i % 3) * 0.8,
}));

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Ambient pastel glows */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #C3B1E1 0%, transparent 70%)", top: "15%", left: "10%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.06, 0.03, 0.06, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #F2B5D4 0%, transparent 70%)", bottom: "10%", right: "10%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0.02, 0.05, 0] }}
        transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #A8D8C8 0%, transparent 70%)", top: "50%", right: "25%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.04, 0.02, 0.04, 0] }}
        transition={{ duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating geometric shapes */}
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.25, 0.12, 0.25, 0],
            scale: [0.3, 1.1, 0.8, 1, 0.3],
            y: [0, -25, 12, -18, 0],
            x: [0, 8, -8, 5, 0],
            rotate: [0, i % 2 === 0 ? 180 : -180],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width={s.size} height={s.size} viewBox={`0 0 ${s.size} ${s.size}`}>
            <ShapeSVG type={s.type} size={s.size} color={s.color} />
          </svg>
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0, 0.3, 0],
            scale: [0, 1.5, 0.5, 1.2, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Centered column: logo + tagline + progress bar — all same width */}
      <div className="relative z-10 flex flex-col items-center w-44 md:w-60">
        {/* Logo with pulse glow */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 -m-8 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #C3B1E120 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={430}
            height={304}
            className="w-full h-auto object-contain relative z-10"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {["Stratégie", "Création", "Impact"].map((word, i) => (
            <motion.span
              key={word}
              className="text-[10px] md:text-xs font-light tracking-[0.15em] uppercase"
              style={{ color: PASTELS[i] }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
            >
              {word}
              {i < 2 && (
                <motion.span
                  className="inline-block w-1 h-1 rounded-full mx-1.5 align-middle"
                  style={{ backgroundColor: PASTELS[i + 1] }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.3 }}
                />
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Progress bar — aligned with the 3 dots (rectangle area of logo) */}
        <motion.div
          className="mt-8 h-[3px] rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", width: "86%", marginRight: "4%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #F2B5D4, #C3B1E1, #A8D8C8, #B5D8EB, #F5E6C8)",
              backgroundSize: "200% 100%",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </div>

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="w-full h-[1.5px] rounded-full" style={{ background: "linear-gradient(90deg, #C3B1E1, transparent)" }} />
        <div className="w-[1.5px] h-full rounded-full" style={{ background: "linear-gradient(180deg, #C3B1E1, transparent)" }} />
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="w-full h-[1.5px] rounded-full" style={{ background: "linear-gradient(270deg, #F2B5D4, transparent)" }} />
        <div className="w-[1.5px] h-full rounded-full ml-auto" style={{ background: "linear-gradient(180deg, #F2B5D4, transparent)" }} />
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="w-[1.5px] h-full rounded-full" style={{ background: "linear-gradient(0deg, #A8D8C8, transparent)" }} />
        <div className="w-full h-[1.5px] rounded-full mt-auto" style={{ background: "linear-gradient(90deg, #A8D8C8, transparent)" }} />
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="w-[1.5px] h-full rounded-full ml-auto" style={{ background: "linear-gradient(0deg, #B5D8EB, transparent)" }} />
        <div className="w-full h-[1.5px] rounded-full mt-auto" style={{ background: "linear-gradient(270deg, #B5D8EB, transparent)" }} />
      </motion.div>
    </motion.div>
  );
}
