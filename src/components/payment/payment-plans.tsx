import React, { useState } from 'react';
import { Check, Zap, Crown, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PLANS = {
  personal: {
    id: 'personal',
    name: 'Personal Plan',
    price: '$29.99',
    period: '/month',
    priceId: 'price_1SANjlBgt7hUXmS2Bl7WSvni',
    icon: Zap,
    description: 'Perfect for individual professionals building their leadership foundation',
    features: [
      'Executive coaching sessions',
      'Performance habit tracking',
      'Personal development plans',
      'Basic analytics dashboard',
      '3-day free trial'
    ],
    popular: false
  },
  professional: {
    id: 'professional',
    name: 'Professional Plan',
    price: '$99.99',
    period: '/year',
    priceId: 'price_1SANkBBgt7hUXmS2W41coyhD',
    icon: Crown,
    description: 'Advanced training for senior leaders and executives',
    features: [
      'Everything in Personal',
      'AI strategy copilot',
      'Advanced scenario library',
      'Team management tools',
      'Priority support',
      '3-day free trial'
    ],
    popular: true
  }
};

interface PaymentPlansProps {
  onPlanSelect?: (planId: string) => void;
}

export const PaymentPlans: React.FC<PaymentPlansProps> = ({ onPlanSelect }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartTrial = async (plan: typeof PLANS.personal) => {
    setLoading(plan.id);
    
    console.log(`[PAYMENT] Starting ${plan.name} trial - Price ID: ${plan.priceId}`);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('[PAYMENT] No session found, redirecting to auth');
        toast({
          title: "Authentication Required",
          description: "Please sign in to start your free trial.",
          variant: "destructive"
        });
        setLoading(null);
        return;
      }

      console.log('[PAYMENT] Creating checkout session...');
      
      // Show toast for loading state
      toast({
        title: "Redirecting to Secure Checkout...",
        description: "Please wait while we prepare your checkout session.",
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: plan.priceId }
      });

      if (error) {
        console.error('[PAYMENT] Error creating checkout:', error);
        toast({
          title: "Checkout Error",
          description: "Failed to create checkout session. Please try again.",
          variant: "destructive"
        });
        setLoading(null);
        return;
      }

      if (data?.url) {
        console.log('[PAYMENT] Redirecting to Stripe:', data.url);
        // Open Stripe checkout in same window for better UX
        window.location.href = data.url;
      } else {
        console.error('[PAYMENT] No checkout URL received');
        toast({
          title: "Checkout Error", 
          description: "No checkout URL received. Please try again.",
          variant: "destructive"
        });
        setLoading(null);
      }
    } catch (error) {
      console.error('[PAYMENT] Checkout error:', error);
      toast({
        title: "Payment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setLoading(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {Object.values(PLANS).map((plan) => {
        const IconComponent = plan.icon;
        const isLoading = loading === plan.id;
        
        return (
          <Card 
            key={plan.id}
            className={`relative p-8 transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'border-primary shadow-lg scale-105' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="mb-4">
                <IconComponent className="w-12 h-12 mx-auto text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
              <p className="text-sm text-primary mt-2 font-medium">3-day free trial</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleStartTrial(plan)}
              disabled={isLoading}
              className={`w-full py-3 text-lg font-medium transition-all duration-200 ${
                plan.popular 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Redirecting to Secure Checkout...
                </div>
              ) : (
                'Start Free Trial'
              )}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};