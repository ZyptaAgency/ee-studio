import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import CtaBand from "@/components/CtaBand";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Founder />
        <Approach />
        <Services />
        <Differentiators />
        <Marquee />
        <Portfolio />
        <CtaBand />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
