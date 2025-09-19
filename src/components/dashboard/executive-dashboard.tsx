import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { MessageSquare, Target, BarChart3, Settings, Zap, TrendingUp, Users } from "lucide-react";

interface DashboardProps {
  userName: string;
  role: string;
  objective: string;
  onNavigate: (screen: string) => void;
}

export default function ExecutiveDashboard({ userName, role, objective, onNavigate }: DashboardProps) {
  const [confidenceLevel] = useState(78);

  const getTodaysBoost = () => {
    const boosts = [
      "Your negotiation power increases 40% when you pause before responding. Use this in today's meetings.",
      "High performers visualize success 3x more than average. Spend 2 minutes visualizing your ideal outcome before big conversations.",
      "Executive presence is 67% body language. Stand tall, make eye contact, and own your space today.",
      "The most successful leaders ask 'What would this look like if it were easy?' Try this framework in your next challenge.",
    ];
    return boosts[Math.floor(Math.random() * boosts.length)];
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="min-h-screen bg-background dark:bg-primary">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {getTimeOfDay()}, {userName}
            </h1>
            <p className="text-sm text-muted-foreground">Let's frame your day for success</p>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Today's Executive Boost */}
        <div className="executive-card p-6 animate-executive-slide-in">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-4 h-4 text-electric-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Today's Executive Boost</h2>
          </div>
          <p className="text-foreground leading-relaxed">{getTodaysBoost()}</p>
        </div>

        {/* Confidence Meter */}
        <div className="executive-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Performance Confidence</h3>
            <span className="metric-display text-2xl">{confidenceLevel}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div 
              className="confidence-meter h-3 transition-all duration-500 ease-out animate-confidence-pulse"
              style={{ width: `${confidenceLevel}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Peak executive performance zone: 80%+
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Executive Tools</h3>
          
          <ExecutiveButton
            variant="primary"
            onClick={() => onNavigate('ai-copilot')}
            className="w-full h-16 justify-start"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-semibold">AI Strategy Co-pilot</div>
              <div className="text-sm opacity-80">Get strategic insights and confidence boosts</div>
            </div>
          </ExecutiveButton>

          <ExecutiveButton
            variant="secondary"
            onClick={() => onNavigate('scenarios')}
            className="w-full h-16 justify-start"
          >
            <Target className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-semibold">Scenario Library</div>
              <div className="text-sm opacity-80">Practice high-stakes situations</div>
            </div>
          </ExecutiveButton>

          <ExecutiveButton
            variant="secondary"
            onClick={() => onNavigate('habits')}
            className="w-full h-16 justify-start"
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-semibold">Executive Habits</div>
              <div className="text-sm opacity-80">Track performance-critical behaviors</div>
            </div>
          </ExecutiveButton>
        </div>

        {/* Status */}
        <div className="executive-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-electric rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">Trial Active</span>
            </div>
            <ExecutiveButton
              variant="outline"
              size="sm"
              onClick={() => onNavigate('subscription')}
            >
              Upgrade to Pro
            </ExecutiveButton>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-2">
          {[
            { icon: TrendingUp, label: "Home", active: true },
            { icon: MessageSquare, label: "Chat", active: false },
            { icon: BarChart3, label: "Habits", active: false },
            { icon: Users, label: "Profile", active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={cn(
                  "flex flex-col items-center py-2 px-4 transition-colors",
                  item.active 
                    ? "text-electric" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}