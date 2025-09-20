import { useState, useEffect } from "react";
import { useUser } from "@/contexts/user-context";
import { useLocation } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import PaymentHandler from "@/components/payment/payment-handler";

export default function Index() {
  const { userData, setUserData } = useUser();
  const location = useLocation();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");

  // Reset to landing page when user navigates directly to home
  useEffect(() => {
    if (location.pathname === "/" && !location.search) {
      setShowDashboard(false);
      setShowPayment(false);
    }
  }, [location]);

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
      personal: { amount: "$29/month", priceId: "price_1S97NyBgt7hUXmS2a8tpOW6I" },
      professional: { amount: "$99/month", priceId: "price_1S97ORBgt7hUXmS2JXVMb0tu" }
    };
    
    const currentTierData = tierData[selectedTier as keyof typeof tierData];
    
    return (
      <PaymentHandler
        tier={selectedTier}
        priceId={currentTierData.priceId}
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