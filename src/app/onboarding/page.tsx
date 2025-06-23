import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import React from "react";

export default function page() {
  return (
    <main>
      <div className="my-10 px-[5vw]">
        <h1 className="text-3xl font-semibold text-center">
          Join Artistly as a Performer
        </h1>
        <p className="text-muted-foreground text-center">
          Connect with event planners and showcase your talent to thousands of
          potential clients
        </p>
      </div>
      <OnboardingForm />
    </main>
  );
}
