import { useState } from "react";
import TierSelection from "@/components/onboarding/tier-selection";
import WelcomeScreen from "@/components/onboarding/welcome-screen";
import ObjectiveScreen from "@/components/onboarding/objective-screen";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<"tier" | "welcome" | "objective" | "dashboard">("tier");
  const [userTier, setUserTier] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userObjective, setUserObjective] = useState<string>("");

  const handleTierSelection = (tier: string) => {
    setUserTier(tier);
    setCurrentStep("welcome");
  };

  const handleRoleSelection = (role: string) => {
    setUserRole(role);
    setCurrentStep("objective");
  };

  const handleObjectiveSelection = (objective: string) => {
    setUserObjective(objective);
    setCurrentStep("dashboard");
  };

  if (currentStep === "tier") {
    return <TierSelection onNext={handleTierSelection} />;
  }

  if (currentStep === "welcome") {
    return <WelcomeScreen onNext={handleRoleSelection} tier={userTier} />;
  }

  if (currentStep === "objective") {
    return <ObjectiveScreen role={userRole} tier={userTier} onComplete={handleObjectiveSelection} />;
  }

  return <ExecutiveDashboard userRole={userRole} userObjective={userObjective} tier={userTier} />;
}