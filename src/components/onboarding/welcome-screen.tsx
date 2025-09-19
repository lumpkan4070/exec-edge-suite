import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowRight, Target, TrendingUp, Users } from "lucide-react";

interface WelcomeScreenProps {
  onNext: (role: string) => void;
}

const roles = [
  {
    id: "sales-leader",
    title: "Sales Leader",
    description: "Drive revenue and close more deals",
    icon: TrendingUp,
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    description: "Scale your business and lead with confidence",
    icon: Target,
  },
  {
    id: "executive",
    title: "Executive",
    description: "Lead teams and make strategic decisions",
    icon: Users,
  },
];

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <div className="min-h-screen bg-background dark:bg-primary flex items-center justify-center px-4">
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
            "Your Executive Edge in 90 Days"
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-foreground">
            Select Your Role
          </h2>
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
          onClick={() => selectedRole && onNext(selectedRole)}
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
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}