import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveAqiVisualizer } from "@/components/landing/InteractiveAqiVisualizer";

export function HeroSection() {
  return (
    <>
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
    </>
  );
}
