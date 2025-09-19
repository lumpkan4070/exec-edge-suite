import { useState, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { MessageSquare, Target, BarChart3, Settings, Zap, TrendingUp, Users, Brain, Trophy, Clock } from "lucide-react";

interface DashboardProps {
  userName: string;
  role: string;
  objective: string;
  onNavigate: (screen: string) => void;
}

export default function ExecutiveDashboard({ userName, role, objective, onNavigate }: DashboardProps) {
  const [confidenceLevel, setConfidenceLevel] = useState(78);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    meetingsPrepped: 12,
    dealsAdvanced: 5,
    teamInteractions: 8,
    weeklyGrowth: 15
  });

  const getTodaysBoost = () => {
    const roleSpecificBoosts = {
      "sales-leader": [
        "💰 SALES EDGE: Your closing power increases 40% when you pause 3 seconds before responding to objections. Use this in today's negotiations.",
        "🎯 REVENUE BOOST: High-performing sales leaders visualize the signed contract 3x more than average. Spend 2 minutes seeing today's deal closed.",
        "⚡ AUTHORITY MOVE: Frame every client interaction around their Q4 objectives. Ask: 'How does this impact your year-end goals?' Instant executive credibility."
      ],
      "entrepreneur": [
        "🚀 FOUNDER POWER: Investor confidence increases 60% when you lead with market size, not product features. Start every pitch with the billion-dollar opportunity.",
        "💡 STRATEGIC EDGE: The most successful entrepreneurs ask 'What would this look like if it were easy?' Apply this framework to today's biggest challenge.",
        "🎯 EXECUTION BOOST: Executive presence is 67% decisive communication. Make statements, not suggestions. Own your space and decisions today."
      ],
      "executive": [
        "👑 LEADERSHIP EDGE: Team performance increases 45% when you create psychological safety first. Start today's interactions with: 'What are we not seeing?'",
        "⚡ STRATEGIC POWER: High-impact executives think in systems, not tasks. Before any decision, ask: 'What second-order effects am I missing?'",
        "🎯 AUTHORITY BUILDER: Executive presence = Preparation × Authenticity × Decisive Action. You control all three. Master them today."
      ]
    };
    
    const boosts = roleSpecificBoosts[role as keyof typeof roleSpecificBoosts] || roleSpecificBoosts.executive;
    return boosts[Math.floor(Math.random() * boosts.length)];
  };

  // Simulate confidence growth over time
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidenceLevel(prev => {
        const growth = Math.random() * 2 - 1; // -1 to +1
        const newLevel = Math.max(65, Math.min(95, prev + growth));
        return Math.round(newLevel);
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {getTimeOfDay()}, {userName}
            </h1>
            <p className="text-muted-foreground font-medium">Let's frame your day for executive success</p>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Today's Executive Boost */}
        <div className="executive-card p-8 animate-fade-in shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-electric rounded-2xl flex items-center justify-center mr-4 shadow-md">
              <Zap className="w-6 h-6 text-electric-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Today's Executive Boost</h2>
          </div>
          <p className="text-foreground leading-relaxed text-lg font-medium">{getTodaysBoost()}</p>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Confidence Meter */}
          <div className="executive-card p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Brain className="w-6 h-6 text-electric mr-3" />
                <h3 className="text-lg font-bold text-foreground">Confidence Level</h3>
              </div>
              <span className="metric-display text-3xl font-mono font-bold text-electric">{confidenceLevel}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-3 shadow-inner">
              <div 
                className="confidence-meter h-3 transition-all duration-700 ease-out rounded-full shadow-sm"
                style={{ width: `${confidenceLevel}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Peak zone: 80%+ • Growing: +{performanceMetrics.weeklyGrowth}% this week
            </p>
          </div>

          {/* Weekly Performance */}
          <div className="executive-card p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-electric mr-3" />
              <h3 className="text-lg font-bold text-foreground">This Week's Impact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Meetings Prepped</span>
                <span className="text-2xl font-bold text-electric">{performanceMetrics.meetingsPrepped}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Deals Advanced</span>
                <span className="text-2xl font-bold text-electric">{performanceMetrics.dealsAdvanced}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Team Interactions</span>
                <span className="text-2xl font-bold text-electric">{performanceMetrics.teamInteractions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Executive Tools</h3>
          
          <ExecutiveButton
            variant="primary"
            onClick={() => onNavigate('ai-copilot')}
            className="w-full h-20 justify-start shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <MessageSquare className="mr-4 h-6 w-6" />
            <div className="text-left">
              <div className="font-bold text-lg">AI Strategy Co-pilot</div>
              <div className="text-sm opacity-90">Get strategic insights and confidence boosts</div>
            </div>
          </ExecutiveButton>

          <ExecutiveButton
            variant="secondary"
            onClick={() => onNavigate('scenarios')}
            className="w-full h-20 justify-start shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Target className="mr-4 h-6 w-6" />
            <div className="text-left">
              <div className="font-bold text-lg">Scenario Library</div>
              <div className="text-sm opacity-90">Practice high-stakes situations</div>
            </div>
          </ExecutiveButton>

          <ExecutiveButton
            variant="secondary"
            onClick={() => onNavigate('habits')}
            className="w-full h-20 justify-start shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <BarChart3 className="mr-4 h-6 w-6" />
            <div className="text-left">
              <div className="font-bold text-lg">Executive Habits</div>
              <div className="text-sm opacity-90">Track performance-critical behaviors</div>
            </div>
          </ExecutiveButton>
        </div>

        {/* Status */}
        <div className="executive-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-electric rounded-full mr-3 animate-pulse shadow-sm" />
              <span className="font-bold text-foreground">Trial Active</span>
            </div>
            <ExecutiveButton
              variant="outline"
              size="sm"
              onClick={() => onNavigate('subscription')}
              className="font-bold"
            >
              Upgrade to Pro
            </ExecutiveButton>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg backdrop-blur-sm">
        <div className="flex justify-around py-3 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, label: "Home", active: true, action: () => {} },
            { icon: MessageSquare, label: "Chat", active: false, action: () => onNavigate('ai-copilot') },
            { icon: BarChart3, label: "Habits", active: false, action: () => onNavigate('habits') },
            { icon: Users, label: "Profile", active: false, action: () => onNavigate('settings') },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={cn(
                  "flex flex-col items-center py-3 px-6 transition-all duration-200 rounded-xl",
                  item.active 
                    ? "text-electric bg-electric/10 scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
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