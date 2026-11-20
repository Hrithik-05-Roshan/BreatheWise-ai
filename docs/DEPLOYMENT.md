# Production Deployment Guide

## 1. Vercel Deployment (Recommended)
BreatheWise AI is built with Next.js App Router and deploys seamlessly to Vercel:
1. Import the Git repository in Vercel.
2. The framework preset is automatically detected as **Next.js**.
3. (Optional) Set `GEMINI_API_KEY` in Project Settings > Environment Variables.
4. Click **Deploy**.

## 2. Node.js Container / Standalone Docker Deployment
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```
