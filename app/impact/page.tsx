"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImpactSummary } from "@/components/dashboard/ImpactSummary";
import { SustainableActionsList } from "@/components/sustainability/SustainableActionsList";
import { DEFAULT_SUSTAINABLE_ACTIONS, calculateImpactSummary } from "@/lib/impact/tracker";

export default function ImpactPage() {
  const summary = calculateImpactSummary(DEFAULT_SUSTAINABLE_ACTIONS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
        <ImpactSummary data={summary} />
        <SustainableActionsList />
      </main>
      <Footer />
    </div>
  );
}
