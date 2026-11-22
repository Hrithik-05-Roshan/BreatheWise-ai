import React from "react";
import { Activity, Shield, Home, Navigation, TrendingDown, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
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
  );
}
