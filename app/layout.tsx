import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BreatheWise AI - Urban Air Quality Assistant",
  description: "Personalized environmental health intelligence, real-time AQI guidance, smart commutes, and verifiable climate impact.",
  keywords: ["AQI", "Air Quality", "India NAQI", "PM2.5", "Smog", "Pollution Exposure", "Clean Air"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50/50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 selection:bg-emerald-200 selection:text-emerald-900">
        {/* WCAG 2.2 AA Bypass Block / Skip to Main Content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-800 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
