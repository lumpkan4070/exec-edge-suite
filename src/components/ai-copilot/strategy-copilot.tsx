import { useState, useRef, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Send, Zap, Target, Briefcase, Download, DollarSign, Crown, Lightbulb, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface StrategyCopilotProps {
  onBack: () => void;
  onHome: () => void;
  userRole: string;
  userObjective: string;
  tier: string;
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

export default function StrategyCopilot({ onBack, onHome, userRole, userObjective, tier }: StrategyCopilotProps) {
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

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await supabase.functions.invoke('ai-strategy-chat', {
        body: {
          message: userMessage,
          userRole,
          userObjective,
          conversationHistory: messages
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      // Fallback to a generic executive response
      return "🎯 I understand your challenge. Let me analyze this strategically and provide you with a more detailed response. Could you provide a bit more context about the specific situation you're facing?";
    }
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

    try {
      const aiResponse = await generateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in AI response:', error);
    } finally {
      setIsTyping(false);
    }
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
          <div className="flex items-center space-x-2">
            <ExecutiveButton
              variant="ghost"
              size="sm"
              onClick={onHome}
              className="font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </ExecutiveButton>
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