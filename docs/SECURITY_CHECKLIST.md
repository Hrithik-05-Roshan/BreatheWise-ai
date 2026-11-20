# Security Checklist & Verification Matrix

| Category | Security Control | Target Standard | Implementation File | Verification Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Secrets Management** | Zero client-side API secrets | OWASP ASVS V1.1 | `lib/assistant/service.ts`, `app/api/chat/route.ts` | Verified: No `NEXT_PUBLIC_` secret tokens |
| **Input Validation** | Strict Zod validation on all API endpoints | OWASP ASVS V5.1 | `lib/types/validation.ts`, `app/api/` | 100% route coverage in integration tests |
| **Rate Limiting** | Sliding window rate limiting on AI inference | OWASP ASVS V13.1 | `app/api/chat/route.ts` | Returns HTTP 429 upon threshold |
| **Payload Sizing** | Maximum payload limit (25 KB) | OWASP ASVS V13.2 | `app/api/chat/route.ts` | Returns HTTP 413 on oversized requests |
| **Prompt Injection** | Adversarial pattern filtering & length bounds | OWASP GenAI Top 10 | `lib/assistant/service.ts` | Verified in `tests/security/` |
| **HTTP Security Headers** | CSP, X-Frame-Options, nosniff, Referrer-Policy | OWASP ASVS V14.4 | `next.config.mjs` | Headers verified in production build |
| **Data Privacy** | Local-first storage; zero PII retention | GDPR / DPDP Act | `components/onboarding/OnboardingWizard.tsx` | Browser `localStorage` only |
| **XSS Prevention** | React JSX auto-escaping; no unsafe HTML | OWASP ASVS V5.3 | All UI components | Zero `dangerouslySetInnerHTML` |
| **Resilience / Fallback** | 4.5s request timeout with simulated offline data | Resilient Architecture | `lib/air-quality/service.ts` | Tested with network mock drop |
| **Responsible AI** | Explicit non-clinical medical disclaimers | WHO / CPCB Guidelines | `lib/assistant/prompts.ts` | Verified in deterministic fallback test |
