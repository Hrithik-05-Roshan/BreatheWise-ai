import { CPCB_BREAKPOINTS, CPCB_STANDARDS } from "./constants";
import { AQICategoryType, PollutantMeasurement } from "../types/air-quality";
import { UserProfile } from "../types/profile";
import { getAqiCategory } from "../utils";

export interface PersonalizedVulnerabilityResult {
  vulnerabilityScore: number;
  factors: string[];
}

/**
 * Calculates a personalized vulnerability index (0-100) and identifies contributing risk factors
 * based on household composition, commute exertion, and indoor environment.
 *
 * @param profile - Complete user profile including household, commute, and indoor parameters
 * @returns Object containing numerical vulnerability score (clamped to 100) and descriptive risk factors
 */
export function calculatePersonalizedVulnerability(profile: UserProfile): PersonalizedVulnerabilityResult {
  let vulnerabilityScore = 40; // baseline
  const factors: string[] = [];

  if (profile.household === "family_children") {
    vulnerabilityScore += 30;
    factors.push("Pediatric lung development vulnerability");
  } else if (profile.household === "household_seniors") {
    vulnerabilityScore += 30;
    factors.push("Senior cardiovascular & respiratory sensitivity");
  }

  if (profile.commuteMethod === "bicycle" || profile.commuteMethod === "walking") {
    vulnerabilityScore += 25;
    factors.push(`Active exertion during commute (${profile.commuteDistanceKm} km)`);
  } else if (profile.commuteMethod === "two_wheeler") {
    vulnerabilityScore += 20;
    factors.push("Open roadside tailpipe proximity");
  }

  if (!profile.indoorEnvironment.hasAirPurifier) {
    vulnerabilityScore += 15;
    factors.push("No active indoor HEPA filtration");
  }

  return {
    vulnerabilityScore: Math.min(100, vulnerabilityScore),
    factors,
  };
}

/**
 * Calculates Sub-index for a given pollutant according to Indian CPCB Linear Interpolation.
 * Formula: I = I_lo + ((I_hi - I_lo) / (B_hi - B_lo)) * (Cp - B_lo)
 *
 * @param concentration - Numerical concentration value in ambient air (e.g. µg/m³ or mg/m³)
 * @param breakpoints - Array of CPCB breakpoint objects containing lower and upper boundaries
 * @returns Computed integer sub-index (0-500)
 */
export function calculateSubIndex(
  concentration: number,
  breakpoints: typeof CPCB_BREAKPOINTS.pm25
): number {
  if (concentration <= 0) return 0;
  
  // Find matching breakpoint
  for (const bp of breakpoints) {
    if (concentration >= bp.bLo && concentration <= bp.bHi) {
      const index = bp.iLo + ((bp.iHi - bp.iLo) / (bp.bHi - bp.bLo)) * (concentration - bp.bLo);
      return Math.round(index);
    }
  }

  // Beyond maximum scale breakpoint -> Severe 500
  return 500;
}

/**
 * Normalizes raw sensor readings into a typed PollutantMeasurement structure
 * including standard statutory limits and regulatory ratio.
 *
 * @param pollutant - Pollutant key ('pm25', 'pm10', 'no2', 'so2', 'co', 'o3')
 * @param value - Measured atmospheric concentration
 * @param unit - Display unit (defaults to 'µg/m³')
 * @returns Structured PollutantMeasurement object with category and exceedance ratio
 */
export function buildPollutantMeasurement(
  pollutant: "pm25" | "pm10" | "no2" | "so2" | "co" | "o3",
  value: number,
  unit: string = "µg/m³"
): PollutantMeasurement {
  const safeVal = Math.max(0, Number(value) || 0);
  let category: AQICategoryType = "good";
  
  if (pollutant === "pm25") {
    const subIdx = calculateSubIndex(safeVal, CPCB_BREAKPOINTS.pm25);
    category = getAqiCategory(subIdx).category;
  } else if (pollutant === "pm10") {
    const subIdx = calculateSubIndex(safeVal, CPCB_BREAKPOINTS.pm10);
    category = getAqiCategory(subIdx).category;
  } else {
    const limit = CPCB_STANDARDS[pollutant] || 100;
    if (safeVal > limit * 2) category = "veryPoor";
    else if (safeVal > limit) category = "moderate";
    else category = "good";
  }

  const standardLimit = CPCB_STANDARDS[pollutant] || 100;
  const ratio = Math.round((safeVal / standardLimit) * 100) / 100;

  return {
    value: Math.round(safeVal * 10) / 10,
    unit,
    category,
    standardLimit,
    ratioOfStandard: ratio,
  };
}

/**
 * Calculates overall National Air Quality Index (NAQI) using the maximum sub-index method
 * between critical respirable particulate indicators (PM2.5 and PM10).
 *
 * @param pm25Val - 24-hour average PM2.5 concentration in µg/m³
 * @param pm10Val - 24-hour average PM10 concentration in µg/m³
 * @returns Object containing overall AQI number and identified predominant pollutant
 */
export function calculateOverallAQI(pm25Val: number, pm10Val: number): {
  aqi: number;
  mainPollutant: "PM2.5" | "PM10";
} {
  const pm25SubIndex = calculateSubIndex(pm25Val, CPCB_BREAKPOINTS.pm25);
  const pm10SubIndex = calculateSubIndex(pm10Val, CPCB_BREAKPOINTS.pm10);

  if (pm25SubIndex >= pm10SubIndex) {
    return { aqi: pm25SubIndex, mainPollutant: "PM2.5" };
  } else {
    return { aqi: pm10SubIndex, mainPollutant: "PM10" };
  }
}
