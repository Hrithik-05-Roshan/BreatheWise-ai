# Security Policy — BreatheWise AI

## Overview
BreatheWise AI is built with defense-in-depth principles to protect user privacy, prevent unauthorized API abuse, and ensure responsible, reliable environmental health guidance.

## Core Security Architecture
1. **Server-Side Secret Isolation:**
   External API credentials (such as Google Gemini API keys) are restricted entirely to server-side Next.js route handlers. No API keys are ever bundled or exposed in client JavaScript.

2. **Strict Schema & Type Validation:**
   All client requests, URL parameters, and JSON payloads are validated using `zod` schemas. Malformed or excessively large payloads are rejected at the edge with HTTP 400.

3. **Prompt Injection & Adversarial Defense:**
   The AI assistant module implements active payload sanitization. Jailbreak directives, developer mode toggles, and system prompt override attempts are detected and stripped before reaching model inference.

4. **Sliding-Window Rate Limiting:**
   Expensive inference endpoints (`/api/chat`) enforce IP-based rate limiting (20 requests/minute per client) to protect against denial-of-service and billing depletion.

5. **Local-First Privacy Model:**
   User profile parameters (household vulnerability, commute patterns, budget constraints) are stored locally in browser `localStorage`. No persistent personal identification database is maintained.

6. **Content Security Policy (CSP) & Hardened HTTP Headers:**
   Configured in `next.config.mjs`:
   - `Content-Security-Policy`: Restricts scripts, styles, and connections.
   - `X-Frame-Options`: `DENY` (prevents clickjacking).
   - `X-Content-Type-Options`: `nosniff`.
   - `Referrer-Policy`: `strict-origin-when-cross-origin`.
   - `Permissions-Policy`: Restricts camera and microphone access.

## Reporting a Vulnerability
If you discover a security flaw or vulnerability, please open an issue in the project repository or submit a report to `security@breathewise.ai`.
