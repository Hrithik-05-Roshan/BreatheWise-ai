import React from "react";

export function HowItWorksSection() {
  return (
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
  );
}
