import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOnboardingForm, LOCAL_STORAGE_PROFILE_KEY } from "@/components/onboarding/useOnboardingForm";

// Mock next/navigation useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("useOnboardingForm Custom Hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should initialize with default step 1 and default city", () => {
    const { result } = renderHook(() => useOnboardingForm());
    expect(result.current.step).toBe(1);
    expect(result.current.totalSteps).toBe(6);
    expect(result.current.city).toBe("Delhi");
    expect(result.current.progressPercent).toBe(17);
  });

  it("should increment steps on nextStep and clamp at totalSteps (6)", () => {
    const { result } = renderHook(() => useOnboardingForm());

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.step).toBe(2);

    // Advance to max
    act(() => {
      result.current.nextStep();
      result.current.nextStep();
      result.current.nextStep();
      result.current.nextStep();
    });
    expect(result.current.step).toBe(6);

    // Call again, should clamp at 6
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.step).toBe(6);
  });

  it("should decrement steps on prevStep and clamp at 1", () => {
    const { result } = renderHook(() => useOnboardingForm());

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
    });
    expect(result.current.step).toBe(3);

    act(() => {
      result.current.prevStep();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.prevStep();
      result.current.prevStep();
    });
    expect(result.current.step).toBe(1);
  });

  it("should allow updating form state fields", () => {
    const { result } = renderHook(() => useOnboardingForm());

    act(() => {
      result.current.setCity("Kolkata");
      result.current.setHousehold("family_children");
      result.current.setCommuteMethod("public_transport");
      result.current.setHasAirPurifier(true);
      result.current.setBudgetPreference("flexible");
    });

    expect(result.current.city).toBe("Kolkata");
    expect(result.current.household).toBe("family_children");
    expect(result.current.commuteMethod).toBe("public_transport");
    expect(result.current.hasAirPurifier).toBe(true);
    expect(result.current.budgetPreference).toBe("flexible");
  });

  it("should save profile to localStorage upon handleFinish", () => {
    const { result } = renderHook(() => useOnboardingForm());

    act(() => {
      result.current.setCity("Bengaluru");
    });

    act(() => {
      result.current.handleFinish();
    });

    const saved = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.city).toBe("Bengaluru");
    expect(parsed.indoorEnvironment).toBeDefined();
    expect(parsed.preferences).toBeDefined();
  });
});
