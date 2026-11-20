"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { UserProfile } from "@/lib/types/profile";
import { AirQualityData } from "@/lib/types/air-quality";
import { Recommendation, DailyPlanSlot } from "@/lib/types/recommendations";
import { INDIAN_CITY_PRESETS } from "@/lib/air-quality/constants";
import { generateDemonstrationData } from "@/lib/air-quality/service";
import { generatePersonalizedRecommendations, buildDiurnalPlan } from "@/lib/recommendations/engine";
import { DEFAULT_SUSTAINABLE_ACTIONS, calculateImpactSummary } from "@/lib/impact/tracker";
import { LOCAL_STORAGE_PROFILE_KEY } from "@/components/onboarding/OnboardingWizard";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar, DashboardTab } from "@/components/layout/Sidebar";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { DailyPlanTab } from "@/components/dashboard/DailyPlanTab";
import { ChatInterface } from "@/components/assistant/ChatInterface";
import { CommuteComparison } from "@/components/commute/CommuteComparison";
import { IndoorAirAudit } from "@/components/indoor-air/IndoorAirAudit";
import { SustainableActionsList } from "@/components/sustainability/SustainableActionsList";
import { CommunityHub } from "@/components/community/CommunityHub";
import { ImpactSummary } from "@/components/dashboard/ImpactSummary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  MapPin,
  RefreshCw,
  Bot,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const urlCity = searchParams.get("city") || "";

  // State
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [city, setCity] = useState(urlCity || "Delhi");
  const [loading, setLoading] = useState(false);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [diurnalSlots, setDiurnalSlots] = useState<DailyPlanSlot[]>([]);

  // Default Profile fallback
  const [profile, setProfile] = useState<UserProfile>({
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
  });

  // Load profile from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        setProfile(parsed);
        if (!urlCity && parsed.city) {
          setCity(parsed.city);
        }
      }
    } catch (e) {
      console.warn("Storage reading error", e);
    }
  }, [urlCity]);

  // Fetch or Compute Air Quality & Recommendations
  const loadDashboardData = useCallback(async (selectedCity: string) => {
    setLoading(true);
    try {
      // 1. Fetch Air Quality data via API route with local fallback
      const res = await fetch(`/api/air-quality?city=${encodeURIComponent(selectedCity)}`);
      let aqData: AirQualityData;
      if (res.ok) {
        const json = await res.json();
        aqData = json.data;
      } else {
        const preset = INDIAN_CITY_PRESETS[selectedCity] || INDIAN_CITY_PRESETS["Delhi"];
        aqData = generateDemonstrationData(selectedCity, preset.latitude, preset.longitude);
      }
      setAirQuality(aqData);

      // 2. Generate Deterministic Recommendations based on context
      const recs = generatePersonalizedRecommendations({
        aqi: aqData.aqi,
        pm25: aqData.pollutants.pm25.value,
        pm10: aqData.pollutants.pm10.value,
        city: selectedCity,
        household: profile.household,
        lifestyle: profile.lifestyle,
        commuteMethod: profile.commuteMethod,
        commuteDistanceKm: profile.commuteDistanceKm,
        hasAirPurifier: profile.indoorEnvironment.hasAirPurifier,
        windowsOpen: profile.indoorEnvironment.windowsFrequentlyOpen,
        cookingFuel: profile.indoorEnvironment.cookingFuel,
        budgetPreference: profile.preferences.budgetPreference,
      });

      setRecommendations(recs);
      setDiurnalSlots(buildDiurnalPlan(recs, aqData.aqi));
    } catch (err) {
      console.error("Dashboard data load failure", err);
      const preset = INDIAN_CITY_PRESETS[selectedCity] || INDIAN_CITY_PRESETS["Delhi"];
      const fallbackAq = generateDemonstrationData(selectedCity, preset.latitude, preset.longitude);
      setAirQuality(fallbackAq);
      const recs = generatePersonalizedRecommendations({
        aqi: fallbackAq.aqi,
        pm25: fallbackAq.pollutants.pm25.value,
        pm10: fallbackAq.pollutants.pm10.value,
        city: selectedCity,
        household: profile.household,
        lifestyle: profile.lifestyle,
        commuteMethod: profile.commuteMethod,
        commuteDistanceKm: profile.commuteDistanceKm,
        hasAirPurifier: profile.indoorEnvironment.hasAirPurifier,
        windowsOpen: profile.indoorEnvironment.windowsFrequentlyOpen,
        cookingFuel: profile.indoorEnvironment.cookingFuel,
        budgetPreference: profile.preferences.budgetPreference,
      });
      setRecommendations(recs);
      setDiurnalSlots(buildDiurnalPlan(recs, fallbackAq.aqi));
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    loadDashboardData(city);
  }, [city, loadDashboardData]);

  const impactData = calculateImpactSummary(DEFAULT_SUSTAINABLE_ACTIONS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Responsive Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Command Center Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Top Command Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Active City:
              </span>
              <div className="flex flex-wrap gap-1">
                {Object.keys(INDIAN_CITY_PRESETS).slice(0, 5).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      city === c
                        ? "bg-emerald-700 text-white font-semibold shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadDashboardData(city)}
                disabled={loading}
                className="text-xs flex items-center gap-1.5"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Sync Data</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveTab("assistant")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Bot className="h-4 w-4" />
                <span>Ask BreatheWise AI</span>
              </Button>
            </div>
          </div>

          {/* TAB CONTENT: 1. OVERVIEW */}
          {activeTab === "overview" && airQuality && (
            <OverviewTab
              airQuality={airQuality}
              profile={profile}
              diurnalSlots={diurnalSlots}
              recommendations={recommendations}
              impactData={impactData}
            />
          )}

          {/* TAB CONTENT: 2. MY DAILY PLAN */}
          {activeTab === "daily-plan" && airQuality && (
            <DailyPlanTab
              diurnalSlots={diurnalSlots}
              recommendations={recommendations}
            />
          )}

          {/* TAB CONTENT: 3. INDOOR AIR */}
          {activeTab === "indoor-air" && (
            <div className="animate-fade-in">
              <IndoorAirAudit profile={profile} />
            </div>
          )}

          {/* TAB CONTENT: 4. SMART COMMUTE */}
          {activeTab === "commute" && airQuality && (
            <div className="animate-fade-in">
              <CommuteComparison currentAqi={airQuality.aqi} />
            </div>
          )}

          {/* TAB CONTENT: 5. SUSTAINABILITY */}
          {activeTab === "sustainability" && (
            <div className="animate-fade-in">
              <SustainableActionsList />
            </div>
          )}

          {/* TAB CONTENT: 6. IMPACT TRACKER */}
          {activeTab === "impact" && (
            <div className="space-y-6 animate-fade-in">
              <ImpactSummary data={impactData} />
              <SustainableActionsList />
            </div>
          )}

          {/* TAB CONTENT: 7. AI ASSISTANT */}
          {activeTab === "assistant" && airQuality && (
            <div className="animate-fade-in">
              <ChatInterface profile={profile} airQuality={airQuality} />
            </div>
          )}

          {/* TAB CONTENT: 8. COMMUNITY HUB */}
          {activeTab === "community" && (
            <div className="animate-fade-in">
              <CommunityHub city={city} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
          Loading BreatheWise Command Center...
        </div>
      }
    >
      <DashboardContent />
    </React.Suspense>
  );
}
