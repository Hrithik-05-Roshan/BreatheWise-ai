import { Recommendation, RecommendationContext, DailyPlanSlot } from "../types/recommendations";

/**
 * Deterministic rules that evaluate environmental, household, and lifestyle context
 */
export function generatePersonalizedRecommendations(ctx: RecommendationContext): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const isSevere = ctx.aqi > 300;
  const isVeryPoor = ctx.aqi > 200;
  const isPoorOrWorse = ctx.aqi > 100;

  // 1. COMMUTE RECOMMENDATIONS
  if (ctx.commuteMethod === "bicycle" || ctx.commuteMethod === "walking") {
    if (isVeryPoor) {
      recommendations.push({
        id: "commute-switch-transit",
        title: "Switch Outdoor Commute to Enclosed Public Transit",
        whatToDo: `Pause your regular ${ctx.commuteMethod} commute today and take metro or an enclosed AC bus.`,
        whyItMatters: `At an AQI of ${ctx.aqi}, deep lung inhalation during active transit delivers up to 4.2x more micro-particulates directly to pulmonary alveoli.`,
        whenToDoIt: "morning",
        expectedBenefit: "Reduces peak respiratory toxic load by 60-75%",
        difficulty: "easy",
        cost: "low",
        environmentalImpact: "Still maintains low per-capita transit footprint without personal car usage",
        supportingData: `CPCB & WHO guidelines advise against vigorous aerobic transit at PM2.5 > 120 µg/m³.`,
        domain: "commute",
        priorityScore: 10,
        tags: ["commute", "exposure-reduction", "high-priority"],
      });
    } else {
      recommendations.push({
        id: "commute-mask-bicycle",
        title: "Wear N95/FFP2 Respirator with Exhalation Valve",
        whatToDo: `Wear a certified particulate respirator during your ${ctx.commuteMethod} commute.`,
        whyItMatters: "Filters out over 95% of fine toxic particles without restricting airflow during moderate exertion.",
        whenToDoIt: "morning",
        expectedBenefit: "Blocks PM2.5 inhalation while preserving your active commute routine",
        difficulty: "easy",
        cost: "low",
        environmentalImpact: "Zero direct greenhouse gas emissions",
        supportingData: "Studies show fitted N95 masks reduce particulate absorption by up to 94%.",
        domain: "commute",
        priorityScore: 7,
        tags: ["commute", "protection"],
      });
    }
  } else if (ctx.commuteMethod === "two_wheeler") {
    recommendations.push({
      id: "commute-two-wheeler-n95",
      title: "Wear High-Grade N95 Mask Under Helmet",
      whatToDo: "Do not rely on standard fabric scarfs or bandanas; use a snug-fit certified N95 respirator.",
      whyItMatters: "Cotton handkerchiefs and scarfs filter less than 15% of dangerous PM2.5 nanoparticles.",
      whenToDoIt: "morning",
      expectedBenefit: "Cuts toxic combustion particle intake from direct road tailpipes",
      difficulty: "easy",
      cost: "low",
      environmentalImpact: "Ensures personal safety without shifting to a high-emission solo vehicle",
      supportingData: "Motorcyclists in urban traffic face up to 3x higher PM2.5 concentrations than enclosed car passengers.",
      domain: "commute",
      priorityScore: 9,
      tags: ["commute", "two-wheeler"],
    });
  } else if (ctx.commuteMethod === "car") {
    recommendations.push({
      id: "commute-recirculate-cabin",
      title: "Activate Cabin Air Recirculation & Consider Carpooling",
      whatToDo: "Set AC to internal recirculation mode and offer a ride to a colleague.",
      whyItMatters: "Prevents drawing exhaust fumes from preceding heavy vehicles directly into your cabin.",
      whenToDoIt: "all_day",
      expectedBenefit: "Lowers in-cabin PM2.5 by 50-80% and reduces road congestion emissions",
      difficulty: "easy",
      cost: "free",
      environmentalImpact: "Saves ~3.4 kg CO2 per passenger shared trip",
      supportingData: "Internal recirculation cuts interior ultrafine particle concentration by up to 80% within 10 minutes.",
      domain: "commute",
      priorityScore: 8,
      tags: ["commute", "car", "emissions-reduction"],
    });
  }

  // 2. HOUSEHOLD & VULNERABILITY RULES
  if (ctx.household === "family_children" || ctx.household === "household_seniors") {
    const vulnerableGroup = ctx.household === "family_children" ? "children" : "senior family members";
    if (isPoorOrWorse) {
      recommendations.push({
        id: "household-vulnerable-protection",
        title: `Protect ${vulnerableGroup.charAt(0).toUpperCase() + vulnerableGroup.slice(1)}: Move Activities Indoors`,
        whatToDo: `Cancel outdoor playground play, garden walks, and early morning terrace strolls today.`,
        whyItMatters: `${vulnerableGroup.charAt(0).toUpperCase() + vulnerableGroup.slice(1)} possess higher respiratory rates per kg of body weight, increasing systemic vulnerability to PM2.5.`,
        whenToDoIt: "morning",
        expectedBenefit: "Prevents acute asthma flare-ups, bronchitis, and cardiovascular strain",
        difficulty: "easy",
        cost: "free",
        environmentalImpact: "Encourages low-energy indoor family activities",
        supportingData: `Pediatric exposure studies show childhood lung function deficits increase steeply at AQI > 150.`,
        domain: "outdoor",
        priorityScore: 10,
        tags: ["vulnerable", "children", "seniors", "critical"],
      });
    }
  }

  // 3. INDOOR AIR & PURIFIER GUIDANCE
  if (!ctx.hasAirPurifier) {
    recommendations.push({
      id: "indoor-diy-purification",
      title: "Create a Clean Room Zone (Low-Cost Solution)",
      whatToDo: "Select one frequently occupied bedroom, seal door bottom gaps with draft stoppers or a damp towel, and keep windows firmly closed during peak morning pollution.",
      whyItMatters: "Houseplants alone cannot clean room air volumes. Creating a sealed buffer room cuts particulate settling by 40%.",
      whenToDoIt: "morning",
      expectedBenefit: "Reduces nocturnal particle accumulation in sleep zones",
      difficulty: "easy",
      cost: "free",
      environmentalImpact: "Zero electricity consumption",
      supportingData: "Targeted single-room sealing reduces natural ventilation leakage by up to 45% during atmospheric inversion.",
      domain: "indoor",
      priorityScore: 8,
      tags: ["indoor", "budget-friendly", "clean-room"],
    });
  } else {
    recommendations.push({
      id: "indoor-hepa-continuous-run",
      title: "Run HEPA Purifier in Continuous Auto Mode",
      whatToDo: "Position your purifier at least 2 feet away from walls and avoid running exhaust fans simultaneously in the same room.",
      whyItMatters: "Running exhaust fans creates negative pressure, pulling in unfiltered outdoor smog through window crevices.",
      whenToDoIt: "all_day",
      expectedBenefit: "Maintains indoor PM2.5 levels below 15 µg/m³",
      difficulty: "easy",
      cost: "low",
      environmentalImpact: "Modern BLDC purifiers use less than 35W (similar to a standard LED lamp)",
      supportingData: "Properly positioned HEPA filtration achieves >99% particulate clearance in sealed residential rooms.",
      domain: "indoor",
      priorityScore: 9,
      tags: ["indoor", "hepa"],
    });
  }

  // 4. VENTILATION & COOKING HABITS
  if (ctx.cookingFuel === "lpg" || ctx.cookingFuel === "biomass_wood") {
    recommendations.push({
      id: "indoor-cooking-ventilation",
      title: "Isolate Kitchen & Run Exhaust During Cooking Only",
      whatToDo: "Close the interior kitchen door during frying or boiling to prevent VOCs and nitrogen oxides from migrating into bedrooms.",
      whyItMatters: "Cooking without kitchen isolation can generate PM2.5 spikes exceeding 400 µg/m³ inside living spaces.",
      whenToDoIt: "evening",
      expectedBenefit: "Prevents indoor pollution spikes that double overall daily exposure",
      difficulty: "easy",
      cost: "free",
      environmentalImpact: "Eliminates need for extra post-cooking air purification cycles",
      supportingData: "Indoor combustion emissions are responsible for up to 35% of total household toxic particulate exposure.",
      domain: "indoor",
      priorityScore: 8,
      tags: ["indoor", "cooking"],
    });
  }

  // 5. FITNESS & OUTDOOR WORKOUTS
  if (ctx.lifestyle === "fitness_enthusiast") {
    if (isPoorOrWorse) {
      recommendations.push({
        id: "fitness-shift-indoor-hiit",
        title: "Replace Outdoor Run with Indoor Bodyweight / Yoga Session",
        whatToDo: "Do not run or cycle outdoors between 6:00 AM and 9:30 AM when ground-level particulate concentration is highest.",
        whyItMatters: "During strenuous cardio, breath volume rises from 6 L/min to 60+ L/min, driving particulate matter 10x deeper into vascular tissue.",
        whenToDoIt: "morning",
        expectedBenefit: "Preserves cardiovascular fitness while eliminating heavy arterial inflammation",
        difficulty: "medium",
        cost: "free",
        environmentalImpact: "Zero carbon footprint",
        supportingData: "Cardiovascular biomarkers show acute endothelial irritation following 30 minutes of running in AQI > 180.",
        domain: "health_routine",
        priorityScore: 9,
        tags: ["fitness", "routine"],
      });
    }
  }

  // 6. SUSTAINABILITY & COMMUNITY ACTION
  recommendations.push({
    id: "sustainability-trip-chaining",
    title: "Trip Chaining: Combine 3 Errands Into One Single Route",
    whatToDo: "Consolidate grocery pickups, pharmacy visits, and errands into a single afternoon route rather than multiple independent trips.",
    whyItMatters: "Cold vehicle engine starts produce 4x higher emissions per kilometer than an engine operating at optimal temperature.",
    whenToDoIt: "afternoon",
    expectedBenefit: "Saves ~1.8 kg CO2 and reduces vehicle wear",
    difficulty: "easy",
    cost: "free",
    environmentalImpact: "Reduces urban road congestion and localized neighborhood emissions",
    supportingData: "EPA and IIT studies show trip chaining reduces localized hydrocarbon exhaust by up to 32%.",
    domain: "sustainability",
    priorityScore: 6,
    tags: ["sustainability", "eco-action"],
  });

  // Sort by priority score descending
  return recommendations.sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Groups recommendations into four distinct diurnal time slots
 */
