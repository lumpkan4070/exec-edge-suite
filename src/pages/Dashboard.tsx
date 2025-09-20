import { useState, useEffect } from "react";
import { useUser } from "@/contexts/user-context";
import TierSelection from "@/components/onboarding/tier-selection";
import WelcomeScreen from "@/components/onboarding/welcome-screen";
import ObjectiveScreen from "@/components/onboarding/objective-screen";
import ExecutiveDashboard from "@/components/dashboard/executive-dashboard";
import PaymentHandler from "@/components/payment/payment-handler";
import TrialBanner from "@/components/trial/trial-banner";
import TrialExpiredModal from "@/components/trial/trial-expired-modal";

export default function Dashboard() {
  const { userData, setUserData } = useUser();
  const [currentStep, setCurrentStep] = useState<"tier" | "welcome" | "objective" | "dashboard" | "payment">("tier");
  const [selectedPaymentTier, setSelectedPaymentTier] = useState<string>("");

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

  const handleUpgrade = (tier: string) => {
    setSelectedPaymentTier(tier);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = () => {
    setCurrentStep("dashboard");
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Stay on payment screen for retry
  };

  const handlePaymentBack = () => {
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

  if (currentStep === "payment") {
    const tierData = {
      personal: { amount: "$29/month", priceId: "price_1S97NyBgt7hUXmS2a8tpOW6I" },
      professional: { amount: "$99/month", priceId: "price_1S97ORBgt7hUXmS2JXVMb0tu" }
    };
    
    const currentTierData = tierData[selectedPaymentTier as keyof typeof tierData];
    
    return (
      <PaymentHandler
        tier={selectedPaymentTier}
        priceId={currentTierData.priceId}
        amount={currentTierData.amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onBack={handlePaymentBack}
      />
    );
  }

  return (
    <>
      <TrialBanner />
      <ExecutiveDashboard 
        userRole={userData.role || ""} 
        userObjective={userData.objective || ""} 
        tier={userData.tier || ""} 
        onUpgrade={handleUpgrade}
      />
      <TrialExpiredModal />
    </>
  );
}