# Web Accessibility (WCAG 2.2 Level AA) Implementation Guide
### Project: BreatheWise AI | Accessible Environmental Technology

---

## 1. Compliance Strategy & Standards
BreatheWise AI is engineered to meet **WCAG 2.2 Level AA** standards across all user interfaces:

- **Perceivable:** Information is never conveyed through color alone; high-contrast typography and semantic structure ensure clarity for visually impaired users.
- **Operable:** All flows (navigation, onboarding wizard, city selection, habit checklist) are fully keyboard navigable with visible focus states and skip navigation links.
- **Understandable:** Consistent typography, explicit form error indications, and human-readable health advisories.
- **Robust:** Compatible with modern assistive technologies via semantic HTML5 landmarks and WAI-ARIA 1.2 roles.

---

## 2. Key Accessibility Implementations

### A. Bypass Blocks (WCAG 2.4.1)
- Added a "Skip to main content" link at the top of `app/layout.tsx`:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-800 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
>
  Skip to main content
</a>
<div id="main-content">{children}</div>
```

### B. Non-Color Severity Communication (WCAG 1.4.1)
Air quality severity (Good, Satisfactory, Moderate, Poor, Very Poor, Severe) is accompanied by textual labels, numerical values, and descriptive subtitles. Users with deuteranopia or protanopia can understand condition levels without ambiguity.

### C. Reduced Motion Support (WCAG 2.3.3)
In `app/globals.css`, `@media (prefers-reduced-motion: reduce)` is configured to neutralize non-essential animations, transitions, and pulsing effects:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### D. Accessible Dynamic Live Regions & Error States
- The `ErrorBoundary` component utilizes `role="alert"` and `aria-live="assertive"`.
- The `Progress` component exposes `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Tab navigation utilizes `role="region"` and descriptive `aria-label` attributes.
