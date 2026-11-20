"use client";

import React, { useState } from "react";
import { Users, Award, Share2, Sparkles, Trophy, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CommunityHub({ city }: { city: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(
          `Checked today's air quality on BreatheWise AI in ${city}. Taking smart commute alternatives and protecting indoor air! https://breathewise.ai`
        )
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch((err) => {
          console.warn("Clipboard share failed:", err);
        });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-emerald-600" />
            Community Air Quality Awareness
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            {city} Neighborhood Clean Air Action
          </h3>
        </div>
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400"
        >
          <Share2 className="h-3.5 w-3.5" />
          {copied ? "Air Card Copied!" : "Share Daily Air Card"}
        </Button>
      </div>

      {/* Community Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 block">Active Commuters in {city}</span>
          <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 block">
            1,482
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Switched to Metro this week</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 block">Total Neighborhood CO2 Avoided</span>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
            3,840 <span className="text-sm font-normal text-slate-400">kg</span>
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 block font-medium">
            Equivalent to 192 urban saplings
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 block">Clean Rooms Draft-Proofed</span>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
            847
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Children & seniors shielded</span>
        </div>
      </div>

      {/* Community Challenge of the Week */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Trophy className="h-4 w-4" /> Challenge of the Week
          </span>
          <Badge className="bg-emerald-600/80 text-white text-[10px]">
            Active: 4 Days Left
          </Badge>
        </div>
        <h4 className="text-base font-bold">The &ldquo;Zero Solo-Car Thursday&rdquo; Initiative</h4>
        <p className="text-xs text-emerald-100 leading-relaxed max-w-xl">
          Commit to using the Metro, walking short trips under 1 km, or sharing a cab with a coworker on Thursday to cut ground-level street emissions during the morning rush.
        </p>
      </div>

      <div className="text-[11px] text-slate-400 italic">
        * Community metrics aggregate anonymized local habit completions to foster collective urban civic action. Individual household identities remain strictly private.
      </div>
    </div>
  );
}
