import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowRight, Crown, Briefcase, Heart, Check, Home } from "lucide-react";
import { Link } from "react-router-dom";
import apexLogo from "@/assets/apex-logo-transparent.png";

interface TierSelectionProps {
  onNext: (tier: string) => void;
}

const tiers = [
  {
    id: "professional",
    name: "Professional Edition",
    price: "$99",
    period: "/month",
    tagline: "Your Executive Edge",
    description: "Advanced training for senior leaders and executives",
    features: [
      "AI Strategy Co-pilot",
      "Executive Dashboard & Analytics", 
      "Scenario Library (Pitch, Negotiate)",
      "Voice Coaching Mode",
      "Weekly Executive Briefings"
    ],
    icon: Crown,
    theme: "professional-theme",
    popular: true
  },
  {
    id: "personal", 
    name: "Personal Plan",
    price: "$29",
    period: "/month",
    tagline: "Build Your Leadership Foundation",
    description: "Perfect for individual professionals building their leadership foundation",
    features: [
      "Basic AI Strategy Co-pilot",
      "5 scenario simulations/month",
      "Performance habit tracking",
      "Basic analytics",
      "Email support"
    ],
    icon: Briefcase,
    theme: "personal-theme",
    popular: false
  }
];

export default function TierSelection({ onNext }: TierSelectionProps) {
  const [selectedTier, setSelectedTier] = useState<string>("professional");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full space-y-8 animate-executive-slide-in">
          {/* Header */}
          <div className="text-center">
            <div className="mb-8">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-20 mx-auto mb-6"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Performance Edge
            </h1>
            <p className="text-lg text-muted-foreground">
              Three tiers designed for different career stages and goals
            </p>
          </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={cn(
                  "executive-card p-6 cursor-pointer transition-all duration-200 relative",
                  selectedTier === tier.id 
                    ? "border-electric border-2 scale-105 shadow-xl" 
                    : "hover:border-electric/50 hover:scale-102"
                )}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-electric text-electric-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center",
                    selectedTier === tier.id ? "bg-electric text-electric-foreground" : "bg-muted"
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-electric font-semibold text-lg">{tier.tagline}</p>
                  <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground ml-1">{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "w-4 h-4 rounded-full border-2 mx-auto",
                  selectedTier === tier.id 
                    ? "bg-electric border-electric" 
                    : "border-muted-foreground"
                )}>
                  {selectedTier === tier.id && (
                    <div className="w-2 h-2 bg-electric-foreground rounded-full m-0.5" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <ExecutiveButton
            variant="hero"
            onClick={() => selectedTier && onNext(selectedTier)}
            className="px-12 py-4 text-lg"
          >
            Start with {tiers.find(t => t.id === selectedTier)?.name}
            <ArrowRight className="ml-2 h-5 w-5" />
          </ExecutiveButton>
          
            <p className="text-sm text-muted-foreground">
              Free trial included • Switch tiers anytime • Cancel easily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}