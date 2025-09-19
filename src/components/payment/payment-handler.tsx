import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { CreditCard, AlertCircle, CheckCircle, Clock, Home, ArrowLeft, Shield, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/user-context";
import AuthModal from "@/components/auth/auth-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      
      // Provide user-friendly error messages
      let errorMsg = 'Payment could not be processed. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('timeout')) {
          errorMsg = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('Invalid') || error.message.includes('authentication')) {
          errorMsg = 'Authentication error. Please sign in again and retry.';
        } else if (error.message.includes('Edge Function')) {
          errorMsg = 'Payment service temporarily unavailable. Please try again in a moment.';
        }
      }
      
      setErrorMessage(errorMsg);
      setIsProcessing(false);
      onError(errorMsg);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, automatically proceed to checkout
    // Add a small delay to ensure the auth state is updated
    setTimeout(() => {
      handleStripeCheckout();
    }, 1000);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">
              Welcome to the {tier} tier. Your executive transformation starts now.
            </p>
            <div className="space-y-3">
            <ExecutiveButton
                onClick={goHome}
                className="w-full"
                variant="primary"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </ExecutiveButton>
              <ExecutiveButton
                variant="ghost"
                onClick={goBack}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Plans
              </ExecutiveButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getTierIcon = () => {
    switch (tier.toLowerCase()) {
      case 'personal':
        return <Star className="w-6 h-6" />;
      case 'professional':
        return <Shield className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  const getTierFeatures = () => {
    switch (tier.toLowerCase()) {
      case 'personal':
        return ['AI Strategy Copilot', 'Basic Analytics', 'Mobile Access'];
      case 'professional':
        return ['AI Strategy Copilot', 'Advanced Analytics', 'Priority Support', 'Team Features'];
      default:
        return ['All Premium Features'];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="flex min-h-screen">
        {/* Left Side - Preview */}
        <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-indigo-800/90" />
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            {/* Back Button */}
            <button
              onClick={goBack}
              className="absolute top-6 left-6 flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            {/* Amount Display */}
            <div className="text-center mb-12">
              <div className="text-5xl font-bold mb-2">{amount}</div>
              <div className="text-xl opacity-90">per month</div>
            </div>

            {/* Transaction Preview */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {getTierIcon()}
                </div>
                <div>
                  <div className="font-semibold">From Your Account</div>
                  <div className="text-sm opacity-80">Payment Method</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">To APEX {tier}</div>
                  <div className="text-sm opacity-80">Executive Platform</div>
                </div>
              </div>

              {isProcessing && (
                <div className="flex items-center justify-center space-x-3 bg-blue-500/20 rounded-2xl p-4 backdrop-blur-sm">
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>

            {/* Features Preview */}
            <div className="mt-12 space-y-3">
              <h4 className="font-semibold text-lg">What's included:</h4>
              {getTierFeatures().map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="opacity-90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-white">
          <div className="flex flex-col min-h-screen">
            {/* Header with Steps */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goBack}
                  className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={goHome}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </button>
              </div>

              {/* Steps */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <span className="font-medium text-gray-900">Subscription Details</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm">
                    2
                  </div>
                  <span className="text-gray-600">Review Details</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm">
                    3
                  </div>
                  <span className="text-gray-600">Pay</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Details</h2>
                <p className="text-gray-600 mb-8">
                  Complete your subscription to APEX {tier} plan.
                </p>

                {/* Mobile Plan Preview */}
                <div className="lg:hidden bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{amount}</div>
                    <div className="opacity-90">per month</div>
                    <div className="mt-4 text-sm">
                      3-day free trial • Cancel anytime
                    </div>
                  </div>
                </div>

                {paymentStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Details */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Plan Selected</Label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getTierIcon()}
                            <span className="font-semibold text-gray-900">APEX {tier}</span>
                          </div>
                          <span className="font-bold text-blue-600">{amount}/month</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="trial-info" className="text-sm font-medium text-gray-700">
                        Trial Information
                      </Label>
                      <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-800">
                          🎉 Start with a 3-day free trial. Cancel anytime before the trial ends.
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billing-note" className="text-sm font-medium text-gray-700">
                        Billing Note <span className="text-gray-500">(Optional)</span>
                      </Label>
                      <textarea
                        id="billing-note"
                        placeholder="Add a note for your records..."
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 pt-6">
                    <ExecutiveButton
                      onClick={startFreeTrial}
                      disabled={isProcessing}
                      className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing && paymentStatus === 'processing' ? (
                        <>
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          Starting Trial...
                        </>
                      ) : (
                        'Start Free Trial'
                      )}
                    </ExecutiveButton>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-500">Or subscribe immediately</span>
                      </div>
                    </div>

                    <ExecutiveButton
                      variant="outline"
                      onClick={handleStripeCheckout}
                      disabled={isProcessing}
                      className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {user ? 'Subscribe Now' : 'Sign In & Subscribe'}
                    </ExecutiveButton>
                  </div>
                </div>
              </div>
            </div>
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
  );
}