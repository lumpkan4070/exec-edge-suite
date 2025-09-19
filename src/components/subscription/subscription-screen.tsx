import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Check, Crown, Zap, TrendingUp, Users, Target } from "lucide-react";

interface SubscriptionScreenProps {
  onBack: () => void;
  onSubscribe: (tier: string) => void;
}

const tiers = [
  {
    id: "pro",
    name: "Pro",
    price: "$49.99",
    period: "/month",
    description: "Core executive coaching + habits",
    features: [
      "AI Strategy Co-pilot",
      "Daily confidence boosts",
      "Executive habits tracker",
      "Performance analytics",
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
      "Team leadership tools",
      "Priority support",
      "Custom coaching sessions",
    ],
    icon: Crown,
    popular: true,
  },
];

const roiMetrics = [
  { icon: TrendingUp, text: "Close 23% more deals on average" },
  { icon: Users, text: "Increase team performance by 31%" },
  { icon: Target, text: "Boost confidence in 14 days" },
];

export default function SubscriptionScreen({ onBack, onSubscribe }: SubscriptionScreenProps) {
  return (
    <div className="min-h-screen bg-background dark:bg-primary">
      {/* Header */}
      <header className="border-b border-border p-4 flex items-center">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold text-foreground">Upgrade to Unlock Performance</h1>
          <p className="text-sm text-muted-foreground">Choose your executive edge</p>
        </div>
      </header>

      <div className="p-4 space-y-8">
        {/* ROI Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Executive ROI, Not Features
          </h2>
          <div className="space-y-3">
            {roiMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.text} className="flex items-center justify-center space-x-3">
                  <Icon className="w-5 h-5 text-electric" />
                  <span className="text-foreground">{metric.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="space-y-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={cn(
                  "executive-card p-6 relative",
                  tier.popular && "border-electric border-2"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-electric text-electric-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      tier.popular ? "bg-electric text-electric-foreground" : "bg-muted"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline">
                      <span className="metric-display text-2xl">{tier.price}</span>
                      <span className="text-muted-foreground text-sm">{tier.period}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-electric flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <ExecutiveButton
                  variant={tier.popular ? "hero" : "primary"}
                  onClick={() => onSubscribe(tier.id)}
                  className="w-full"
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