import { useState, useRef, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Send, Zap, Target, Briefcase, Download, DollarSign, Crown, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface StrategyCopilotProps {
  onBack: () => void;
  userRole: string;
  userObjective: string;
}

const getCoachingCategories = (role: string, objective: string) => {
  const baseCategories = [
    { text: "Pre-Meeting Boost", icon: Zap, category: "confidence" },
    { text: "Negotiation Tactics", icon: Target, category: "negotiation" },
    { text: "Team Leadership", icon: Briefcase, category: "leadership" },
  ];
  
  // Add role-specific categories
  if (role === "sales-leader") {
    baseCategories.push({ text: "Close Deals Faster", icon: DollarSign, category: "sales" });
  } else if (role === "entrepreneur") {
    baseCategories.push({ text: "Investor Pitch Prep", icon: Crown, category: "fundraising" });
  } else if (role === "executive") {
    baseCategories.push({ text: "Strategic Decision", icon: Lightbulb, category: "strategy" });
  }
  
  return baseCategories;
};

export default function StrategyCopilot({ onBack, userRole, userObjective }: StrategyCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `I'm your AI Strategy Co-pilot. I'm here to boost your executive performance with strategic insights tailored to your ${userRole} role. What situation can I help you dominate today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const coachingCategories = getCoachingCategories(userRole, userObjective);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Pre-Meeting Boosts
    if (message.includes('meeting') || message.includes('boost')) {
      const boosts = [
        "🎯 PRE-MEETING POWER PROTOCOL: Use the 5-4-3-2-1 confidence technique: 5 deep breaths, 4 power affirmations, 3 key objectives, 2 power poses, 1 victory visualization. Your presence will command the room.",
        "⚡ MEETING MASTERY: Enter with the mindset 'I'm here to add value.' Frame every response around outcomes and ROI. This positions you as a strategic partner, not just another participant.",
        "🚀 CONFIDENCE AMPLIFIER: Before speaking, pause for 2 seconds. This creates gravitas and gives you time to frame responses with executive authority. Slow down to speed up your impact."
      ];
      return boosts[Math.floor(Math.random() * boosts.length)];
    }
    
    // Negotiation Tactics
    if (message.includes('negotiate') || message.includes('deal') || message.includes('price')) {
      const tactics = [
        "💎 NEGOTIATION POWER MOVE: After stating your position, use strategic silence. Count to 7 before speaking again. This psychological pressure creates urgency and often yields immediate concessions.",
        "🎯 THE EXECUTIVE EDGE: Frame every negotiation around mutual value creation. Ask: 'What would a win-win look like here?' This shifts the dynamic from adversarial to collaborative.",
        "⚡ AUTHORITY POSITIONING: Use the 'Executive Summary' technique: State your position in 30 seconds or less, then ask for their perspective. Brevity equals authority."
      ];
      return tactics[Math.floor(Math.random() * tactics.length)];
    }
    
    // Team Leadership
    if (message.includes('team') || message.includes('lead') || message.includes('manage')) {
      const leadership = [
        "👑 LEADERSHIP PRESENCE: Start team interactions with psychological safety: 'What questions are we not asking?' This drives innovation and positions you as a thought leader.",
        "🔥 TEAM ACTIVATION: Use the 'Executive Stakes' framework: Clearly state the outcome, the timeline, and the impact. Teams perform 40% better with clear executive context.",
        "⚡ AUTHORITY BUILDER: In team meetings, speak last on decisions but first on vision. This demonstrates both humility and leadership strength."
      ];
      return leadership[Math.floor(Math.random() * leadership.length)];
    }
    
    // Role-specific responses
    if (userRole === "sales-leader" && (message.includes('close') || message.includes('sales'))) {
      return "💰 SALES EXECUTIVE EDGE: Use the 'Executive Urgency' close: 'Based on what we've discussed, I see three paths forward. Which aligns best with your Q4 objectives?' This creates choice architecture while maintaining executive authority.";
    }
    
    if (userRole === "entrepreneur" && (message.includes('pitch') || message.includes('investor'))) {
      return "🚀 FOUNDER AUTHORITY: Start investor meetings with market validation, not product features. 'We've identified a $X billion market inefficiency that we're uniquely positioned to solve.' Lead with the problem size, not the solution features.";
    }
    
    // General executive insights
    const generalInsights = [
      "🎯 EXECUTIVE MINDSET: High-performers think in systems, not tasks. Before any decision, ask: 'What second and third-order effects am I not seeing?' This elevates your strategic thinking.",
      "💡 STRATEGIC ADVANTAGE: Frame all communication around business outcomes. Replace 'I think' with 'The data suggests' or 'Based on our objectives.' This builds executive credibility.",
      "⚡ CONFIDENCE MULTIPLIER: Executive presence = Preparation × Authenticity × Decisive Action. You control all three variables. Master them to dominate any situation."
    ];
    
    return generalInsights[Math.floor(Math.random() * generalInsights.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputText),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  const handleExportNotes = () => {
    const notes = messages
      .filter(m => m.type === 'ai')
      .map(m => m.content)
      .join('\n\n');
    
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'executive-insights.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              <h1 className="text-2xl font-bold text-foreground">AI Strategy Co-pilot</h1>
              <p className="text-muted-foreground font-medium">Executive performance insights</p>
            </div>
          </div>
          <ExecutiveButton
            variant="ghost"
            size="sm"
            onClick={handleExportNotes}
            className="font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </ExecutiveButton>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.type === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] p-6 rounded-3xl animate-fade-in shadow-md",
                message.type === 'user'
                  ? "bg-electric text-electric-foreground ml-4"
                  : "bg-card border border-border mr-4"
              )}
            >
              <p className="leading-relaxed font-medium">{message.content}</p>
              <p className={cn(
                "text-xs mt-3 opacity-70 font-medium",
                message.type === 'user' ? "text-electric-foreground" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border p-4 rounded-2xl mr-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-electric rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 shadow-lg backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {/* Coaching Categories */}
          <div className="flex space-x-3 mb-6 overflow-x-auto">
            {coachingCategories.map((category) => {
              const Icon = category.icon;
              return (
                <ExecutiveButton
                  key={category.text}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedPrompt(category.text)}
                  className="flex-shrink-0 font-medium hover:bg-electric/10 hover:border-electric"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.text}
                </ExecutiveButton>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your leadership challenge..."
              className="executive-input flex-1 h-12 text-base"
            />
            <ExecutiveButton
              variant="primary"
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="h-12 w-12"
            >
              <Send className="w-5 h-5" />
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