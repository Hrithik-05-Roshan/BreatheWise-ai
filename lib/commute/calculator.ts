import { CommuteOption, CommuteComparisonResult, TransportMode } from "../types/commute";
import { EMISSION_FACTORS, AVERAGE_SPEED_KMH, COST_PER_KM } from "../constants/mobility";

/**
 * Compares multi-modal commute options (Metro/Bus, Bicycle, Walking, Two-Wheeler, Solo Car)
 * across estimated respiratory exposure, carbon footprint, transit time, and financial cost.
 *
 * @param origin - Origin location name or coordinate string
 * @param destination - Destination location name or coordinate string
 * @param distanceKm - One-way travel distance in kilometers
 * @param currentAqi - Real-time Air Quality Index of the travel corridor
 * @returns Comprehensive CommuteComparisonResult including mode-by-mode comparisons and sustainability savings
 */
export function compareCommuteOptions(
  origin: string,
  destination: string,
  distanceKm: number,
  currentAqi: number
): CommuteComparisonResult {
  const isSevere = currentAqi > 300;
  const isPoorOrWorse = currentAqi > 200;

  const options: CommuteOption[] = [
    {
      mode: "public_transport",
      title: "Public Transit (Metro / AC Bus)",
      iconName: "Train",
      durationMinutes: Math.round((distanceKm / AVERAGE_SPEED_KMH.public_transport) * 60) + 8, // +8 min walking/transfer
      estimatedExposureLevel: "Low",
      exposureExplanation: "Underground and sealed AC transit systems filter particulate matter via central HVAC and bypass direct road-level exhaust clouds.",
      emissionsKgCO2: Math.round(distanceKm * EMISSION_FACTORS.public_transport * 100) / 100,
      costInr: Math.round(distanceKm * COST_PER_KM.public_transport + 10),
      healthRecommendation: "Optimal choice during high smog. Provides physical isolation from street-level tailpipe plumes.",
      isRecommendedToday: isPoorOrWorse || distanceKm > 4,
      advisoryNote: "Wear a mask while waiting on above-ground open platforms.",
    },
    {
      mode: "bicycle",
      title: "Bicycle / Active Mobility",
      iconName: "Bike",
      durationMinutes: Math.round((distanceKm / AVERAGE_SPEED_KMH.bicycle) * 60),
      estimatedExposureLevel: isSevere ? "Very High" : isPoorOrWorse ? "High" : "Moderate",
      exposureExplanation: "Aerobic exertion increases minute ventilation from 6 L/min to 40-60 L/min, dramatically accelerating particle deposition in lungs.",
      emissionsKgCO2: 0,
      costInr: 0,
      healthRecommendation: isPoorOrWorse
        ? "NOT recommended when AQI > 200. Heavy respiration significantly increases toxic pulmonary deposition."
        : "Excellent cardiovascular option when AQI is satisfactory. Use dedicated bike lanes away from heavy diesel corridors.",
      isRecommendedToday: !isPoorOrWorse && distanceKm <= 8,
      advisoryNote: isPoorOrWorse ? "High physiological toxic intake warning" : undefined,
    },
    {
      mode: "walking",
      title: "Pedestrian Walk",
      iconName: "Footprints",
      durationMinutes: Math.round((distanceKm / AVERAGE_SPEED_KMH.walking) * 60),
      estimatedExposureLevel: isSevere ? "Very High" : isPoorOrWorse ? "High" : "Moderate",
      exposureExplanation: "Continuous pedestrian exposure along unpaved sidewalks and congested intersections subjects you to direct road resuspension dust.",
      emissionsKgCO2: 0,
      costInr: 0,
      healthRecommendation: distanceKm > 3 || isPoorOrWorse
        ? "Limit walking distance during high pollution. Avoid main arterial avenues with standing traffic."
        : "Suitable for short local trips under 1.5 km when wearing a protective N95 mask.",
      isRecommendedToday: !isPoorOrWorse && distanceKm <= 2,
    },
    {
      mode: "two_wheeler",
      title: "Two-Wheeler (Motorcycle / Scooter)",
      iconName: "Motorcycle",
      durationMinutes: Math.round((distanceKm / AVERAGE_SPEED_KMH.two_wheeler) * 60),
      estimatedExposureLevel: isSevere ? "Very High" : "High",
      exposureExplanation: "Riders sit directly in the turbulence wake of preceding bus and diesel truck exhaust pipes at ground level.",
      emissionsKgCO2: Math.round(distanceKm * EMISSION_FACTORS.two_wheeler * 100) / 100,
      costInr: Math.round(distanceKm * COST_PER_KM.two_wheeler),
      healthRecommendation: "High tailpipe proximity. Mandatory requirement: wear a tight-fitting N95 respirator under your helmet visor.",
      isRecommendedToday: false,
      advisoryNote: "Always keep visor pulled down to shield eyes and mucosal tissue from coarse PM10 soot.",
    },
    {
      mode: "car",
      title: "Private Car (Cabin Recirculation)",
      iconName: "Car",
      durationMinutes: Math.round((distanceKm / AVERAGE_SPEED_KMH.car) * 60) + 5,
      estimatedExposureLevel: "Moderate",
      exposureExplanation: "Enclosed cabin with internal air recirculation reduces ambient particulate penetration by up to 75% compared to open air.",
      emissionsKgCO2: Math.round(distanceKm * EMISSION_FACTORS.car * 100) / 100,
      costInr: Math.round(distanceKm * COST_PER_KM.car + 40),
      healthRecommendation: "Relatively low exposure if cabin filter is clean and recirculating mode is active. However, produces the highest carbon emissions.",
      isRecommendedToday: false,
      advisoryNote: "High emissions penalty. Consider carpooling to avoid solo-driver traffic congestion.",
    },
  ];

  // Determine primary recommendation
  let primaryRecommendation: TransportMode = "public_transport";
  let summaryReason = "Public Transit (Metro / Electric bus) balances personal lung protection with minimal environmental carbon impact.";

  if (!isPoorOrWorse && distanceKm <= 3) {
    primaryRecommendation = "bicycle";
    summaryReason = `Air quality is satisfactory (AQI ${currentAqi}) and distance is short (${distanceKm} km), making active zero-emission transit safe and healthy.`;
  } else if (isSevere) {
    primaryRecommendation = "public_transport";
    summaryReason = `At severe AQI (${currentAqi}), public transit (especially underground metro) significantly shields your respiratory system from direct street pollution.`;
  }

  return {
    origin,
    destination,
    distanceKm,
    currentAqi,
    options,
    primaryRecommendation,
    summaryReason,
    disclaimer: "Estimated route exposure represents ambient atmospheric modeling and does not replace continuous personal sensor dosimetry.",
  };
}
