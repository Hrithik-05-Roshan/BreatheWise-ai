"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Wind,
  CalendarCheck2,
  Home,
  Navigation,
  Leaf,
  BarChart3,
  Bot,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";

export type DashboardTab =
  | "overview"
  | "daily-plan"
  | "indoor-air"
  | "commute"
  | "sustainability"
  | "impact"
  | "assistant"
  | "community";

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export function Sidebar({ activeTab, onSelectTab }: SidebarProps) {
  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "daily-plan", label: "My Daily Plan", icon: <CalendarCheck2 className="h-4 w-4" /> },
    { id: "indoor-air", label: "Indoor Air", icon: <Home className="h-4 w-4" /> },
    { id: "commute", label: "Smart Commute", icon: <Navigation className="h-4 w-4" /> },
    { id: "sustainability", label: "Sustainability", icon: <Leaf className="h-4 w-4" /> },
    { id: "impact", label: "Impact Tracker", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "assistant", label: "AI Assistant", icon: <Bot className="h-4 w-4" />, badge: "AI" },
    { id: "community", label: "Community Hub", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-4 space-y-6">
      {/* Brand Header */}
      <div className="flex items-center space-x-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-sm">
          <Wind className="h-4 w-4" />
        </div>
        <div>
          <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1 text-sm">
            BreatheWise <span className="text-[10px] text-emerald-600 font-extrabold uppercase px-1 py-0.2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded">Command</span>
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-emerald-700 text-white font-semibold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={isActive ? "text-white" : "text-emerald-700 dark:text-emerald-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Personalization shortcut */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/onboarding"
          className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-emerald-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Edit Profile & Location</span>
        </Link>
      </div>
    </aside>
  );
}
