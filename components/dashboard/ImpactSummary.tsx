"use client";

import React from "react";
import { ImpactSummaryData } from "@/lib/types/impact";
import { Leaf, Award, Flame, Zap, ShieldCheck } from "lucide-react";

export function ImpactSummary({ data }: { data: ImpactSummaryData }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5 text-emerald-600" />
            Environmental Impact
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            Your Measurable Climate Contribution
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full text-emerald-800 dark:text-emerald-300">
          <Award className="h-3.5 w-3.5" />
          <span>{data.streakDays} Day Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">CO2 Avoided</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
            {data.totalCo2SavedKg} <span className="text-xs font-normal text-slate-400">kg</span>
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 block font-medium">
            Based on CEA baselines
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Actions Logged</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
            {data.actionsCompletedCount}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Verified habit routines
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Sustainable Transit</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
            {data.sustainableTripKm} <span className="text-xs font-normal text-slate-400">km</span>
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Metro & active mobility
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Clean Air Hours</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
            {data.estimatedCleanerAirHours} <span className="text-xs font-normal text-slate-400">hrs</span>
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 block font-medium">
            Sealed room protection
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {data.methodologyNote}
        </p>
      </div>
    </div>
  );
}
