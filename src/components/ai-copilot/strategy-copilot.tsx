import { useState, useRef, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Send, Zap, Target, Briefcase, Download } from "lucide-react";

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

const suggestedPrompts = [
  { text: "Pre-Meeting Boost", icon: Zap },
  { text: "Negotiate with Confidence", icon: Target },
  { text: "Lead Team Meeting", icon: Briefcase },
];

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      `Here's your strategic advantage: ${userMessage.toLowerCase().includes('meeting') ? 'Before any high-stakes meeting, use the 3-2-1 confidence protocol: 3 deep breaths, 2 power poses, 1 victory visualization. This primes your executive presence.' : 'Remember, executive leadership is about making others feel confident in your decisions. Frame your communication around outcomes, not processes.'}`,
      
      `Executive insight: ${userMessage.toLowerCase().includes('negotiate') ? 'The most powerful negotiation tactic is strategic silence. After making your offer, count to 7 before speaking again. This psychological pressure often yields immediate concessions.' : 'High-performers think in systems, not tasks. Ask yourself: "What pattern am I missing?" This question elevates your strategic thinking.'}`,
      
      `Strategic boost: ${userMessage.toLowerCase().includes('team') ? 'Great leaders create psychological safety first. Start your next team interaction with: "What questions are we not asking?" This drives innovative thinking.' : 'Executive confidence comes from preparation multiplied by presence. You control both variables.'}`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
          {/* Suggested Prompts */}
          <div className="flex space-x-3 mb-6 overflow-x-auto">
            {suggestedPrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <ExecutiveButton
                  key={prompt.text}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  className="flex-shrink-0 font-medium"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {prompt.text}
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