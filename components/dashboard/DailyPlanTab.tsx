"use client";

import React from "react";
import { DailyPlanSlot, Recommendation } from "@/lib/types/recommendations";
import { DailyStatusCard } from "@/components/dashboard/DailyStatusCard";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { ErrorBoundary } from "@/components/ui/error-boundary";

interface DailyPlanTabProps {
  diurnalSlots: DailyPlanSlot[];
  recommendations: Recommendation[];
}

export function DailyPlanTab({ diurnalSlots, recommendations }: DailyPlanTabProps) {
  return (
    <div className="space-y-6 animate-fade-in" role="region" aria-label="Daily Air Quality Plan">
      <ErrorBoundary fallbackMessage="Could not render diurnal schedule">
        <DailyStatusCard slots={diurnalSlots} />
      </ErrorBoundary>

      <div className="space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Full 24-Hour Personalized Actions
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every recommendation is calculated using your household vulnerability, daily commute, and indoor living conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
