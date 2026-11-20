# Threat Model (STRIDE Methodology) — BreatheWise AI

### 1. Spoofing Identity
- **Threat:** Attacker spoofs client identity or IP address to bypass rate limits.
- **Mitigation:** Rate limiter inspects proxy forwarding headers (`x-forwarded-for`) and applies fallback thresholding. All endpoints are stateless and do not hold privileged multi-tenant user accounts in this prototype stage.

### 2. Tampering
- **Threat:** Manipulation of air quality readings or tampering with local profile data.
- **Mitigation:** Air quality data calculations occur server-side with strict CPCB breakpoint formulas. Profile data is validated via Zod before recommendation generation.

### 3. Repudiation
- **Threat:** Inability to audit external service disruptions.
- **Mitigation:** Server logs capture sanitized request errors without logging sensitive query text or internal environment tokens.

### 4. Information Disclosure
- **Threat:** Leaking Google Gemini API keys or sensitive user health conditions.
- **Mitigation:** API keys are never prefixed with `NEXT_PUBLIC_` and exist solely on the server execution runtime. No medical history is queried; only general household categories (e.g. "family with children") are collected.

### 5. Denial of Service (DoS)
- **Threat:** Flooding the AI chat route with large requests to exhaust server CPU or API budget.
- **Mitigation:** Strict 500-character payload limits enforced by Zod; sliding window rate limiter returns 429 Too Many Requests; external API calls enforce 4.5s - 8s timeout abort controllers.

### 6. Elevation of Privilege
- **Threat:** Jailbreak / Prompt injection attacks forcing the LLM to emit dangerous medical prescriptions or bypass application rules.
- **Mitigation:** Multi-stage defense: client-side sanitization, regex-based jailbreak stripping, system prompt guardrails forbidding medical prescriptions, and strict JSON output schema parsing.
