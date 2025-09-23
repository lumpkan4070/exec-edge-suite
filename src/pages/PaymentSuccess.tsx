import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Crown, ArrowRight } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Card } from "@/components/ui/card";
import apexLogo from "@/assets/apex-logo-v3.png";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
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
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-playfair">
            Trial Started Successfully!
          </h1>
          <p className="text-xl text-muted-foreground font-lato">
            Welcome to APEX Executive. Your 3-day free trial is now active.
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-primary mr-2" />
            <span className="text-lg font-semibold text-primary font-playfair">
              Trial: 3 Days Remaining
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-lato">
            You have full access to all features until your trial ends. You'll only be charged if you continue after the trial period.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm font-playfair">Full Access</h3>
            <p className="text-xs text-muted-foreground font-lato">All premium features</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm font-playfair">No Charges</h3>
            <p className="text-xs text-muted-foreground font-lato">Until trial ends</p>
          </div>
          <div className="text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm font-playfair">Cancel Anytime</h3>
            <p className="text-xs text-muted-foreground font-lato">No commitment</p>
          </div>
        </div>

        <ExecutiveButton
          onClick={handleGoToDashboard}
          variant="primary"
          size="lg"
          className="w-full mb-4"
        >
          Start Training Now
          <ArrowRight className="w-5 h-5 ml-2" />
        </ExecutiveButton>

        <p className="text-sm text-muted-foreground font-lato">
          Redirecting to dashboard in {countdown} seconds...
          {sessionId && (
            <span className="block mt-2 text-xs">
              Session ID: {sessionId.substring(0, 20)}...
            </span>
          )}
        </p>
      </Card>
    </div>
  );
}