"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/logo.png"
          alt="EE Studio"
          width={430}
          height={304}
          className="w-40 md:w-56 h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mt-10 w-32 md:w-40 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.div
          className="h-full bg-[#C3B1E1] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
}
