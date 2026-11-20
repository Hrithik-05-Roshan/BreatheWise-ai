import { CPCB_BREAKPOINTS, CPCB_STANDARDS } from "./constants";
import { AQICategoryType, PollutantMeasurement } from "../types/air-quality";
import { getAqiCategory } from "../utils";

/**
 * Calculates Sub-index for a pollutant according to Indian CPCB Linear Interpolation
 * I = I_lo + ((I_hi - I_lo) / (B_hi - B_lo)) * (Cp - B_lo)
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
 * Overall AQI is determined by maximum sub-index of critical pollutants as per CPCB NAQI guidelines
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
