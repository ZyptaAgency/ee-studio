"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { I18nProvider } from "@/lib/i18n";

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Portfolio from "@/components/Portfolio";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <I18nProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Differentiators />
        <Portfolio />
        <Marquee />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </I18nProvider>
  );
}
