import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BeforeAfter from "./components/BeforeAfter";
import HowItWorks from "./components/HowItWorks";
import Trust from "./components/Trust";
import Cleaners from "./components/Cleaners";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-50 text-foreground-900">
      <h1 className="sr-only">
        Lord Cleaning Services — Reliable House Cleaning in Northern Virginia
      </h1>
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfter />
      <HowItWorks />
      <Trust />
      <Cleaners />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}