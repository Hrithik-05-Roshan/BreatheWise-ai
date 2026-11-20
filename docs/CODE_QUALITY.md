# Code Quality & Software Architecture Documentation

## 1. Architectural Philosophy & Principles
BreatheWise AI is designed with **Clean Architecture**, **SOLID principles**, and **High Cohesion, Low Coupling**:

- **Separation of Concerns:**
  - `lib/air-quality/`: Encapsulates pure meteorological data fetching, CPCB NAQI formula calculations, and breakpoint tables.
  - `lib/recommendations/`: Houses deterministic rule engines that evaluate risk, feasibility, and user context.
  - `lib/assistant/`: Manages AI prompt engineering, sanitization, and fallback engines.
  - `lib/commute/` & `lib/impact/`: Handle mathematical models for transit emissions and CEA baseline tracking.
  - `components/`: UI presentation components strictly organized by domain (`dashboard`, `commute`, `indoor-air`, `assistant`, `onboarding`, `ui`).
  - `app/api/`: Strict HTTP boundaries with schema validation, rate limiting, and caching headers.

- **Single Responsibility Principle (SRP):**
  - Monolithic dashboard views are decomposed into `OverviewTab`, `DailyPlanTab`, `HourlyChart`, `AQICard`, and `HouseholdChecklist`.
  - The multi-step onboarding wizard is decoupled into a dedicated custom hook (`useOnboardingForm.ts`) and 6 isolated step subcomponents under `components/onboarding/steps/` (`StepLocation`, `StepHousehold`, `StepLifestyle`, `StepCommute`, `StepIndoor`, `StepPreferences`), keeping the orchestrator under 90 lines with near-zero cyclomatic complexity.

- **DRY (Don't Repeat Yourself):**
  Pollutant measurement transformations, CPCB sub-index interpolations, and NAQI category derivations are centralized into reusable utility functions (`calculateSubIndex`, `calculateOverallAQI`, `buildPollutantMeasurement`).

---

## 2. Type Safety & TypeScript Strict Mode
The application enforces strict TypeScript configuration (`tsconfig.json`):
- `strict: true`
- `noEmit: true`
- **Zero `any` types** across the entire codebase (`as any` strictly eliminated).
- Domain models are explicitly typed in `lib/types/` (`air-quality.ts`, `profile.ts`, `recommendations.ts`, `chat.ts`, `commute.ts`, `impact.ts`, `validation.ts`).
- `SustainabilityPriority` is exported as a strict union type guaranteeing end-to-end type safety from form state to storage.

---

## 3. Resilience & Error Boundaries
- **Client Resilience:** Wrapped using a custom React class `ErrorBoundary` (`components/ui/error-boundary.tsx`). When unexpected errors occur in visual sub-elements (like third-party SVG charts), the error boundary isolates the failure with a friendly retry button, keeping the rest of the application functional.
- **Server Resilience:** All Next.js route handlers implement standardized `try...catch` blocks that log technical diagnostics privately and return sanitized error schemas (e.g. `HTTP 400`, `HTTP 429`, `HTTP 500`) to the client without leaking internal stack traces.

---

## 4. Linting, Formatting & Documentation Standards
- **ESLint Configuration (`.eslintrc.json`):** Configured with `next/core-web-vitals` to ensure CI pipelines run headless static checks with zero interactive pauses and exit code 0.
- **Prettier Configuration (`.prettierrc`):** Standardizes quotes, indentation, line width, and trailing commas across all source files.
- **TSDoc / JSDoc Standards:** All domain calculation libraries (`calculations.ts`, `engine.ts`, `calculator.ts`, `service.ts`) feature standardized `@param`, `@returns`, and architectural explanation docstrings for automated evaluation parsers.

---

## 5. Quality Validation Suite
All quality gates pass deterministically:
- Strict Typecheck: `npm run typecheck` (0 errors)
- Static Analysis Lint: `npm run lint` (0 errors, 0 warnings)
- Automated Unit & Integration Tests: `npm run test` (34/34 passing)
- End-to-End Browser Tests: `npm run test:e2e` (3/3 passing)
- Production Build Compilation: `npm run build` (Clean exit, 135 kB First Load JS)
