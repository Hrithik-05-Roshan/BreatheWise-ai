"use client";

import React from "react";
import dynamic from "next/dynamic";
import { UserProfile } from "@/lib/types/profile";
import { AirQualityData } from "@/lib/types/air-quality";
import { Recommendation, DailyPlanSlot } from "@/lib/types/recommendations";
import { ImpactSummaryData } from "@/lib/types/impact";

import { AQICard } from "@/components/dashboard/AQICard";
import { PersonalizedExposureCard } from "@/components/dashboard/PersonalizedExposureCard";
import { DailyStatusCard } from "@/components/dashboard/DailyStatusCard";
import { HouseholdChecklist } from "@/components/dashboard/HouseholdChecklist";
import { ImpactSummary } from "@/components/dashboard/ImpactSummary";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Dynamically import HourlyChart with a skeleton placeholder to optimize initial dashboard bundle
const HourlyChartDynamic = dynamic(
  () => import("@/components/dashboard/HourlyChart").then((mod) => mod.HourlyChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 animate-pulse flex items-center justify-center text-xs text-slate-400">
        Loading Diurnal Hourly Dynamics...
      </div>
    ),
  }
);

interface OverviewTabProps {
  airQuality: AirQualityData;
  profile: UserProfile;
  diurnalSlots: DailyPlanSlot[];
  recommendations: Recommendation[];
  impactData: ImpactSummaryData;
}

export function OverviewTab({
  airQuality,
  profile,
  diurnalSlots,
  recommendations,
  impactData,
}: OverviewTabProps) {
  return (
    <div className="space-y-6 animate-fade-in" role="region" aria-label="Dashboard Overview">
      {/* Row 1: Air Quality Gauge & Personalized Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ErrorBoundary fallbackMessage="Could not load real-time AQI gauge">
            <AQICard data={airQuality} />
          </ErrorBoundary>
        </div>
        <div className="lg:col-span-5">
          <ErrorBoundary fallbackMessage="Could not load personalized exposure indicator">
            <PersonalizedExposureCard profile={profile} airQuality={airQuality} />
          </ErrorBoundary>
        </div>
      </div>

      {/* Row 2: Diurnal Action Schedule */}
      <ErrorBoundary fallbackMessage="Could not load diurnal schedule">
        <DailyStatusCard slots={diurnalSlots} />
      </ErrorBoundary>

      {/* Row 3: Hourly Inversion Chart & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ErrorBoundary fallbackMessage="Could not load hourly air quality chart">
            <HourlyChartDynamic data={airQuality.hourly} />
          </ErrorBoundary>
        </div>
        <div className="lg:col-span-5">
          <ErrorBoundary fallbackMessage="Could not load household safety checklist">
            <HouseholdChecklist />
          </ErrorBoundary>
        </div>
      </div>

      {/* Row 4: Top Prioritized Recommendations Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Today&apos;s Context-Prioritized Recommendations
          </h3>
          <Badge variant="outline" className="text-xs">
            {recommendations.length} Actionable Items
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.slice(0, 4).map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>

      {/* Row 5: Environmental Impact Summary */}
      <ErrorBoundary fallbackMessage="Could not load environmental impact summary">
        <ImpactSummary data={impactData} />
      </ErrorBoundary>
    </div>
  );
}
