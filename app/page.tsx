import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { ProblemSection } from "@/components/landing/sections/ProblemSection";
import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { ImpactSection } from "@/components/landing/sections/ImpactSection";
import { CtaSection } from "@/components/landing/sections/CtaSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ImpactSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
