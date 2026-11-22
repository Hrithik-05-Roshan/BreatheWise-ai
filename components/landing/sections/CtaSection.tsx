import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-700 text-white text-center">
      <div className="mx-auto max-w-4xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to Protect Your Family This Winter?
        </h2>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Complete a 2-minute personalized onboarding to receive today&apos;s tailored morning, afternoon, and evening air quality action plan.
        </p>
        <div className="pt-2 flex justify-center">
          <Link href="/onboarding">
            <Button size="lg" className="bg-white hover:bg-slate-100 text-emerald-900 font-bold px-8 py-3 text-base shadow-xl">
              Build My Air Quality Plan Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
