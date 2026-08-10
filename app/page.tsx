import { AOSInit } from "@/components/AOSInit";
import Hero from "@/components/sections/Hero";
import TwoAudiences from "@/components/sections/TwoAudiences";
import HowItWorks from "@/components/sections/HowItWorks";

import ForHosts from "@/components/sections/ForHosts";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* AOS only needed on the landing page, not loaded on party/browse pages */}
      <AOSInit />
      <Hero />
      <TwoAudiences />
      <HowItWorks />
      <ForHosts />
      <FinalCTA />
      <Footer />
    </main>
  );
}
