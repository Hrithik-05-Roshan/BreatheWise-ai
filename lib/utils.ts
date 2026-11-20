import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number, decimals: number = 0): string {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function getAqiCategory(aqi: number): {
  label: string;
  category: "good" | "satisfactory" | "moderate" | "poor" | "veryPoor" | "severe";
  colorClass: string;
  bgClass: string;
  badgeBg: string;
  description: string;
  healthAdvisory: string;
} {
  // National Air Quality Index (NAQI) Standard (India - CPCB)
  if (aqi <= 50) {
    return {
      label: "Good",
      category: "good",
      colorClass: "text-emerald-700",
      bgClass: "bg-emerald-50 border-emerald-200",
      badgeBg: "bg-emerald-600 text-white",
      description: "Minimal health impact",
      healthAdvisory: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    };
  } else if (aqi <= 100) {
    return {
      label: "Satisfactory",
      category: "satisfactory",
      colorClass: "text-lime-700",
      bgClass: "bg-lime-50 border-lime-200",
      badgeBg: "bg-lime-600 text-white",
      description: "Minor breathing discomfort to sensitive people",
      healthAdvisory: "Sensitive individuals, including children and seniors with respiratory conditions, should monitor outdoor exertion.",
    };
  } else if (aqi <= 200) {
    return {
      label: "Moderate",
      category: "moderate",
      colorClass: "text-amber-700",
      bgClass: "bg-amber-50 border-amber-200",
      badgeBg: "bg-amber-500 text-white",
      description: "Breathing discomfort to the people with lungs, asthma and heart diseases",
      healthAdvisory: "Vulnerable groups should reduce prolonged outdoor heavy exertion. Healthy individuals can still perform normal activities.",
    };
  } else if (aqi <= 300) {
    return {
      label: "Poor",
      category: "poor",
      colorClass: "text-orange-700",
      bgClass: "bg-orange-50 border-orange-200",
      badgeBg: "bg-orange-600 text-white",
      description: "Breathing discomfort to most people on prolonged exposure",
      healthAdvisory: "Avoid vigorous outdoor workouts during morning and evening rush hours. Keep indoor spaces sealed during peak smog.",
    };
  } else if (aqi <= 400) {
    return {
      label: "Very Poor",
      category: "veryPoor",
      colorClass: "text-red-700",
      bgClass: "bg-red-50 border-red-200",
      badgeBg: "bg-red-600 text-white",
      description: "Respiratory illness on prolonged exposure",
      healthAdvisory: "Substantially reduce outdoor exposure. Wear N95/FFP2 masks when outdoors. Operate HEPA air purifiers indoors.",
    };
  } else {
    return {
      label: "Severe",
      category: "severe",
      colorClass: "text-rose-950",
      bgClass: "bg-rose-100 border-rose-400",
      badgeBg: "bg-rose-900 text-white",
      description: "Affects healthy people and seriously impacts those with existing diseases",
      healthAdvisory: "EMERGENCY: Avoid all outdoor exertion. Keep all windows shut. Run indoor air filtration continuously. High vulnerability for children and seniors.",
    };
  }
}
