import React from "react";
import { Recommendation } from "@/lib/types/recommendations";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap, Info, Clock } from "lucide-react";

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  const getDifficultyBadge = (d: string) => {
    switch (d) {
      case "easy":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-[10px]">Easy</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-[10px]">Moderate</Badge>;
      default:
        return <Badge variant="secondary" className="bg-rose-100 text-rose-800 text-[10px]">High Effort</Badge>;
    }
  };

  const getCostBadge = (c: string) => {
    switch (c) {
      case "free":
        return <Badge variant="outline" className="text-emerald-700 border-emerald-300 text-[10px] font-bold">Free</Badge>;
      case "low":
        return <Badge variant="outline" className="text-blue-700 border-blue-300 text-[10px]">Low Cost ($)</Badge>;
      default:
        return <Badge variant="outline" className="text-purple-700 border-purple-300 text-[10px]">Investment ($$$)</Badge>;
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 hover:border-emerald-600/40 transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
              {rec.title}
            </h4>
            <span className="text-[11px] text-slate-500 capitalize flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              Timing: {rec.whenToDoIt.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {getCostBadge(rec.cost)}
          {getDifficultyBadge(rec.difficulty)}
        </div>
      </div>

      {/* 8-Part Explicit Recommendation Data Required by Prompt */}
      <div className="space-y-3 text-xs">
        {/* 1. What to do */}
        <div>
          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
            1. What to do:
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {rec.whatToDo}
          </p>
        </div>

        {/* 2. Why it matters & Scientific Reasoning */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              2. Why it matters:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {rec.whyItMatters}
            </p>
          </div>

          <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              Supporting Evidence:
            </span>
            <p className="text-slate-500 italic">
              {rec.supportingData}
            </p>
          </div>
        </div>

        {/* 3 & 4: Expected Benefit & Environmental Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg border border-emerald-900/10 bg-emerald-50/50 dark:bg-emerald-950/20">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
              Expected Benefit:
            </span>
            <p className="text-emerald-950 dark:text-emerald-200 mt-0.5">
              {rec.expectedBenefit}
            </p>
          </div>

          <div className="p-2.5 rounded-lg border border-teal-900/10 bg-teal-50/50 dark:bg-teal-950/20">
            <span className="font-bold text-teal-900 dark:text-teal-300 block">
              Environmental Impact:
            </span>
            <p className="text-teal-950 dark:text-teal-200 mt-0.5">
              {rec.environmentalImpact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
