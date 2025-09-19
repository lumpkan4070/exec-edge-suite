import { useState, useEffect } from "react";
import { useUser } from "@/contexts/user-context";
import TierSelection from "@/components/onboarding/tier-selection";
import WelcomeScreen from "@/components/onboarding/welcome-screen";
import ObjectiveScreen from "@/components/onboarding/objective-screen";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";

export default function Index() {
  const { userData, setUserData } = useUser();
  const [currentStep, setCurrentStep] = useState<"tier" | "welcome" | "objective" | "dashboard">("tier");

  // Load existing user data on mount
  useEffect(() => {
    if (userData.tier && userData.role && userData.objective) {
      setCurrentStep("dashboard");
    } else if (userData.tier && userData.role) {
      setCurrentStep("objective");
    } else if (userData.tier) {
      setCurrentStep("welcome");
    }
  }, [userData]);

  const handleTierSelection = (tier: string) => {
    setUserData({ tier });
    setCurrentStep("welcome");
  };

  const handleRoleSelection = (role: string) => {
    setUserData({ role });
    setCurrentStep("objective");
  };

  const handleObjectiveSelection = (objective: string) => {
    setUserData({ objective });
    setCurrentStep("dashboard");
  };

  if (currentStep === "tier") {
    return <TierSelection onNext={handleTierSelection} />;
  }

  if (currentStep === "welcome") {
    return <WelcomeScreen onNext={handleRoleSelection} tier={userData.tier || ""} />;
  }

  if (currentStep === "objective") {
    return <ObjectiveScreen role={userData.role || ""} tier={userData.tier || ""} onComplete={handleObjectiveSelection} />;
  }

  return <ExecutiveDashboard userRole={userData.role || ""} userObjective={userData.objective || ""} tier={userData.tier || ""} />;
}