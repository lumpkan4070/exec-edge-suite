import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentHandlerProps {
  tier: string;
  priceId: string;
  amount: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentHandler({ tier, priceId, amount, onSuccess, onError }: PaymentHandlerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  // Real Stripe payment integration
  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.open(data.url, '_blank');
        setPaymentStatus('success');
        setIsProcessing(false);
        onSuccess();
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      setPaymentStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Payment failed';
      setErrorMessage(errorMsg);
      setIsProcessing(false);
      onError(errorMsg);
    }
  };

  const startFreeTrial = () => {
    // For demo purposes - in production, this would create a trial subscription
    console.log(`Starting free trial for ${tier} tier`);
    
    toast({
      title: "Free Trial Started! 🎉",
      description: `Your ${tier} trial is now active. You'll have full access for 3 days.`,
    });
    
    // Set trial data in localStorage for demo
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 3);
    localStorage.setItem('trialEnd', trialEnd.toISOString());
    localStorage.setItem('trialActive', 'true');
    localStorage.setItem('selectedTier', tier);
    
    onSuccess();
  };

  if (paymentStatus === 'success') {
    return (
      <div className="text-center p-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Payment Successful!</h3>
        <p className="text-muted-foreground">
          Welcome to the {tier} tier. Your executive transformation starts now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Start Your {tier} Transformation
        </h3>
        <p className="text-lg text-electric font-semibold">{amount}</p>
        <p className="text-sm text-muted-foreground mt-2">
          3-day free trial • Cancel anytime
        </p>
      </div>

      {paymentStatus === 'error' && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Free Trial */}
        <ExecutiveButton
          variant="hero"
          onClick={startFreeTrial}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing && paymentStatus === 'processing' ? (
            <>
              <Clock className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Start 3-Day Free Trial`
          )}
        </ExecutiveButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or pay now</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 gap-3">
          <ExecutiveButton
            variant="outline"
            onClick={handleStripeCheckout}
            disabled={isProcessing}
            className="w-full h-12"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Subscribe with Stripe
          </ExecutiveButton>
        </div>

      </div>
    </div>
  );
}