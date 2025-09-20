import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowRight, Target, TrendingUp, Users, Crown, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeScreenProps {
  onNext: (role: string) => void;
  tier: string;
}

// Roles by tier
const rolesByTier = {
  executive: [
    { id: "sales-leader", title: "Sales Leader", description: "Drive revenue and close more deals", icon: TrendingUp },
    { id: "entrepreneur", title: "Entrepreneur", description: "Scale your business and lead with confidence", icon: Target },
    { id: "executive", title: "Executive", description: "Lead teams and make strategic decisions", icon: Users }
  ],
  professional: [
    { id: "freelancer", title: "Freelancer", description: "Build your client base and grow income", icon: Target },
    { id: "manager", title: "Manager", description: "Lead teams and improve productivity", icon: Users },
    { id: "analyst", title: "Analyst", description: "Advance your career with confidence", icon: TrendingUp }
  ],
  personal: [
    { id: "confidence", title: "Build Confidence", description: "Overcome self-doubt and speak up", icon: Target },
    { id: "motivation", title: "Stay Motivated", description: "Maintain momentum and achieve goals", icon: TrendingUp },
    { id: "lifestyle", title: "Improve Lifestyle", description: "Create positive daily habits", icon: Users }
  ]
};

export default function WelcomeScreen({ onNext, tier }: WelcomeScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showError, setShowError] = useState(false);
  
  const roles = rolesByTier[tier as keyof typeof rolesByTier] || rolesByTier.executive;
  
  const getTierTheme = () => {
    switch (tier) {
      case 'professional': return 'professional-theme';
      case 'personal': return 'personal-theme';
      default: return '';
    }
  };

  const getTierTagline = () => {
    switch (tier) {
      case 'executive': return '"Your Executive Edge in 90 Days"';
      case 'professional': return '"Level Up Your Career"';
      case 'personal': return '"Grow Your Confidence Daily"';
      default: return '"Your Executive Edge in 90 Days"';
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", getTierTheme())}>
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-electric" />
              <span className="text-2xl font-bold text-foreground">APEX</span>
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-8 animate-executive-slide-in">
          {/* Logo/Brand */}
          <div className="text-center">
            <div className="w-16 h-16 bg-electric rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Target className="w-8 h-8 text-electric-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Executive Performance Coach
            </h1>
            <p className="text-xl text-electric font-semibold">
              {getTierTagline()}
            </p>
          </div>

        {/* Role Selection - ONB-005: Block without selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-foreground">
            {tier === 'personal' ? 'Select Your Goal' : tier === 'professional' ? 'Select Your Stage' : 'Select Your Role'}
          </h2>
          {showError && !selectedRole && (
            <div className="text-center text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              Please select a role to continue
            </div>
          )}
          <div className="space-y-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                    selectedRole === role.id
                      ? "border-electric bg-electric/10"
                      : "border-border hover:border-electric/50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selectedRole === role.id ? "bg-electric text-electric-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ExecutiveButton
          variant="hero"
          onClick={() => {
            if (selectedRole) {
              onNext(selectedRole);
            } else {
              setShowError(true);
            }
          }}
          disabled={!selectedRole}
          className="w-full"
        >
          Start My Coaching Trial
          <ArrowRight className="ml-2 h-5 w-5" />
        </ExecutiveButton>

          <p className="text-xs text-center text-muted-foreground">
            3-day trial • No commitment • Premium results
          </p>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}