export function buildDiurnalPlan(recs: Recommendation[], currentAqi: number): DailyPlanSlot[] {
  return [
    {
      timeSlot: "morning",
      label: "Morning (06:00 - 11:00)",
      timeRange: "Peak Ground Inversion",
      expectedAqiRange: `${Math.round(currentAqi * 1.15)} - ${Math.round(currentAqi * 1.3)}`,
      conditionSummary: "Atmospheric thermal inversion traps tailpipe emissions and biomass smoke close to street level.",
      recommendations: recs.filter((r) => r.whenToDoIt === "morning" || r.whenToDoIt === "all_day").slice(0, 3),
    },
    {
      timeSlot: "afternoon",
      label: "Afternoon (11:00 - 16:00)",
      timeRange: "Optimal Dispersion Window",
      expectedAqiRange: `${Math.round(currentAqi * 0.75)} - ${Math.round(currentAqi * 0.9)}`,
      conditionSummary: "Solar heating expands the atmospheric boundary layer, improving vertical ventilation and lower ambient PM2.5.",
      recommendations: recs.filter((r) => r.whenToDoIt === "afternoon" || r.whenToDoIt === "all_day").slice(0, 2),
    },
    {
      timeSlot: "evening",
      label: "Evening (16:00 - 20:00)",
      timeRange: "Evening Traffic Rush",
      expectedAqiRange: `${Math.round(currentAqi * 1.1)} - ${Math.round(currentAqi * 1.25)}`,
      conditionSummary: "Peak traffic emissions combine with cooling evening ground temperatures, raising localized NO2 and particulate levels.",
      recommendations: recs.filter((r) => r.whenToDoIt === "evening" || r.whenToDoIt === "all_day").slice(0, 2),
    },
    {
      timeSlot: "night",
      label: "Night (20:00 - 06:00)",
      timeRange: "Rest & Recovery Zone",
      expectedAqiRange: `${Math.round(currentAqi * 0.95)} - ${Math.round(currentAqi * 1.1)}`,
      conditionSummary: "Heavy commercial freight movement occurs along arterial corridors. Keep sleeping quarters sealed and purified.",
      recommendations: recs.filter((r) => r.whenToDoIt === "night" || r.whenToDoIt === "all_day").slice(0, 2),
    },
  ];
}
