"use client";

import React from "react";

interface QuickQuestionsBarProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

/**
 * Displays quick prompt suggestion chips for fast conversational discovery.
 */
export function QuickQuestionsBar({
  questions,
  onSelectQuestion,
  disabled = false,
}: QuickQuestionsBarProps) {
  return (
    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center gap-2 overflow-x-auto no-scrollbar">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
        Quick Ask:
      </span>
      {questions.map((q, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelectQuestion(q)}
          disabled={disabled}
          className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors shrink-0 disabled:opacity-50"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
