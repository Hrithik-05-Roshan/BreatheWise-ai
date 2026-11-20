import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "severe";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300":
            variant === "default",
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200":
            variant === "secondary",
          "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300":
            variant === "outline",
          "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300":
            variant === "success",
          "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300":
            variant === "warning",
          "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300":
            variant === "danger",
          "bg-rose-950 text-rose-100 border border-rose-800":
            variant === "severe",
        },
        className
      )}
      {...props}
    />
  );
}
