import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowRight, DollarSign, Zap, Crown, Home } from "lucide-react";
import { Link } from "react-router-dom";
import apexLogo from "@/assets/apex-logo-updated.png";

interface ObjectiveScreenProps {
  role: string;
  tier: string;
  onComplete: (objective: string) => void;
}

const objectivesByRole: Record<string, Array<{
  id: string;
  title: string;
  description: string;
  icon: any;
}>> = {
  "sales-leader": [
    {
      id: "close-deals",
      title: "Close More Deals",
      description: "Boost confidence in negotiations and client meetings",
      icon: DollarSign,
    },
    {
      id: "lead-team",
      title: "Lead High-Performance Team",
      description: "Inspire and motivate your sales organization",
      icon: Crown,
    },
    {
      id: "strategic-growth",
      title: "Drive Strategic Growth",
      description: "Navigate complex deals and market expansion",
      icon: Zap,
    },
  ],
  "entrepreneur": [
    {
      id: "raise-funding",
      title: "Raise Funding",
      description: "Master investor pitches and funding conversations",
      icon: DollarSign,
    },
    {
      id: "scale-business",
      title: "Scale My Business",
      description: "Build systems and lead through growth phases",
      icon: Zap,
    },
    {
      id: "strategic-decisions",
      title: "Make Strategic Decisions",
      description: "Navigate uncertainty with confidence and clarity",
      icon: Crown,
    },
  ],
  "executive": [
    {
      id: "lead-team",
      title: "Lead Team Excellence",
      description: "Inspire and align high-performing teams",
      icon: Crown,
    },
    {
      id: "strategic-vision",
      title: "Execute Strategic Vision",
      description: "Drive organizational transformation and growth",
      icon: Zap,
    },
    {
      id: "stakeholder-management",
      title: "Master Stakeholder Relations",
      description: "Navigate complex relationships and communications",
      icon: DollarSign,
    },
  ],
};

export default function ObjectiveScreen({ role, tier, onComplete }: ObjectiveScreenProps) {
  const [selectedObjective, setSelectedObjective] = useState<string>("");
  const objectives = objectivesByRole[role] || objectivesByRole["executive"];

  const getTierTheme = () => {
    switch (tier) {
      case 'professional': return 'professional-theme';
      case 'personal': return 'personal-theme';
      default: return '';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "sales-leader": return "Sales Leader";
      case "entrepreneur": return "Entrepreneur";
      case "executive": return "Executive";
      case "freelancer": return "Freelancer";
      case "manager": return "Manager";
      case "analyst": return "Analyst";
      case "confidence": return "Confidence Building";
      case "motivation": return "Motivation";
      case "lifestyle": return "Lifestyle Improvement";
      default: return "Executive";
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", getTierTheme())}>
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-8 animate-executive-slide-in">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Perfect, {getRoleTitle(role)}
            </h1>
            <p className="text-lg text-muted-foreground">
              What's your primary objective?
            </p>
          </div>

        {/* Objective Selection */}
        <div className="space-y-3">
          {objectives.map((objective) => {
            const Icon = objective.icon;
            return (
              <button
                key={objective.id}
                onClick={() => setSelectedObjective(objective.id)}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                  selectedObjective === objective.id
                    ? "border-electric bg-electric/10"
                    : "border-border hover:border-electric/50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    selectedObjective === objective.id ? "bg-electric text-electric-foreground" : "bg-muted"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{objective.title}</h3>
                    <p className="text-sm text-muted-foreground">{objective.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <ExecutiveButton
          variant="hero"
          onClick={() => selectedObjective && onComplete(selectedObjective)}
          disabled={!selectedObjective}
          className="w-full"
        >
          Begin My Executive Transformation
          <ArrowRight className="ml-2 h-5 w-5" />
        </ExecutiveButton>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Tailored AI coaching starts immediately
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