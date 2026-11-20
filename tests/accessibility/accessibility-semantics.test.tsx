import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { Progress } from "@/components/ui/progress";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { getAqiCategory } from "@/lib/utils";

describe("WCAG 2.2 AA Accessibility Semantics", () => {
  it("Progress component should expose accessible progressbar attributes", () => {
    const { getByRole } = render(<Progress value={45} max={100} />);
    const progressbar = getByRole("progressbar");

    expect(progressbar).toBeDefined();
    expect(progressbar.getAttribute("aria-valuenow")).toBe("45");
    expect(progressbar.getAttribute("aria-valuemin")).toBe("0");
    expect(progressbar.getAttribute("aria-valuemax")).toBe("100");
  });

  it("ErrorBoundary should provide role='alert' and aria-live='assertive'", () => {
    const ThrowError = () => {
      throw new Error("Simulated rendering failure");
    };

    // Suppress console.error during expected test error
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { getByRole } = render(
      <ErrorBoundary fallbackMessage="Custom error fallback message">
        <ThrowError />
      </ErrorBoundary>
    );

    const alertBox = getByRole("alert");
    expect(alertBox).toBeDefined();
    expect(alertBox.getAttribute("aria-live")).toBe("assertive");
    expect(alertBox.textContent).toContain("Custom error fallback message");

    spy.mockRestore();
  });

  it("NAQI categories must always provide textual descriptors alongside colors", () => {
    const testAqiValues = [25, 75, 150, 250, 350, 450];
    const expectedLabels = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"];

    testAqiValues.forEach((aqi, idx) => {
      const cat = getAqiCategory(aqi);
      // Non-color verification: Textual label must match exactly
      expect(cat.label).toBe(expectedLabels[idx]);
      expect(cat.description.length).toBeGreaterThan(0);
      expect(cat.healthAdvisory.length).toBeGreaterThan(0);
    });
  });
});
