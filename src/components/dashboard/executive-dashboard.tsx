import { useState, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { MessageSquare, Target, BarChart3, Settings, Zap, TrendingUp, Users, Brain, Trophy, Clock, Crown } from "lucide-react";
import StrategyCopilot from "@/components/ai-copilot/strategy-copilot";
import SubscriptionScreen from "@/components/subscription/subscription-screen";
import PerformanceHabits from "@/components/dashboard/performance-habits";
import ScenarioLibrary from "@/components/dashboard/scenario-library";

interface ExecutiveDashboardProps {
  userRole: string;
  userObjective: string;
  tier: string;
}

export default function ExecutiveDashboard({ userRole, userObjective, tier }: ExecutiveDashboardProps) {
  const [showStrategyCopilot, setShowStrategyCopilot] = useState(false);
  const [showPerformanceHabits, setShowPerformanceHabits] = useState(false);
  const [showScenarioLibrary, setShowScenarioLibrary] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);

  const getTierTheme = () => {
    switch (tier) {
      case 'professional': return 'professional-theme';
      case 'personal': return 'personal-theme';
      default: return '';
    }
  };

  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    meetingsPrepped: 0,
    dealsAdvanced: 0,
    teamInteractions: 0,
    weeklyGrowth: 0
  });

  const getTodaysBoost = () => {
    const roleSpecificBoosts = {
      "sales-leader": [
        "💰 SALES EDGE: Your closing power increases 40% when you pause 3 seconds before responding to objections. Use this in today's negotiations.",
        "🎯 REVENUE BOOST: High-performing sales leaders visualize the signed contract 3x more than average. Spend 2 minutes seeing today's deal closed.",
        "⚡ PSYCHOLOGY WIN: Mirror your prospect's communication style (fast/slow, data/emotion) for 23% higher close rates. Match their energy today."
      ],
      "entrepreneur": [
        "🚀 FOUNDER EDGE: VCs fund confidence, not just ideas. Practice your 2-minute pitch until you can deliver it while visualizing their 'yes.'",
        "💡 STRATEGIC POWER: Market leaders think customer obsession, not feature obsession. Ask 3 customers what problem keeps them awake tonight.",
        "🎯 EXECUTION BOOST: High-growth founders time-block ruthlessly. Dedicate 90 minutes today to your #1 needle-moving activity."
      ],
      "executive": [
        "👑 LEADERSHIP EDGE: Team performance increases 45% when you create psychological safety first. Start today's interactions with: 'What are we not seeing?'",
        "⚡ STRATEGIC POWER: High-impact executives think in systems, not tasks. Before any decision, ask: 'What second-order effects am I missing?'",
        "🎯 AUTHORITY BUILDER: Executive presence = Preparation × Authenticity × Decisive Action. You control all three. Master them today."
      ]
    };
    
    const boosts = roleSpecificBoosts[userRole as keyof typeof roleSpecificBoosts] || roleSpecificBoosts.executive;
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

  const goHome = () => {
    setShowStrategyCopilot(false);
    setShowPerformanceHabits(false);
    setShowScenarioLibrary(false);
    setShowSubscription(false);
  };

  if (showStrategyCopilot) {
    return (
      <StrategyCopilot 
        onBack={() => setShowStrategyCopilot(false)}
        onHome={goHome}
        userRole={userRole}
        userObjective={userObjective}
        tier={tier}
      />
    );
  }

  if (showPerformanceHabits) {
    return (
      <PerformanceHabits 
        onBack={() => setShowPerformanceHabits(false)}
        onHome={goHome}
        userRole={userRole}
      />
    );
  }

  if (showScenarioLibrary) {
    return (
      <ScenarioLibrary 
        onBack={() => setShowScenarioLibrary(false)}
        onHome={goHome}
        userRole={userRole}
      />
    );
  }

  if (showSubscription) {
    return (
      <SubscriptionScreen 
        onBack={() => setShowSubscription(false)}
        onSubscribe={(tier) => {
          console.log("Subscribing to:", tier);
          setShowSubscription(false);
        }}
        currentTier={tier}
      />
    );
  }

  return (
    <div className={cn("min-h-screen bg-background", getTierTheme())}>
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => window.location.href = '/'}
              className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
              title="Back to Home"
            >
              <Crown className="w-6 h-6 text-electric" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {getTimeOfDay()}, Executive
              </h1>
              <p className="text-muted-foreground font-medium">Let's frame your day for executive success</p>
            </div>
          </div>
          <button
            onClick={() => setShowSubscription(true)}
            className="p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Today's Executive Boost */}
        <div className="executive-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Today's Executive Boost</h2>
            <Brain className="w-6 h-6 text-electric" />
          </div>
          <p className="text-foreground leading-relaxed text-lg">{getTodaysBoost()}</p>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ExecutiveButton
            variant="outline"
            onClick={() => setShowStrategyCopilot(true)}
            className="h-20 flex-col space-y-2"
          >
            <MessageSquare className="w-6 h-6" />
            <span>AI Strategy Co-pilot</span>
          </ExecutiveButton>
          
          <ExecutiveButton
            variant="outline"
            onClick={() => setShowScenarioLibrary(true)}
            className="h-20 flex-col space-y-2"
          >
            <Target className="w-6 h-6" />
            <span>Scenario Library</span>
          </ExecutiveButton>
          
          <ExecutiveButton
            variant="outline"
            onClick={() => setShowPerformanceHabits(true)}
            className="h-20 flex-col space-y-2"
          >
            <Trophy className="w-6 h-6" />
            <span>Performance Habits</span>
          </ExecutiveButton>
        </div>

        {/* Performance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Confidence Meter */}
          <div className="executive-card p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Confidence Level</h3>
              <div className="metric-display text-2xl">{confidenceLevel}%</div>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-2">
              <div 
                className="confidence-meter h-3 rounded-full transition-all duration-500" 
                style={{ width: `${confidenceLevel}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {confidenceLevel >= 85 ? "🔥 Peak performance zone" : 
               confidenceLevel >= 75 ? "⚡ Strong confidence" : 
               "💪 Building momentum"}
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="executive-card p-6 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-4">This Week's Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meetings Prepped</span>
                <span className="metric-display">{performanceMetrics.meetingsPrepped}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deals Advanced</span>
                <span className="metric-display">{performanceMetrics.dealsAdvanced}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Interactions</span>
                <span className="metric-display">{performanceMetrics.teamInteractions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weekly Growth</span>
                <span className="metric-display">+{performanceMetrics.weeklyGrowth}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="executive-card p-6 shadow-lg bg-gradient-to-r from-electric/10 to-electric/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Unlock Your Full Potential</h3>
              <p className="text-muted-foreground">
                Access advanced scenarios, voice coaching, and weekly AI reports
              </p>
            </div>
            <ExecutiveButton
              variant="primary"
              onClick={() => setShowSubscription(true)}
              className="ml-4"
            >
              Upgrade Now
            </ExecutiveButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}