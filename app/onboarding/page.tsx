import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Personalization Engine
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Build Your Air Quality Action Plan
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tell us about your household and daily routine so BreatheWise AI can calculate specific exposure mitigation and sustainable alternatives.
          </p>
        </div>

        <OnboardingWizard />
      </main>

      <Footer />
    </div>
  );
}
