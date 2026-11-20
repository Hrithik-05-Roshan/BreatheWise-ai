import { describe, it, expect } from "vitest";
import { compareCommuteOptions } from "@/lib/commute/calculator";

describe("Smart Commute Assistant & Emissions Calculations", () => {
  it("should calculate zero emissions for bicycle and walking", () => {
    const result = compareCommuteOptions("Home", "Office", 10, 80);
    const bikeOption = result.options.find((o) => o.mode === "bicycle");
    const walkOption = result.options.find((o) => o.mode === "walking");

    expect(bikeOption?.emissionsKgCO2).toBe(0);
    expect(walkOption?.emissionsKgCO2).toBe(0);
  });

  it("should calculate realistic carbon emissions for car vs metro using CEA factors", () => {
    const distanceKm = 15;
    const result = compareCommuteOptions("Home", "Office", distanceKm, 150);
    const carOption = result.options.find((o) => o.mode === "car");
    const metroOption = result.options.find((o) => o.mode === "public_transport");

    // Solo car: ~0.165 kg/km -> ~2.48 kg
    expect(carOption?.emissionsKgCO2).toBeCloseTo(2.48, 1);
    // Metro: ~0.015 kg/km -> ~0.22 kg
    expect(metroOption?.emissionsKgCO2).toBeCloseTo(0.23, 1);
    // Metro emissions should be less than 15% of car emissions
    expect(metroOption!.emissionsKgCO2).toBeLessThan(carOption!.emissionsKgCO2 * 0.15);
  });

  it("should advise against active outdoor cycling during severe smog (AQI > 200)", () => {
    const result = compareCommuteOptions("Home", "Office", 6, 280);
    const bikeOption = result.options.find((o) => o.mode === "bicycle");

    expect(bikeOption?.estimatedExposureLevel).toBe("High");
    expect(bikeOption?.isRecommendedToday).toBe(false);
    expect(bikeOption?.healthRecommendation).toContain("NOT recommended when AQI > 200");
  });

  it("should select Public Transit as primary recommendation during high smog", () => {
    const result = compareCommuteOptions("Home", "Office", 12, 310);
    expect(result.primaryRecommendation).toBe("public_transport");
  });
});
