import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "emerald";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm shadow-emerald-900/10":
              variant === "default",
            "bg-emerald-900 text-emerald-50 hover:bg-emerald-950":
              variant === "emerald",
            "bg-emerald-50 text-emerald-800 hover:bg-emerald-100":
              variant === "secondary",
            "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground":
              variant === "outline",
            "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700":
              variant === "destructive",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base font-semibold": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
