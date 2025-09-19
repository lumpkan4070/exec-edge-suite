import { useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function PaymentSuccess() {
  const { setUserData } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    // Check subscription status on successful payment
    const checkSubscription = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }

        if (data?.subscribed && data?.tier) {
          setUserData({ tier: data.tier });
          toast({
            title: "Welcome to APEX! 🎉",
            description: `Your ${data.tier} subscription is now active.`,
          });
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkSubscription();
  }, [setUserData, toast]);

  const handleGetStarted = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
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
  );
}