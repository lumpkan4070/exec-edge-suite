import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface PaymentHandlerProps {
  tier: string;
  planId: string;
  amount: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentHandler({ tier, planId, amount, onSuccess, onError }: PaymentHandlerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // PAY-001 to PAY-007: Payment flow simulation
  const handleStripePayment = async (cardValid: boolean = true) => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      if (cardValid) {
        setPaymentStatus('success');
        setIsProcessing(false);
        onSuccess();
      } else {
        setPaymentStatus('error');
        setErrorMessage('Payment failed. Please check your card details and try again.');
        setIsProcessing(false);
        onError('Invalid card details');
      }
    }, 2000);
  };

  const handleApplePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    // Simulate Apple Pay
    setTimeout(() => {
      setPaymentStatus('success');
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  const handleGooglePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    // Simulate Google Pay
    setTimeout(() => {
      setPaymentStatus('success');
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  const startFreeTrial = () => {
    // PAY-001: Free trial starts correctly
    console.log(`Starting 3-day free trial for ${tier} tier`);
    
    // Set trial expiration (3 days from now)
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
            onClick={() => handleStripePayment(true)}
            disabled={isProcessing}
            className="w-full h-12"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Credit Card
          </ExecutiveButton>

          <ExecutiveButton
            variant="outline"
            onClick={handleApplePayment}
            disabled={isProcessing}
            className="w-full h-12"
          >
            Apple Pay
          </ExecutiveButton>

          <ExecutiveButton
            variant="outline"
            onClick={handleGooglePayment}
            disabled={isProcessing}
            className="w-full h-12"
          >
            Google Pay
          </ExecutiveButton>
        </div>

        {/* Test Invalid Card */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">QA Testing:</p>
          <ExecutiveButton
            variant="ghost"
            size="sm"
            onClick={() => handleStripePayment(false)}
            disabled={isProcessing}
          >
            Test Invalid Card
          </ExecutiveButton>
        </div>
      </div>
    </div>
  );
}