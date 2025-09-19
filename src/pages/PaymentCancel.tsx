import { X, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";

export default function PaymentCancel() {
  const handleBackToPlans = () => {
    window.location.href = '/#pricing';
  };

  const handleTryAgain = () => {
    window.location.href = '/';
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center max-w-4xl mx-auto">
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
      </header>

      <div className="flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
        <div className="executive-card p-8 shadow-xl">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Your payment was cancelled. Don't worry - no charges were made. You can try again whenever you're ready to start your executive transformation journey.
          </p>

          <div className="space-y-4">
            <ExecutiveButton
              onClick={handleTryAgain}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Try Again
              <ArrowRight className="w-5 h-5 ml-2" />
            </ExecutiveButton>
            
            <ExecutiveButton
              onClick={handleBackToPlans}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Plans
            </ExecutiveButton>
            
            <p className="text-sm text-muted-foreground">
              Questions? Contact our support team for assistance.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}