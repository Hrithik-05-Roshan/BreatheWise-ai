"use client";

import React, { useState } from "react";
import { UserProfile } from "@/lib/types/profile";
import { Home, ShieldCheck, Flame, Wind, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IndoorAirAudit({ profile }: { profile: UserProfile }) {
  const [purifierStatus, setPurifierStatus] = useState(profile.indoorEnvironment.hasAirPurifier);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5 text-emerald-600" />
            Indoor Environmental Intelligence
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            Home Air Audit & Room-by-Room Protection
          </h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          Fuel: {profile.indoorEnvironment.cookingFuel.toUpperCase()}
        </Badge>
      </div>

      {/* Low Cost / Zero Cost Clean Room Guide */}
      <div className="p-5 rounded-xl border border-emerald-900/10 dark:border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span>The &ldquo;Clean Room&rdquo; Strategy (Zero-Cost / High Benefit)</span>
        </div>
        <p className="text-xs text-emerald-950 dark:text-emerald-300 leading-relaxed">
          Most families cannot afford whole-house industrial HEPA filtration. Pick <strong>one bedroom</strong> where sensitive members sleep:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950 dark:text-emerald-200">
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Door Bottom Seal:</strong> Place a rolled damp towel or rubber snake under the door to stop hallway drafts.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Window Lockdown:</strong> Keep sealed between 06:00 AM and 11:00 AM when outdoor ground inversion peaks.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Zero Combustion:</strong> Completely prohibit incense (agarbatti), dhoop, and mosquito coils in bedrooms.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Dust Suppression:</strong> Use damp micro-fiber mopping rather than dry broom sweeping that resuspends PM10.</span>
          </li>
        </ul>
      </div>

      {/* Room-by-Room Audit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kitchen */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Flame className="h-4 w-4 text-amber-600" />
            <span>Kitchen & Cooking</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Gas stoves and tadka/frying generate indoor PM2.5 spikes exceeding 350 µg/m³ plus toxic NO2.
          </p>
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            Action: Close interior kitchen door and run the exhaust fan for 5 minutes after cooking finishes.
          </div>
        </div>

        {/* Bedroom */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Wind className="h-4 w-4 text-emerald-600" />
            <span>Sleep Sanctuary</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Humans spend 8 hours breathing resting lung volumes during nocturnal outdoor pollution build-up.
          </p>
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            Action: Position HEPA purifier 2 feet away from walls at bed-head level; run on silent continuous mode.
          </div>
        </div>

        {/* Living Room */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Sparkles className="h-4 w-4 text-teal-600" />
            <span>Living & Balcony</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            High traffic door openings pull in outdoor dust and vehicle exhaust from street frontage.
          </p>
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            Action: Ventilate only between 13:00 and 15:30 when solar mixing height disperses surface pollutants.
          </div>
        </div>
      </div>

      {/* Houseplant Clarification Alert */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 dark:text-white block mb-0.5">
            Scientific Clarification on Houseplants:
          </strong>
          While potted plants (Snake plant, Areca palm) offer psychological calm and modest VOC absorption, scientific peer reviews prove they <strong>cannot filter microscopic PM2.5 soot</strong> from an entire room. Do not substitute houseplants for mechanical filtration or draft-proofing.
        </div>
      </div>
    </div>
  );
}
