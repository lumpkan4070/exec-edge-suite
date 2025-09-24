import { useState, useEffect } from "react";
import { useUser } from "@/contexts/user-context";
import { useLocation, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import PaymentHandler from "@/components/payment/payment-handler";

export default function Index() {
  const { user, userData } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");

  // Handle tier selection from navigation state
  useEffect(() => {
    const state = location.state as any;
    if (state?.selectedTier) {
      setSelectedTier(state.selectedTier);
      setShowPayment(true);
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location.state]);

  // Reset to landing page when user navigates directly to home
  useEffect(() => {
    if (location.pathname === "/" && !location.search && !location.state) {
      setShowPayment(false);
    }
  }, [location]);

  const handleGetStarted = () => {
    if (user) {
      // User is authenticated, check if they need onboarding
      if (!userData.role) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Not authenticated, start guest trial or show auth
      navigate('/auth');
    }
  };

  const handlePlanSelection = (tier: string) => {
    setSelectedTier(tier);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    navigate('/dashboard');
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    setShowPayment(false);
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

  return (
    <Landing 
      onGetStarted={handleGetStarted}
      onSelectPlan={handlePlanSelection}
    />
  );
}