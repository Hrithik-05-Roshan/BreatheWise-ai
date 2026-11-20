"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserProfile,
  HouseholdType,
  LifestyleType,
  CommuteMethod,
  CookingFuel,
  SustainabilityPriority,
} from "@/lib/types/profile";
import { INDIAN_CITY_PRESETS } from "@/lib/air-quality/constants";

export const LOCAL_STORAGE_PROFILE_KEY = "breathewise_user_profile";

export function useOnboardingForm() {
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
  const [sustainabilityPriorities, setSustainabilityPriorities] = useState<SustainabilityPriority[]>([
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
          if (p.preferences.sustainabilityPriorities) {
            setSustainabilityPriorities(p.preferences.sustainabilityPriorities);
          }
          setBudgetPreference(p.preferences.budgetPreference);
        }
      }
    } catch (e) {
      console.warn("Failed to read stored profile", e);
    }
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
        sustainabilityPriorities,
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

  return {
    step,
    totalSteps,
    progressPercent,
    nextStep,
    prevStep,
    handleFinish,
    skipToDashboard: () => router.push("/dashboard"),
    // Form fields & setters
    city,
    setCity,
    locality,
    setLocality,
    customCity,
    setCustomCity,
    household,
    setHousehold,
    lifestyle,
    setLifestyle,
    commuteMethod,
    setCommuteMethod,
    commuteDistanceKm,
    setCommuteDistanceKm,
    hasAirPurifier,
    setHasAirPurifier,
    hasIndoorPlants,
    setHasIndoorPlants,
    windowsFrequentlyOpen,
    setWindowsFrequentlyOpen,
    cookingFuel,
    setCookingFuel,
    ventilationQuality,
    setVentilationQuality,
    dailyNotifications,
    setDailyNotifications,
    sustainabilityPriorities,
    setSustainabilityPriorities,
    budgetPreference,
    setBudgetPreference,
  };
}
