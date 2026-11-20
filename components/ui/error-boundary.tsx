"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[BreatheWise ErrorBoundary] Uncaught UI error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 p-6 text-center space-y-4 my-4"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {this.props.fallbackMessage || "An error occurred while displaying this module"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Our safety boundary contained the issue so the rest of your air quality assistant remains functional.
            </p>
          </div>
          <Button
            size="sm"
            onClick={this.handleRetry}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
