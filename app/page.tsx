import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveAqiVisualizer } from "@/components/landing/InteractiveAqiVisualizer";
import { Button } from "@/components/ui/button";
import {
  Wind,
  Shield,
  Heart,
  TrendingDown,
  Navigation,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Users,
  Building2,
  Bike,
  Activity,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
          {/* Subtle nature-inspired atmospheric glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/50 via-teal-50/30 to-transparent dark:from-emerald-950/20 dark:via-transparent -z-10 pointer-events-none rounded-full blur-3xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & Value Prop */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Urban Air Quality Intelligence Platform</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Breathe smarter. <br />
                  <span className="text-emerald-700 dark:text-emerald-400">Live healthier.</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Your personal AI companion for navigating urban air pollution, protecting your family from winter smog, and converting daily decisions into measurable climate impact.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/onboarding" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-base font-semibold shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2">
                      Build My Air Quality Plan
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-base">
                      Explore Live Demo
                    </Button>
                  </Link>
                </div>

                {/* Trust Metrics */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
                  <div>
                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">CPCB NAQI</span>
                    <span className="text-xs text-slate-500">Official Indian Scale</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">100% Deterministic</span>
                    <span className="text-xs text-slate-500">Grounded Logic Engine</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">Zero Tracking</span>
                    <span className="text-xs text-slate-500">Privacy Preserved</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Air Quality Visualizer */}
              <div className="lg:col-span-5">
                <InteractiveAqiVisualizer />
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRODUCT PHILOSOPHY BANNER */}
        <section className="bg-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">The BreatheWise Philosophy</span>
            <blockquote className="text-xl sm:text-2xl font-medium italic leading-relaxed text-emerald-50">
              &ldquo;Don&apos;t just tell people how polluted their city is. Tell them what they should do differently today, why it matters, and what impact their decisions create.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* PROBLEM AWARENESS SECTION */}
        <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">The Urban Reality</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Why Standard Weather Apps Fail Families
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                A simple red number on your phone doesn&apos;t protect your child from playground asthma or prevent indoor gas stove toxins from accumulating in your living room.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Winter Thermal Inversion</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cold air traps vehicular soot and crop residue smoke beneath a dense ceiling at street level between 6:00 AM and 10:00 AM. Exercising outdoors during this window drives 10x more ultrafine PM2.5 into pulmonary capillaries.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Home className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Indoor Air Paradox</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Keeping windows tightly sealed without ventilation traps indoor cooking particulates, incense VOCs, and moisture, frequently causing indoor PM2.5 to exceed outdoor levels. Houseplants alone cannot filter room-sized air volumes.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Household Disparities</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Children breathe 50% more air per kilogram of body weight than adults, and seniors face severe cardiovascular stress from fine particulate trans-membrane infiltration. Generic advisories ignore these physiological differences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT FEATURES */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Intelligent Modules</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Six Pillars of Actionable Environmental Protection
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time AQI Intelligence</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Accurate CPCB standard index calculations for PM2.5, PM10, NO2, and SO2, distinguishing live observed sensor readings from diurnal forecasts.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personalized Daily Routines</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Deterministic recommendations customized to your household: children&apos;s outdoor play, senior health protection, and workout scheduling.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Home className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Indoor Air Guidance</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Room-by-room clean air strategies: optimal HEPA placement, safe mid-day ventilation windows, and low-cost bedroom gap draft sealing.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Navigation className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Commute Assistant</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Evaluates respiratory exposure alongside distance. Advises when to switch active cycling to enclosed Metro during peak ground smog.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sustainable Alternatives</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Practical trip chaining, carpooling, and energy efficiency suggestions that lower community emissions while saving household money.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">BreatheWise Intelligence AI</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Secure conversational assistant grounded in structured meteorological data and household parameters, with guaranteed deterministic fallback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (4 STEPS) */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Step-by-Step</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                How BreatheWise Protects Your Day
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3 relative">
                <div className="h-12 w-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Understand Environment</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We ingest live CPCB standards and Open-Meteo European models to evaluate PM2.5, PM10, temperature inversion, and wind stagnation.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="h-12 w-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Map Your Lifestyle</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your household members, commute vehicle, home ventilation, and budget define the constraints of your personalized health profile.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="h-12 w-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Execute Diurnal Plan</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Receive 4 time-slotted routines (Morning, Afternoon, Evening, Night) with exact scientific rationales and difficulty ratings.
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="h-12 w-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Track Verifiable Impact</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Measure estimated kg CO2 avoided, cleaner air hours achieved, and sustainable habit streaks with transparent CEA methodology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ENVIRONMENTAL IMPACT SECTION */}
        <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Verifiable Climate Metrics</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Transparent Calculations, Real Environmental Change
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  Every sustainable action you log uses verified Indian emission baselines from the Central Electricity Authority (CEA) and Ministry of Road Transport. We never present speculative greenwashing estimates as verified reductions.
                </p>

                <ul className="space-y-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>Solo car vs. Metro:</strong> Avoids 0.150 kg CO2 per passenger kilometer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>Trip chaining:</strong> Eliminates high-emission cold engine starts (saves ~1.5 kg CO2)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>Targeted draft-proofing:</strong> Reduces bedroom infiltration without power consumption</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-xl space-y-6">
                  <h3 className="text-xl font-bold">Community Impact Snapshot</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md">
                      <span className="text-xs text-emerald-200 uppercase font-semibold">CO2 Avoided</span>
                      <span className="text-3xl font-black block mt-1">42.8 <span className="text-base font-normal">kg</span></span>
                      <span className="text-[11px] text-emerald-200/80">Equivalent to 2.1 urban trees planted</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md">
                      <span className="text-xs text-emerald-200 uppercase font-semibold">Clean Air Hours</span>
                      <span className="text-3xl font-black block mt-1">128 <span className="text-base font-normal">hrs</span></span>
                      <span className="text-[11px] text-emerald-200/80">Protected indoor sleep & rest</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-200/80 italic leading-relaxed">
                    * Baseline calculations model standard urban transport shifts across 5 metropolitan clusters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-700 text-white text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Protect Your Family This Winter?
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Complete a 2-minute personalized onboarding to receive today&apos;s tailored morning, afternoon, and evening air quality action plan.
            </p>
            <div className="pt-2 flex justify-center">
              <Link href="/onboarding">
                <Button size="lg" className="bg-white hover:bg-slate-100 text-emerald-900 font-bold px-8 py-3 text-base shadow-xl">
                  Build My Air Quality Plan Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
