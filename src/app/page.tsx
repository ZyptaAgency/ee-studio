import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
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
        <Services />
        <Differentiators />
        <Marquee />
        <Portfolio />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
