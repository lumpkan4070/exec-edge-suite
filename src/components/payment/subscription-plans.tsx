import { useState } from "react";
import { CheckCircle, Crown, Users, Zap, ArrowRight } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/user-context";

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useUser();

  const plans = [
    {
      id: "personal",
      name: "Personal Plan",
      price: "$29.99",
      period: "/month",
      description: "Perfect for individual professionals building their leadership foundation",
      features: [
        "AI Strategy Co-pilot",
        "Basic Scenario Library",
        "Performance Analytics",
        "Mobile Access",
        "Email Support"
      ],
      icon: Users,
      popular: false
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: "$99.99",
      period: "/year",
      description: "Advanced training for senior leaders and executives",
      features: [
        "Everything in Personal",
        "Advanced Scenario Library",
        "Executive Coaching Sessions",
        "Custom Leadership Reports",
        "Priority Support",
        "Team Collaboration Tools"
      ],
      icon: Crown,
      popular: true
    }
  ];

  const handleSelectPlan = async (planId: string) => {
    setLoading(planId);
    
    try {
      toast({
        title: "Redirecting to Secure Checkout...",
        description: "Please wait while we prepare your 3-day free trial.",
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planId }
      });

      if (error) throw error;

      if (data?.url) {
        // Open checkout in new tab for better user experience
        const newWindow = window.open(data.url, '_blank');
        if (!newWindow) {
          // Fallback to same tab if popup blocked
          window.location.href = data.url;
        }
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-24 px-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
            Choose Your <span className="text-primary">Leadership Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-lato">
            Start with a 3-day free trial. Cancel anytime during the trial period with no charges.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              3-Day Free Trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Cancel Anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              No Setup Fees
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loading === plan.id;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative p-8 ${plan.popular ? 'border-primary shadow-xl ring-2 ring-primary/20' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-playfair">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4 font-lato">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary font-playfair">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 font-lato">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">3-day free trial included</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-lato">{feature}</span>
                    </li>
                  ))}
                </ul>

                <ExecutiveButton
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isLoading}
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Redirecting...
                    </div>
                  ) : (
                    <>
                      Start Free Trial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </ExecutiveButton>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-lato">
            Your trial starts immediately with full access to all features. You won't be charged until after your 3-day trial period ends. 
            Cancel anytime during the trial with no charges.
          </p>
        </div>
      </div>
    </div>
  );
}