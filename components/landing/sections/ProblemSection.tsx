import React from "react";
import { Flame, Home, Users } from "lucide-react";

export function ProblemSection() {
  return (
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
  );
}
