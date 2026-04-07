"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const STORAGE_KEY = "ee-home-scroll-y";

/**
 * Saves scroll position when leaving the home page and restores it when coming back
 * (Link "Retour", browser back, etc.). Next.js client navigations reset scroll to top by default.
 */
export default function HomeScrollRestore() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const prev = prevPathRef.current;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const y = raw != null ? Number.parseInt(raw, 10) : NaN;

    if (prev != null && prev !== "/" && Number.isFinite(y) && y > 0) {
      const apply = () => window.scrollTo(0, y);
      apply();
      const raf = requestAnimationFrame(apply);
      const t1 = window.setTimeout(apply, 80);
      const t2 = window.setTimeout(apply, 240);
      sessionStorage.removeItem(STORAGE_KEY);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [pathname]);

  useEffect(() => {
    const prev = prevPathRef.current;

    if (prev === "/" && pathname !== "/") {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}
