"use client";

import React from "react";
import { StructuredAiResponse } from "@/lib/types/chat";
import { Badge } from "@/components/ui/badge";

interface StructuredAiCardProps {
  structured: StructuredAiResponse;
}

/**
 * Renders the structured decision intelligence card inside assistant chat bubbles,
 * breaking down recommendations, scientific reasons, precautions, and disclaimers.
 */
export function StructuredAiCard({ structured }: StructuredAiCardProps) {
  return (
    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-3 text-xs">
      {/* What this means for you */}
      <div>
        <span className="font-bold text-slate-900 dark:text-white block">
          What this means for you:
        </span>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
          {structured.whatThisMeansForYou}
        </p>
      </div>

      {/* Recommended Actions */}
      {structured.recommendedActions && structured.recommendedActions.length > 0 && (
        <div className="space-y-1.5">
          <span className="font-bold text-slate-900 dark:text-white block">
            Recommended Actions:
          </span>
          <div className="space-y-1.5">
            {structured.recommendedActions.map((act, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>{act.action}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {act.timing}
                  </Badge>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 mt-1">
                  Benefit: {act.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scientific reasoning */}
      <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-900/10 text-emerald-950 dark:text-emerald-200">
        <span className="font-bold block">Scientific Reason:</span>
        <p className="mt-0.5">{structured.whyTheseActionsMatter}</p>
      </div>

      {/* Precautions */}
      {structured.importantPrecautions && structured.importantPrecautions.length > 0 && (
        <div>
          <span className="font-bold text-rose-800 dark:text-rose-400 block mb-1">
            Precautions:
          </span>
          <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
            {structured.importantPrecautions.map((p, pIdx) => (
              <li key={pIdx}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-[10px] text-slate-400 italic pt-1">
        {structured.disclaimer}
      </div>
    </div>
  );
}
