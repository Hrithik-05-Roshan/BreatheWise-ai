# Automated Security Test Suite Documentation

## Automated Verification Categories
The BreatheWise automated security test suite verifies defensive controls across the following vectors:

1. **Input Payload Sanitization & Truncation:**
   - Rejects queries exceeding 500 characters.
   - Detects and filters adversarial prompt injection phrases (`"ignore previous instructions"`, `"jailbreak"`).
   - Validates numerical bounds for environmental inputs (AQI 0-1000).

2. **Server-Side Secret Isolation:**
   - Verifies that `process.env.GEMINI_API_KEY` is never exported in client bundles or public configuration files.

3. **Rate Limiting Resilience:**
   - Simulates burst requests to `/api/chat` and confirms HTTP 429 status response.

4. **Responsible AI Guardrails:**
   - Confirms that the AI response adheres to the non-medical disclaimer policy and provides structured risk-mitigation actions.
