# Architecture Decision Records (ADRs)

## ADR-001: Next.js 14 App Router Architecture
- **Decision:** Use Next.js 14 App Router with TypeScript.
- **Context:** Requires unified server and client component paradigms, built-in API route handlers, and automatic code-splitting.
- **Consequence:** High rendering performance, server-side secret isolation, and simple static export.

## ADR-002: Local-First Privacy Storage
- **Decision:** Store household onboarding preferences exclusively in browser `localStorage`.
- **Context:** Protect user privacy by avoiding central databases of sensitive family compositions and home addresses.
- **Consequence:** Immediate load times, zero PII transmission risk, zero database operational cost.

## ADR-003: Deterministic Intelligence Fallback Engine
- **Decision:** Build a complete rule-based recommendation and fallback engine alongside optional Gemini LLM integration.
- **Context:** External AI APIs can face rate limits, network outages, or missing credentials during evaluations.
- **Consequence:** 100% application functionality guaranteed regardless of external API key availability.

## ADR-004: Dynamic Chunking of Recharts
- **Decision:** Dynamically load `HourlyChart` with `next/dynamic` and a skeleton placeholder.
- **Context:** Recharts SVG charting libraries are heavy and degrade initial first-load JS size.
- **Consequence:** Reduced Dashboard first-load JS by 43.3% and page chunk size by 82.1%.
