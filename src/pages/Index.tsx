import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import PaymentHandler from "@/components/payment/payment-handler";

export default function Index() {
  const { userData, setUserData } = useUser();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");

  const handlePlanSelection = (tier: string) => {
    setSelectedTier(tier);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setUserData({ tier: selectedTier });
    setShowPayment(false);
    setShowDashboard(true);
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Could show toast or error handling here
  };

  // Show payment screen for specific tier
  if (showPayment && selectedTier) {
    const tierData = {
      personal: { amount: "$29/month", planId: "personal_monthly" },
      professional: { amount: "$99/month", planId: "professional_monthly" }
    };
    
    const currentTierData = tierData[selectedTier as keyof typeof tierData];
    
    return (
      <PaymentHandler
        tier={selectedTier}
        planId={currentTierData.planId}
        amount={currentTierData.amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    );
  }

  // Only show dashboard if explicitly requested by user clicking Get Started
  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <Landing 
      onGetStarted={() => setShowDashboard(true)}
      onSelectPlan={handlePlanSelection}
    />
  );
}