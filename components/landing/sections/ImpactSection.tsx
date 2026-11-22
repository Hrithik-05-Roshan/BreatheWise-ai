import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ImpactSection() {
  return (
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
  );
}
