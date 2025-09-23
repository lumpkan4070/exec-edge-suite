import { useEffect } from "react";
import { CheckCircle, ArrowRight, Crown } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const { setUserData, checkSubscription } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    // Check subscription status on successful payment
    const updateSubscriptionStatus = async () => {
      try {
        // Use the updated checkSubscription from context
        await checkSubscription();
        
        toast({
          title: "Welcome to APEX! 🎉",
          description: "Your subscription is now active and you have full access.",
        });
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    updateSubscriptionStatus();
  }, [checkSubscription, toast]);

  const handleGetStarted = () => {
    window.location.href = '/';
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-electric" />
              <span className="text-2xl font-bold text-foreground">APEX</span>
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
        <div className="executive-card p-8 shadow-xl">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Welcome to APEX! Your subscription is now active and you have full access to all features. Your executive transformation starts now.
          </p>

          <div className="space-y-4">
            <ExecutiveButton
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </ExecutiveButton>
            
            <p className="text-sm text-muted-foreground">
              You can manage your subscription anytime from your dashboard.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}