"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndoorAirAudit } from "@/components/indoor-air/IndoorAirAudit";
import { UserProfile } from "@/lib/types/profile";

export default function IndoorAirPage() {
  const defaultProfile: UserProfile = {
    id: "default-user",
    city: "Delhi",
    coordinates: { latitude: 28.6139, longitude: 77.2090 },
    household: "family_children",
    lifestyle: "office_commuter",
    commuteMethod: "public_transport",
    commuteDistanceKm: 12,
    indoorEnvironment: {
      hasAirPurifier: false,
      hasIndoorPlants: true,
      windowsFrequentlyOpen: false,
      cookingFuel: "lpg",
      ventilationQuality: "moderate",
    },
    preferences: {
      dailyNotifications: true,
      sustainabilityPriorities: ["low_emissions", "maximum_protection"],
      budgetPreference: "low_cost",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <IndoorAirAudit profile={defaultProfile} />
      </main>
      <Footer />
    </div>
  );
}
