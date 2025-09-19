import { useState } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Play, Target, DollarSign, Users, Crown, TrendingUp, Briefcase } from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'negotiation' | 'leadership' | 'presentation';
  difficulty: 'intermediate' | 'advanced' | 'expert';
  duration: string;
  icon: any;
  roleSpecific?: string[];
}

interface ScenarioLibraryProps {
  onBack: () => void;
  userRole: string;
}

const scenarios: Scenario[] = [
  {
    id: "investor-pitch",
    title: "Investor Pitch Mastery",
    description: "Present to Series A investors with confidence and authority",
    category: "presentation",
    difficulty: "expert",
    duration: "15 min",
    icon: Crown,
    roleSpecific: ["entrepreneur"]
  },
  {
    id: "difficult-client",
    title: "Difficult Client Negotiation",
    description: "Navigate price objections and close complex deals",
    category: "negotiation", 
    difficulty: "advanced",
    duration: "12 min",
    icon: DollarSign,
    roleSpecific: ["sales-leader", "executive"]
  },
  {
    id: "team-presentation",
    title: "High-Impact Team Presentation",
    description: "Lead strategic presentations with executive presence",
    category: "presentation",
    difficulty: "intermediate",
    duration: "10 min",
    icon: Briefcase,
    roleSpecific: ["executive", "entrepreneur"]
  },
  {
    id: "salary-negotiation",
    title: "Executive Salary Negotiation",
    description: "Master high-stakes compensation discussions",
    category: "negotiation",
    difficulty: "expert", 
    duration: "8 min",
    icon: TrendingUp
  },
  {
    id: "crisis-leadership",
    title: "Crisis Leadership",
    description: "Lead your team through challenging periods with authority",
    category: "leadership",
    difficulty: "expert",
    duration: "15 min",
    icon: Users,
    roleSpecific: ["executive"]
  },
  {
    id: "board-presentation",
    title: "Board Meeting Presentation",
    description: "Present quarterly results with confidence and clarity",
    category: "presentation",
    difficulty: "expert",
    duration: "12 min",
    icon: Target,
    roleSpecific: ["executive", "entrepreneur"]
  }
];

export default function ScenarioLibrary({ onBack, userRole }: ScenarioLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const categories = [
    { id: "all", label: "All Scenarios", icon: Target },
    { id: "negotiation", label: "Negotiation", icon: DollarSign },
    { id: "leadership", label: "Leadership", icon: Users },
    { id: "presentation", label: "Presentation", icon: Briefcase }
  ];

  const filteredScenarios = scenarios.filter(scenario => {
    if (selectedCategory !== "all" && scenario.category !== selectedCategory) return false;
    if (scenario.roleSpecific && !scenario.roleSpecific.includes(userRole)) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "intermediate": return "text-executive-success";
      case "advanced": return "text-electric";
      case "expert": return "text-executive-warning";
      default: return "text-muted-foreground";
    }
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    // In a real app, this would start the AI roleplay simulation
    setTimeout(() => {
      alert(`🎯 Scenario Complete!\n\nConfidence Score: 85%\n\nKey Improvements:\n• Stronger opening statement\n• More strategic pauses\n• Better outcome framing\n\nReady for your next challenge!`);
      setSelectedScenario(null);
    }, 3000);
  };

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-electric rounded-xl mx-auto flex items-center justify-center animate-pulse">
            <Play className="w-8 h-8 text-electric-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{selectedScenario.title}</h2>
            <p className="text-muted-foreground">AI roleplay in progress...</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="confidence-meter h-2 rounded-full animate-[width-grow_3s_ease-out_forwards]" style={{ width: "0%" }} />
          </div>
          <p className="text-sm text-muted-foreground">Analyzing your performance and generating insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6 bg-card shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Scenario Library</h1>
              <p className="text-muted-foreground font-medium">Practice high-stakes situations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Category Filter */}
        <div className="flex space-x-3 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <ExecutiveButton
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0 font-medium"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </ExecutiveButton>
            );
          })}
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <div
                key={scenario.id}
                className="executive-card p-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center group-hover:bg-electric/20 transition-all duration-200">
                    <Icon className="w-6 h-6 text-electric" />
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getDifficultyColor(scenario.difficulty)} capitalize`}>
                      {scenario.difficulty}
                    </div>
                    <div className="text-xs text-muted-foreground">{scenario.duration}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">{scenario.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{scenario.description}</p>
                
                <ExecutiveButton
                  variant="primary"
                  size="sm"
                  onClick={() => startScenario(scenario)}
                  className="w-full font-medium"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </ExecutiveButton>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="executive-card p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">How Scenarios Work</h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>• <strong>AI Roleplay:</strong> Practice with realistic simulations of high-stakes situations</p>
            <p>• <strong>Performance Analysis:</strong> Get detailed feedback on confidence, messaging, and presence</p>
            <p>• <strong>Skill Building:</strong> Each scenario builds specific executive competencies</p>
            <p>• <strong>Confidence Scoring:</strong> Track improvement over time with objective metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}