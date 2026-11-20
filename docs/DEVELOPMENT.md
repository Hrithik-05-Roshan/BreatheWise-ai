# Local Development Guide — BreatheWise AI

## 1. Prerequisites
- **Node.js:** v18.17.0+ or v20.x+ (tested on Node v22.20.0)
- **Package Manager:** npm v9+ or v10+

## 2. Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Next.js development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## 3. Available Quality Scripts
- `npm run dev`: Starts local development server on port 3000.
- `npm run build`: Compiles production build with route optimization and bundle analysis.
- `npm run start`: Runs the compiled production build.
- `npm run typecheck`: Runs strict TypeScript check (`tsc --noEmit`).
- `npm run lint`: Runs ESLint validation.
- `npm run test`: Executes 34 automated unit, integration, security, and accessibility tests.
- `npm run test:e2e`: Runs Playwright headless browser end-to-end tests.
- `npm run audit`: Checks production runtime packages for known vulnerabilities.
