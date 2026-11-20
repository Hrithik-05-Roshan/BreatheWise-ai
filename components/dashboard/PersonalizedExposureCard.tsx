"use client";

import React from "react";
import { UserProfile } from "@/lib/types/profile";
import { AirQualityData } from "@/lib/types/air-quality";
import { calculatePersonalizedVulnerability } from "@/lib/air-quality/calculations";
import { ShieldAlert, UserCheck, AlertCircle, Sparkles, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PersonalizedExposureCard({
  profile,
  airQuality,
}: {
  profile: UserProfile;
  airQuality: AirQualityData;
}) {
  const isSevere = airQuality.aqi > 300;
  const isPoor = airQuality.aqi > 200;

  // Derive personalized exposure vulnerability profile via pure domain calculation
  const { vulnerabilityScore, factors } = calculatePersonalizedVulnerability(profile);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Personalized Exposure & Lifestyle Impact
          </h3>
        </div>
        <Badge variant="secondary" className="text-[11px] font-medium">
          Profile: {profile.lifestyle.replace("_", " ")}
        </Badge>
      </div>

      <div className="mt-4 space-y-4">
        {/* Exposure Status Metric */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Estimated Relative Exposure Index
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${vulnerabilityScore > 70 ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}>
              {vulnerabilityScore > 70 ? "Elevated Risk Profile" : "Moderate Risk Profile"}
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                vulnerabilityScore > 70 ? "bg-rose-600" : "bg-amber-500"
              }`}
              style={{ width: `${vulnerabilityScore}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block mt-1.5">
            Transparent relative model based on household composition, commute exertion, and indoor purifier availability.
          </span>
        </div>

        {/* Active Vulnerability Drivers */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Key Environmental Drivers for You:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {factors.map((f, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-900/10 dark:border-emerald-500/20"
              >
                • {f}
              </span>
            ))}
          </div>
        </div>

        {/* Clear Medical Transparency Disclaimer */}
        <div className="p-3 rounded-lg border border-slate-200/60 bg-slate-50/50 text-[11px] text-slate-500 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Transparency Notice:</strong> This indicator models relative exposure likelihood from your lifestyle inputs. It is <em>not</em> a medical diagnosis or clinically validated personal dosimeter.
          </p>
        </div>
      </div>
    </div>
  );
}
