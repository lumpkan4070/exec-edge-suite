import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import apexLogo from "@/assets/apex-logo-v3.png";

export default function PaymentCancel() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/#pricing");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-6">
      <Card className="max-w-2xl w-full p-8 text-center shadow-xl">
        <div className="mb-8">
          <img 
            src={apexLogo} 
            alt="APEX Executive Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-playfair">
            Payment Cancelled
          </h1>
          <p className="text-xl text-muted-foreground font-lato">
            No worries! Your payment was cancelled and no charges were made.
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-8">
          <p className="text-muted-foreground font-lato">
            Your trial hasn't started yet. You can try again anytime to begin your 3-day free trial 
            and experience the full power of APEX Executive training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h3 className="font-semibold text-sm mb-2 font-playfair">Still Free to Try</h3>
            <p className="text-xs text-muted-foreground font-lato">
              3-day trial with no commitment
            </p>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h3 className="font-semibold text-sm mb-2 font-playfair">Cancel Anytime</h3>
            <p className="text-xs text-muted-foreground font-lato">
              No charges during trial period
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ExecutiveButton
            onClick={handleTryAgain}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </ExecutiveButton>
          
          <ExecutiveButton
            onClick={handleGoHome}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </ExecutiveButton>
        </div>

        <p className="text-sm text-muted-foreground mt-6 font-lato">
          Have questions? Contact our support team for assistance with your trial setup.
        </p>
      </Card>
    </div>
  );
}