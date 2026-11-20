import { describe, it, expect } from "vitest";
import { generatePersonalizedRecommendations, buildDiurnalPlan } from "@/lib/recommendations/engine";
import { RecommendationContext } from "@/lib/types/recommendations";

describe("Recommendation Engine & Personalization Rules", () => {
  const baseContext: RecommendationContext = {
    aqi: 320, // Severe
    pm25: 180,
    pm10: 290,
    city: "Delhi",
    household: "family_children",
    lifestyle: "office_commuter",
    commuteMethod: "bicycle",
    commuteDistanceKm: 8,
    hasAirPurifier: false,
    windowsOpen: true,
    cookingFuel: "lpg",
    budgetPreference: "low_cost",
  };

  it("should recommend switching from bicycle commute to enclosed transit during high smog", () => {
    const recs = generatePersonalizedRecommendations(baseContext);
    const commuteRec = recs.find((r) => r.id === "commute-switch-transit");

    expect(commuteRec).toBeDefined();
    expect(commuteRec?.priorityScore).toBe(10);
    expect(commuteRec?.domain).toBe("commute");
    expect(commuteRec?.whatToDo.toLowerCase()).toContain("take metro or an enclosed ac bus");
  });

  it("should prioritize children vulnerability protections when children are in household", () => {
    const recs = generatePersonalizedRecommendations(baseContext);
    const childRec = recs.find((r) => r.id === "household-vulnerable-protection");

    expect(childRec).toBeDefined();
    expect(childRec?.priorityScore).toBe(10);
    expect(childRec?.whatToDo).toContain("playground play");
  });

  it("should recommend zero-cost clean room buffer sealing when no air purifier is owned", () => {
    const recs = generatePersonalizedRecommendations(baseContext);
    const cleanRoomRec = recs.find((r) => r.id === "indoor-diy-purification");

    expect(cleanRoomRec).toBeDefined();
    expect(cleanRoomRec?.cost).toBe("free");
    expect(cleanRoomRec?.whatToDo).toContain("seal door bottom gaps");
  });

  it("should recommend continuous HEPA operation when purifier is present", () => {
    const contextWithPurifier: RecommendationContext = {
      ...baseContext,
      hasAirPurifier: true,
    };
    const recs = generatePersonalizedRecommendations(contextWithPurifier);
    const hepaRec = recs.find((r) => r.id === "indoor-hepa-continuous-run");

    expect(hepaRec).toBeDefined();
    expect(hepaRec?.title).toContain("HEPA Purifier");
    expect(hepaRec?.whatToDo).toContain("Position your purifier");
  });

  it("should generate 4 diurnal plan windows (morning, afternoon, evening, night)", () => {
    const recs = generatePersonalizedRecommendations(baseContext);
    const diurnal = buildDiurnalPlan(recs, baseContext.aqi);

    expect(diurnal).toHaveLength(4);
    expect(diurnal.map((d) => d.timeSlot)).toEqual(["morning", "afternoon", "evening", "night"]);
    expect(diurnal[0].recommendations.length).toBeGreaterThan(0);
  });
});
