"use client";

import React, { useState } from "react";
import { UserProfile } from "@/lib/types/profile";
import { AirQualityData } from "@/lib/types/air-quality";
import { StructuredAiResponse } from "@/lib/types/chat";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Bot, User, Activity } from "lucide-react";
import { StructuredAiCard } from "./StructuredAiCard";
import { QuickQuestionsBar } from "./QuickQuestionsBar";

export interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  structured?: StructuredAiResponse;
  timestamp: string;
}

const PREDEFINED_QUESTIONS = [
  "Is it safe to go jogging today?",
  "What should my family do during severe smog?",
  "How can I improve indoor air quality without spending much?",
  "Should I use my bicycle or take public transport today?",
  "What should my child do instead of playing outside?",
];

export function ChatInterface({
  profile,
  airQuality,
}: {
  profile: UserProfile;
  airQuality: AirQualityData;
}) {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "initial-assistant",
      sender: "assistant",
      text: `Hello! I am BreatheWise Intelligence. I am tracking air quality in ${airQuality.city} (AQI: ${airQuality.aqi}, ${airQuality.categoryLabel}) and your profile as a ${profile.lifestyle.replace("_", " ")} with a ${profile.household.replace("_", " ")} household. How can I assist your health and commute decisions today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || loading) return;

    const userMsg: MessageItem = {
      id: "u_" + Date.now(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          context: {
            location: airQuality.city,
            aqi: airQuality.aqi,
            category: airQuality.categoryLabel,
            pm25: airQuality.pollutants.pm25.value,
            pm10: airQuality.pollutants.pm10.value,
            mainPollutant: airQuality.mainPollutant,
            household: profile.household,
            lifestyle: profile.lifestyle,
            commute: profile.commuteMethod,
            commuteDistanceKm: profile.commuteDistanceKm,
            indoorEnvironment: {
              hasAirPurifier: profile.indoorEnvironment.hasAirPurifier,
              windowsOpen: profile.indoorEnvironment.windowsFrequentlyOpen,
              cookingFuel: profile.indoorEnvironment.cookingFuel,
              ventilation: profile.indoorEnvironment.ventilationQuality,
            },
            preferences: {
              budgetPreference: profile.preferences.budgetPreference,
              sustainabilityPriorities: profile.preferences.sustainabilityPriorities,
            },
          },
        }),
      });

      const data = await response.json();
      if (data.success && data.response) {
        const assistantMsg: MessageItem = {
          id: "a_" + Date.now(),
          sender: "assistant",
          text: data.response.situationAssessment,
          structured: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || "Unable to reach assistant");
      }
    } catch (err) {
      console.error("Chat error", err);
      const fallbackMsg: MessageItem = {
        id: "err_" + Date.now(),
        sender: "assistant",
        text: `Based on your AQI of ${airQuality.aqi} in ${airQuality.city}, avoid outdoor aerobic exertion during morning inversion hours (06:00-10:00). Switch commute to Metro or enclosed transit and keep bedrooms draft-proofed.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-[700px]">
      {/* Assistant Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              BreatheWise Intelligence
              <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                Context-Aware
              </Badge>
            </h3>
            <span className="text-xs text-slate-500">
              Synced with {airQuality.city} (AQI {airQuality.aqi}) & your profile
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
          <Activity className="h-3 w-3 text-emerald-600 animate-pulse" />
          <span>Active Intelligence Adapter</span>
        </div>
      </div>

      {/* Suggested Query Chips */}
      <QuickQuestionsBar
        questions={PREDEFINED_QUESTIONS}
        onSelectQuestion={handleSend}
        disabled={loading}
      />

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="h-8 w-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? "bg-emerald-700 text-white rounded-tr-none"
                    : "bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 rounded-tl-none space-y-3"
                }`}
              >
                <p>{m.text}</p>
                {m.structured && <StructuredAiCard structured={m.structured} />}

                <span
                  className={`text-[10px] block text-right mt-1 ${
                    isUser ? "text-emerald-200" : "text-slate-400"
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Sparkles className="h-4 w-4 text-emerald-600 animate-spin" />
            <span>Analyzing environmental context and household profile...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(query);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about outdoor jogging, children's school play, or indoor ventilation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl px-4 py-2.5 h-auto"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
