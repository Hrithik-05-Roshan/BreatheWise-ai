import React from "react";
import Link from "next/link";
import { Wind, ShieldCheck, Sparkles, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-white/85 backdrop-blur-md dark:border-emerald-500/10 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Wind className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              BreatheWise <span className="text-emerald-600 font-extrabold text-sm tracking-wide uppercase px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Features
          </Link>
          <Link href="/#problem" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Winter Smog & Health
          </Link>
          <Link href="/#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            How It Works
          </Link>
          <Link href="/#impact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Impact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <LayoutDashboard className="h-4 w-4 text-emerald-600" />
              Live Dashboard
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Build My Plan
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
