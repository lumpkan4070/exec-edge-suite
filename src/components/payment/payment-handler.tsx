import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { CreditCard, AlertCircle, CheckCircle, Clock, Home, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/user-context";
import AuthModal from "@/components/auth/auth-modal";

interface PaymentHandlerProps {
  tier: string;
  priceId: string;
  amount: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onBack?: () => void;
}

export default function PaymentHandler({ tier, priceId, amount, onSuccess, onError, onBack }: PaymentHandlerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, session } = useUser();

  // Check authentication and handle Stripe checkout
  const handleStripeCheckout = async () => {
    // Check if user is authenticated
    if (!user || !session) {
      setShowAuthModal(true);
      return;
    }

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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, automatically proceed to checkout
    setTimeout(() => {
      handleStripeCheckout();
    }, 500);
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

  const goHome = () => {
    window.location.href = '/';
  };

  const goBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/#pricing';
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border p-6 bg-card shadow-sm">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <ExecutiveButton
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </ExecutiveButton>
              <ExecutiveButton
                variant="ghost"
                size="sm"
                onClick={goHome}
                className="font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </ExecutiveButton>
            </div>
          </div>
        </header>

        <div className="text-center p-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground">
            Welcome to the {tier} tier. Your executive transformation starts now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <ExecutiveButton
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </ExecutiveButton>
            <ExecutiveButton
              variant="ghost"
              size="sm"
              onClick={goHome}
              className="font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </ExecutiveButton>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Subscribe to {tier}</h1>
            <p className="text-muted-foreground font-medium">Complete your subscription</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
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
                {user ? 'Subscribe with Stripe' : 'Sign In & Subscribe'}
              </ExecutiveButton>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  );
}