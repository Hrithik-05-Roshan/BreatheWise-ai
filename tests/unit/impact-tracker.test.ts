import { describe, it, expect } from "vitest";
import { calculateImpactSummary, DEFAULT_SUSTAINABLE_ACTIONS } from "@/lib/impact/tracker";

describe("Impact Tracker & CEA Baseline Methodology", () => {
  it("should calculate zero CO2 avoided when no actions are completed", () => {
    const summary = calculateImpactSummary(DEFAULT_SUSTAINABLE_ACTIONS, 3);
    expect(summary.totalCo2SavedKg).toBe(0);
    expect(summary.actionsCompletedCount).toBe(0);
    expect(summary.streakDays).toBe(3);
  });

  it("should correctly aggregate carbon savings when actions are completed", () => {
    const completedActions = DEFAULT_SUSTAINABLE_ACTIONS.map((a) => ({
      ...a,
      isCompleted: true,
    }));

    const summary = calculateImpactSummary(completedActions, 5);
    // Total sum of DEFAULT_SUSTAINABLE_ACTIONS: 2.7 + 0.3 + 1.5 + 0.4 + 0.2 = 5.1 kg
    expect(summary.totalCo2SavedKg).toBe(5.1);
    expect(summary.actionsCompletedCount).toBe(5);
    expect(summary.sustainableTripKm).toBeGreaterThan(0);
    expect(summary.estimatedCleanerAirHours).toBeGreaterThan(0);
  });

  it("should generate a 7-day weekly trend with transparent methodology notice", () => {
    const summary = calculateImpactSummary(DEFAULT_SUSTAINABLE_ACTIONS, 4);
    expect(summary.weeklyTrend).toHaveLength(7);
    expect(summary.weeklyTrend[0].day).toBe("Mon");
    expect(summary.weeklyTrend[6].day).toBe("Sun");
    expect(summary.methodologyNote).toContain("Central Electricity Authority");
    expect(summary.methodologyNote).toContain("0.165 kg CO2/km");
  });
});
