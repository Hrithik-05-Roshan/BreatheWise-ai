"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile, HouseholdType, LifestyleType, CommuteMethod, CookingFuel } from "@/lib/types/profile";
import { INDIAN_CITY_PRESETS } from "@/lib/air-quality/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Users,
  Briefcase,
  Bike,
  Home,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const LOCAL_STORAGE_PROFILE_KEY = "breathewise_user_profile";

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [city, setCity] = useState("Delhi");
  const [locality, setLocality] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [household, setHousehold] = useState<HouseholdType>("family_children");
  const [lifestyle, setLifestyle] = useState<LifestyleType>("office_commuter");
  const [commuteMethod, setCommuteMethod] = useState<CommuteMethod>("public_transport");
  const [commuteDistanceKm, setCommuteDistanceKm] = useState(12);

  // Indoor environment
  const [hasAirPurifier, setHasAirPurifier] = useState(false);
  const [hasIndoorPlants, setHasIndoorPlants] = useState(true);
  const [windowsFrequentlyOpen, setWindowsFrequentlyOpen] = useState(false);
  const [cookingFuel, setCookingFuel] = useState<CookingFuel>("lpg");
  const [ventilationQuality, setVentilationQuality] = useState<"good" | "moderate" | "poor">("moderate");

  // Preferences
  const [dailyNotifications, setDailyNotifications] = useState(true);
  const [sustainabilityPriorities, setSustainabilityPriorities] = useState<string[]>([
    "low_emissions",
    "maximum_protection",
  ]);
  const [budgetPreference, setBudgetPreference] = useState<"zero_cost" | "low_cost" | "flexible">("low_cost");

  // Load existing profile from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (saved) {
        const p: UserProfile = JSON.parse(saved);
        if (p.city) setCity(p.city);
        if (p.locality) setLocality(p.locality);
        if (p.household) setHousehold(p.household);
        if (p.lifestyle) setLifestyle(p.lifestyle);
        if (p.commuteMethod) setCommuteMethod(p.commuteMethod);
        if (p.commuteDistanceKm) setCommuteDistanceKm(p.commuteDistanceKm);
        if (p.indoorEnvironment) {
          setHasAirPurifier(p.indoorEnvironment.hasAirPurifier);
          setHasIndoorPlants(p.indoorEnvironment.hasIndoorPlants);
          setWindowsFrequentlyOpen(p.indoorEnvironment.windowsFrequentlyOpen);
          setCookingFuel(p.indoorEnvironment.cookingFuel);
          setVentilationQuality(p.indoorEnvironment.ventilationQuality);
        }
        if (p.preferences) {
          setDailyNotifications(p.preferences.dailyNotifications);
          setBudgetPreference(p.preferences.budgetPreference);
        }
      }
    } catch (e) {
      console.warn("Failed to read stored profile", e);
    }
  }, []);

  const handleFinish = () => {
    const activeCity = customCity.trim() ? customCity.trim() : city;
    const preset = INDIAN_CITY_PRESETS[activeCity] || INDIAN_CITY_PRESETS["Delhi"];

    const profile: UserProfile = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      city: activeCity,
      locality: locality.trim() || undefined,
      coordinates: {
        latitude: preset.latitude,
        longitude: preset.longitude,
      },
      household,
      lifestyle,
      commuteMethod,
      commuteDistanceKm: Number(commuteDistanceKm) || 5,
      indoorEnvironment: {
        hasAirPurifier,
        hasIndoorPlants,
        windowsFrequentlyOpen,
        cookingFuel,
        ventilationQuality,
      },
      preferences: {
        dailyNotifications,
        sustainabilityPriorities: sustainabilityPriorities as any,
        budgetPreference,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.error("Storage error", err);
    }

    router.push(`/dashboard?city=${encodeURIComponent(activeCity)}`);
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-950/5">
      {/* Progress & Step Indicator */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>Step {step} of {totalSteps}</span>
          <span className="text-emerald-700 dark:text-emerald-400">{progressPercent}% Completed</span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* STEP 1: LOCATION */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <MapPin className="h-4 w-4" /> Location Context
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Where is your household located?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Air quality, wind inversion, and regional pollutants vary significantly between geographic zones.
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
              Select City Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.keys(INDIAN_CITY_PRESETS).slice(0, 6).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setCustomCity("");
                  }}
                  className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                    city === c && !customCity
                      ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-600/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label htmlFor="custom-city" className="text-xs font-medium text-slate-500 block mb-1">
                Or enter custom locality / other city
              </label>
              <input
                id="custom-city"
                type="text"
                placeholder="e.g. Asansol, Howrah, Gurugram"
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: HOUSEHOLD PROFILE */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Users className="h-4 w-4" /> Household Vulnerability
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Who lives in your home?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Personalization directly prioritizes health advisories for high-vulnerability respiratory groups.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              {
                id: "individual" as HouseholdType,
                title: "Individual Living Alone",
                desc: "Focus on personal workout routines, commuting exposure, and single room air quality.",
              },
              {
                id: "couple" as HouseholdType,
                title: "Couple / Dual Professional Household",
                desc: "Balanced indoor routines, shared commute scheduling, and household energy optimization.",
              },
              {
                id: "family_children" as HouseholdType,
                title: "Family with Children (High Priority)",
                desc: "Specialized advisories for school commutes, playground play windows, and pediatric lung safety.",
              },
              {
                id: "household_seniors" as HouseholdType,
                title: "Household with Senior Citizens (High Priority)",
                desc: "Cardiovascular and pulmonary protection, indoor morning walking alternatives, and strict sealing.",
              },
              {
                id: "family" as HouseholdType,
                title: "Multi-generation General Family",
                desc: "Comprehensive multi-room air management and community trip chaining.",
              },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setHousehold(item.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  household === item.id
                    ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-600/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                  {item.title}
                  {household === item.id && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: LIFESTYLE */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Briefcase className="h-4 w-4" /> Daily Lifestyle
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is your primary daily routine?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Helps us adjust your diurnal schedule for morning exercises and peak exposure hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "office_commuter" as LifestyleType, title: "Office Commuter", desc: "Daily morning and evening rush hour transit." },
              { id: "remote_worker" as LifestyleType, title: "Work From Home / Remote", desc: "Continuous indoor air quality and mid-day ventilation." },
              { id: "fitness_enthusiast" as LifestyleType, title: "Fitness Enthusiast / Runner", desc: "Cardio timing, outdoor jogging alerts, and indoor alternatives." },
              { id: "student" as LifestyleType, title: "Student (School / University)", desc: "Campus transit, library air quality, and outdoor recreation." },
              { id: "outdoor_worker" as LifestyleType, title: "Outdoor Worker / Field Professional", desc: "Long continuous outdoor exposure protection and hydration." },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setLifestyle(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  lifestyle === item.id
                    ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-600/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: DAILY COMMUTE */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Bike className="h-4 w-4" /> Commute & Mobility
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How do you usually travel?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We calculate respiratory particulate intake versus carbon emissions for your route.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { id: "public_transport" as CommuteMethod, label: "Metro / Bus" },
              { id: "two_wheeler" as CommuteMethod, label: "Two-Wheeler (Bike/Scooter)" },
              { id: "car" as CommuteMethod, label: "Private Car" },
              { id: "bicycle" as CommuteMethod, label: "Bicycle" },
              { id: "walking" as CommuteMethod, label: "Walking" },
              { id: "work_from_home" as CommuteMethod, label: "No Commute (WFH)" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCommuteMethod(item.id)}
                className={`p-3 rounded-xl border text-sm font-medium text-center transition-all ${
                  commuteMethod === item.id
                    ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-600/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              <span>Estimated One-Way Commute Distance:</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{commuteDistanceKm} km</strong>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={commuteDistanceKm}
              onChange={(e) => setCommuteDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* STEP 5: INDOOR ENVIRONMENT */}
      {step === 5 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Home className="h-4 w-4" /> Indoor Environment
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Home Living Conditions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Indoor air is often 2-5x dirtier than outdoor air when closed cooking fumes and incense accumulate.
            </p>
          </div>

          <div className="space-y-4">
            {/* Air Purifier Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white block">Do you own an active HEPA air purifier?</span>
                <span className="text-xs text-slate-500">If no, we will provide proven zero-cost clean room sealing strategies.</span>
              </div>
              <button
                type="button"
                onClick={() => setHasAirPurifier(!hasAirPurifier)}
                className={`h-6 w-11 rounded-full transition-colors relative ${hasAirPurifier ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${hasAirPurifier ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            {/* Cooking Fuel Type */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                Primary Cooking Fuel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "lpg" as CookingFuel, label: "LPG Gas" },
                  { id: "piped_gas" as CookingFuel, label: "Piped Natural Gas" },
                  { id: "electric_induction" as CookingFuel, label: "Induction / Electric" },
                  { id: "biomass_wood" as CookingFuel, label: "Biomass / Solid Fuel" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCookingFuel(item.id)}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      cookingFuel === item.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Window ventilation toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white block">Are windows kept open during morning hours?</span>
                <span className="text-xs text-slate-500">Morning windows allow ground inversion smoke to enter living areas.</span>
              </div>
              <button
                type="button"
                onClick={() => setWindowsFrequentlyOpen(!windowsFrequentlyOpen)}
                className={`h-6 w-11 rounded-full transition-colors relative ${windowsFrequentlyOpen ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${windowsFrequentlyOpen ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: PREFERENCES & BUDGET */}
      {step === 6 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Sliders className="h-4 w-4" /> Priorities & Budget
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recommendation Preferences</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tailor advice to your economic constraints and climate goals.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                Preferred Action Budget
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "zero_cost" as const, label: "Zero-Cost Only", desc: "Sealing, behavior shifts, timing" },
                  { id: "low_cost" as const, label: "Low-Cost ($)", desc: "N95 masks, DIY filters, draft stoppers" },
                  { id: "flexible" as const, label: "Flexible", desc: "HEPA purifiers, smart sensors, transit passes" },
                ].map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => setBudgetPreference(b.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      budgetPreference === b.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-600/20"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="text-sm font-semibold">{b.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{b.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-emerald-500/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Zero Tracking & Local Storage Privacy</span>
              </div>
              <p className="text-emerald-950 dark:text-emerald-300 leading-relaxed">
                Your profile preferences are stored exclusively on your device browser. No sensitive identity information is transmitted or sold.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-xs text-slate-500"
          >
            Skip to Default Dashboard
          </Button>
        )}

        {step < totalSteps ? (
          <Button
            type="button"
            onClick={() => setStep(step + 1)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
          >
            Next Step <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleFinish}
            className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 text-sm font-bold shadow-md shadow-emerald-800/20 px-6"
          >
            <Sparkles className="h-4 w-4" /> Generate My Action Plan
          </Button>
        )}
      </div>
    </div>
  );
}
