# Security Checklist — BreatheWise AI

| Category | Security Control | Implementation File | Verification Status |
| :--- | :--- | :--- | :--- |
| **Secrets Management** | Zero client-side API secrets | `lib/assistant/service.ts`, `app/api/chat/route.ts` | Verified (No NEXT_PUBLIC_ keys for secrets) |
| **Input Validation** | Zod schema validation on all inputs | `lib/types/validation.ts`, `app/api/chat/route.ts` | Verified (Rejects invalid payloads) |
| **Prompt Injection** | Adversarial pattern filtering & length bounds | `lib/assistant/service.ts` | Verified (Strips jailbreak triggers) |
| **Rate Limiting** | Sliding window rate limiting on AI route | `app/api/chat/route.ts` | Verified (Returns HTTP 429 upon threshold) |
| **HTTP Headers** | CSP, X-Frame-Options, nosniff, Referrer-Policy | `next.config.mjs` | Verified (Integrated in Next.js config) |
| **Data Privacy** | No PII stored, local-first preference storage | `components/onboarding/OnboardingWizard.tsx` | Verified (Browser localStorage only) |
| **XSS Defense** | React JSX escaping, no dangerouslySetInnerHTML | All UI components | Verified (Zero unsafe HTML injection) |
| **Network Resilience** | Timeouts & graceful fallback to simulation | `lib/air-quality/service.ts`, `lib/assistant/service.ts` | Verified (4.5s timeout with offline fallback) |
| **Responsible AI** | Health disclaimer & non-medical boundaries | `lib/assistant/prompts.ts`, `lib/assistant/service.ts` | Verified (Explicit clinical non-diagnosis rule) |
