import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Differentiators />
        <Marquee />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
