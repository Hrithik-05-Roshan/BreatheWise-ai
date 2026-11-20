"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useOnboardingForm, LOCAL_STORAGE_PROFILE_KEY } from "./useOnboardingForm";
import { StepLocation } from "./steps/StepLocation";
import { StepHousehold } from "./steps/StepHousehold";
import { StepLifestyle } from "./steps/StepLifestyle";
import { StepCommute } from "./steps/StepCommute";
import { StepIndoor } from "./steps/StepIndoor";
import { StepPreferences } from "./steps/StepPreferences";

export { LOCAL_STORAGE_PROFILE_KEY };

export function OnboardingWizard() {
  const {
    step,
    totalSteps,
    progressPercent,
    nextStep,
    prevStep,
    handleFinish,
    skipToDashboard,
    city,
    setCity,
    customCity,
    setCustomCity,
    household,
    setHousehold,
    lifestyle,
    setLifestyle,
    commuteMethod,
    setCommuteMethod,
    commuteDistanceKm,
    setCommuteDistanceKm,
    hasAirPurifier,
    setHasAirPurifier,
    cookingFuel,
    setCookingFuel,
    windowsFrequentlyOpen,
    setWindowsFrequentlyOpen,
    budgetPreference,
    setBudgetPreference,
  } = useOnboardingForm();

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl shadow-slate-950/5">
      {/* Progress & Step Indicator */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span className="text-emerald-700 dark:text-emerald-400">
            {progressPercent}% Completed
          </span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Step Components */}
      {step === 1 && (
        <StepLocation
          city={city}
          setCity={setCity}
          customCity={customCity}
          setCustomCity={setCustomCity}
        />
      )}

      {step === 2 && (
        <StepHousehold household={household} setHousehold={setHousehold} />
      )}

      {step === 3 && (
        <StepLifestyle lifestyle={lifestyle} setLifestyle={setLifestyle} />
      )}

      {step === 4 && (
        <StepCommute
          commuteMethod={commuteMethod}
          setCommuteMethod={setCommuteMethod}
          commuteDistanceKm={commuteDistanceKm}
          setCommuteDistanceKm={setCommuteDistanceKm}
        />
      )}

      {step === 5 && (
        <StepIndoor
          hasAirPurifier={hasAirPurifier}
          setHasAirPurifier={setHasAirPurifier}
          cookingFuel={cookingFuel}
          setCookingFuel={setCookingFuel}
          windowsFrequentlyOpen={windowsFrequentlyOpen}
          setWindowsFrequentlyOpen={setWindowsFrequentlyOpen}
        />
      )}

      {step === 6 && (
        <StepPreferences
          budgetPreference={budgetPreference}
          setBudgetPreference={setBudgetPreference}
        />
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={skipToDashboard}
            className="text-xs text-slate-500"
          >
            Skip to Default Dashboard
          </Button>
        )}

        {step < totalSteps ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
          >
            Next Step <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleFinish}
            className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 text-sm font-bold shadow-md shadow-emerald-800/20 px-6"
          >
            <Sparkles className="h-4 w-4" /> Generate My Action Plan
          </Button>
        )}
      </div>
    </div>
  );
}
