import { AOSInit } from "@/components/AOSInit";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import ForHosts from "@/components/sections/ForHosts";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* AOS only needed on the landing page — not loaded on party/browse pages */}
      <AOSInit />
      <Hero />
      <Features />
      <HowItWorks />
      <ForHosts />
      <Pricing />
      <Footer />
    </main>
  );
}
