import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Check, Crown, Zap, TrendingUp, Users, Target, Briefcase, Heart } from "lucide-react";

interface SubscriptionScreenProps {
  onBack: () => void;
  onSubscribe: (tier: string) => void;
  currentTier: string;
}

const tierPlans = {
  executive: [
    {
      id: "pro",
      name: "Pro",
      price: "$49.99",
      period: "/month",
      description: "Core executive coaching + habits",
      features: [
        "AI Strategy Co-pilot",
        "Executive Dashboard & Analytics",
        "Daily confidence boosts",
        "Performance habits tracker",
        "Email support",
      ],
      icon: Zap,
      popular: false,
    },
    {
      id: "executive",
      name: "Executive",
      price: "$99.99", 
      period: "/month",
      description: "Complete executive transformation suite",
      features: [
        "Everything in Pro",
        "Scenario library & simulations",
        "Weekly AI performance report",
        "Voice coaching mode",
        "Team leadership tools",
        "Priority support",
      ],
      icon: Crown,
      popular: true,
    },
  ],
  professional: [
    {
      id: "core",
      name: "Core",
      price: "$19.99",
      period: "/month", 
      description: "Essential career growth tools",
      features: [
        "AI Growth Coach",
        "Daily confidence boosts",
        "Performance dashboard",
        "Career habits tracker",
        "Email support",
      ],
      icon: Briefcase,
      popular: false,
    },
    {
      id: "advanced",
      name: "Advanced",
      price: "$29.99",
      period: "/month",
      description: "Complete professional development",
      features: [
        "Everything in Core",
        "Mini-scenarios (Interview, Client)",
        "Weekly progress reports",
        "Advanced analytics",
        "Priority support",
      ],
      icon: TrendingUp,
      popular: true,
    },
  ],
  personal: [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "/month",
      description: "Daily motivation and confidence",
      features: [
        "AI Daily Motivation Coach",
        "Confidence tracker & streaks",
        "Daily affirmations",
        "Basic journaling",
        "Community support",
      ],
      icon: Heart,
      popular: false,
    },
    {
      id: "premium",
      name: "Premium", 
      price: "$14.99",
      period: "/month",
      description: "Complete personal growth experience",
      features: [
        "Everything in Basic",
        "Gamified challenges",
        "Social sharing",
        "Advanced affirmations",
        "Personal insights",
      ],
      icon: Crown,
      popular: true,
    },
  ],
};

const roiMetrics = [
  { icon: TrendingUp, text: "Close 23% more deals on average" },
  { icon: Users, text: "Increase team performance by 31%" },
  { icon: Target, text: "Boost confidence in 14 days" },
];

export default function SubscriptionScreen({ onBack, onSubscribe, currentTier }: SubscriptionScreenProps) {
  const tiers = tierPlans[currentTier as keyof typeof tierPlans] || tierPlans.executive;
  
  const getTierTheme = () => {
    switch (currentTier) {
      case 'professional': return 'professional-theme';
      case 'personal': return 'personal-theme';
      default: return '';
    }
  };

  const getTierTitle = () => {
    switch (currentTier) {
      case 'executive': return 'Upgrade to Unlock Performance';
      case 'professional': return 'Accelerate Your Career Growth';
      case 'personal': return 'Unlock Your Confidence Journey';
      default: return 'Upgrade to Unlock Performance';
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", getTierTheme())}>
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getTierTitle()}</h1>
            <p className="text-muted-foreground font-medium">
              {currentTier === 'personal' ? 'Choose your growth plan' : 
               currentTier === 'professional' ? 'Choose your career edge' : 
               'Choose your executive edge'}
            </p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-10 max-w-4xl mx-auto">
        {/* ROI Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Executive ROI, Not Features
          </h2>
          <div className="space-y-4">
            {roiMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.text} className="flex items-center justify-center space-x-4">
                  <Icon className="w-6 h-6 text-electric" />
                  <span className="text-foreground font-medium text-lg">{metric.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={cn(
                  "executive-card p-8 relative shadow-lg hover:shadow-xl transition-all duration-200",
                  tier.popular && "border-electric border-2 scale-105"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-electric text-electric-foreground px-6 py-2 rounded-full font-bold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md",
                      tier.popular ? "bg-electric text-electric-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-muted-foreground font-medium">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline">
                      <span className="metric-display text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground font-medium">{tier.period}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-4">
                      <Check className="w-5 h-5 text-electric flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <ExecutiveButton
                  variant={tier.popular ? "primary" : "secondary"}
                  onClick={() => onSubscribe(tier.id)}
                  className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg"
                >
                  {tier.popular ? "Start Executive Transformation" : "Choose Pro"}
                </ExecutiveButton>
              </div>
            );
          })}
        </div>

        {/* Trial Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            3-day free trial • Cancel anytime • Results guaranteed
          </p>
          <p className="text-xs text-muted-foreground">
            Join 2,847+ executives already transforming their performance
          </p>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}