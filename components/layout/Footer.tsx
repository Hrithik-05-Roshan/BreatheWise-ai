import React from "react";
import Link from "next/link";
import { Wind, Shield, HeartHandshake, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white">
                <Wind className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">BreatheWise AI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Transforming urban air quality data into personalized, proactive daily health actions and verifiable climate impact.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              <Leaf className="h-3.5 w-3.5" />
              <span>PromptWars Challenge 6 Submission</span>
            </div>
          </div>

          {/* Product Modules */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-emerald-600 transition-colors">Air Quality Dashboard</Link></li>
              <li><Link href="/onboarding" className="hover:text-emerald-600 transition-colors">Personalized Onboarding</Link></li>
              <li><Link href="/indoor-air" className="hover:text-emerald-600 transition-colors">Indoor Air Intelligence</Link></li>
              <li><Link href="/commute" className="hover:text-emerald-600 transition-colors">Smart Commute Assistant</Link></li>
              <li><Link href="/impact" className="hover:text-emerald-600 transition-colors">Environmental Impact</Link></li>
            </ul>
          </div>

          {/* Environmental Data Standards */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Standards & Science</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200">CPCB NAQI 24-hr Standards</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200">Open-Meteo European Agency Model</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200">CEA Emission Baselines</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200">IIT Urban Aerosol Dynamics</span></li>
            </ul>
          </div>

          {/* Responsible AI Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Responsible AI</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              BreatheWise provides environmental risk mitigation strategies. It does not provide medical diagnoses or clinically validated personal exposure dosimetry. Always consult licensed medical providers for personal health decisions.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BreatheWise AI. Built for Urban Resilience.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>WCAG 2.2 AA Aligned</span>
            <span>•</span>
            <span>Zero Unnecessary Tracking</span>
            <span>•</span>
            <span>Privacy-First Local Context</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
