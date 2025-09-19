import { useState, useRef, useEffect } from "react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { ArrowLeft, Play, Target, DollarSign, Users, Crown, TrendingUp, Briefcase, Mic, MicOff, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversation, setConversation] = useState<Array<{role: 'ai' | 'user', message: string}>>([]);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  const startScenario = async (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setConversation([]);
    
    // Generate opening AI message based on scenario
    try {
      const openingMessage = `Welcome to the ${scenario.title} simulation. I'll be playing the role of your counterpart in this ${scenario.category} scenario. Let's begin. ${getScenarioContext(scenario)}`;
      
      setCurrentMessage("Generating AI response...");
      const response = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: openingMessage,
          voice: getScenarioVoice(scenario)
        }
      });

      if (response.data?.audioContent) {
        playAudio(response.data.audioContent);
        setConversation([{role: 'ai', message: openingMessage}]);
      }
      setCurrentMessage("");
    } catch (error) {
      console.error('Error starting scenario:', error);
      toast({
        title: "Error",
        description: "Failed to start scenario. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getScenarioContext = (scenario: Scenario) => {
    switch (scenario.id) {
      case "investor-pitch":
        return "I'm a Series A investor. You have 5 minutes to convince me to invest $2M in your company. Begin with your opening statement.";
      case "difficult-client":
        return "I'm a client who's concerned about your pricing. I think it's 30% too high and I'm considering competitors. How do you respond?";
      case "salary-negotiation":
        return "I'm your potential employer. You've received our offer, but you want to negotiate the compensation package. What's your approach?";
      case "crisis-leadership":
        return "There's been a major setback in your project. Your team is demoralized and stakeholders are asking questions. How do you address this?";
      default:
        return "Let's begin this professional scenario. What's your opening approach?";
    }
  };

  const getScenarioVoice = (scenario: Scenario) => {
    // Match voice to scenario type
    if (scenario.category === 'negotiation') return 'Roger'; // Authoritative male voice
    if (scenario.category === 'leadership') return 'Sarah'; // Professional female voice  
    return 'George'; // Default professional voice
  };

  const playAudio = (base64Audio: string) => {
    const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processUserSpeech(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access to continue.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processUserSpeech = async (audioBlob: Blob) => {
    try {
      setCurrentMessage("Processing your response...");
      
      // Convert audio to base64 for speech-to-text
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        // Here you would call speech-to-text API
        // For now, simulate user input
        const userMessage = "This is a simulated user response for testing.";
        
        setConversation(prev => [...prev, {role: 'user', message: userMessage}]);
        
        // Generate AI response
        await generateAIResponse(userMessage);
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing speech:', error);
      setCurrentMessage("");
    }
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      // Generate contextual AI response based on scenario and conversation
      const aiResponse = generateContextualResponse(userMessage, selectedScenario!);
      
      setCurrentMessage("Generating AI response...");
      const response = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: aiResponse,
          voice: getScenarioVoice(selectedScenario!)
        }
      });

      if (response.data?.audioContent) {
        playAudio(response.data.audioContent);
        setConversation(prev => [...prev, {role: 'ai', message: aiResponse}]);
      }
      setCurrentMessage("");
    } catch (error) {
      console.error('Error generating AI response:', error);
      setCurrentMessage("");
    }
  };

  const generateContextualResponse = (userMessage: string, scenario: Scenario) => {
    // Simple response generation - in production, this would use AI
    const responses = {
      "investor-pitch": [
        "Interesting proposition. What's your customer acquisition cost and lifetime value?",
        "I see potential, but I'm concerned about market competition. How do you differentiate?",
        "Your revenue projections seem optimistic. Can you walk me through your assumptions?"
      ],
      "difficult-client": [
        "I understand your perspective, but I still think there are more cost-effective alternatives.",
        "That's helpful context. What specific value am I getting for the premium pricing?",
        "I appreciate the explanation. Let me think about this and get back to you."
      ],
      "salary-negotiation": [
        "I understand you'd like to negotiate. What specific aspects of the package are you looking to adjust?",
        "That's a fair point. Let me see what flexibility we have in the compensation structure.",
        "I appreciate your directness. What would make this offer compelling for you?"
      ]
    };
    
    const scenarioResponses = responses[scenario.id as keyof typeof responses] || [
      "That's an interesting point. Can you elaborate further?",
      "I see your perspective. How would you handle the challenges this might create?",
      "Thank you for that insight. What would you do next in this situation?"
    ];
    
    return scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)];
  };

  const endScenario = () => {
    setSelectedScenario(null);
    setConversation([]);
    setCurrentMessage("");
    setIsPlaying(false);
    setIsRecording(false);
    
    // Show completion feedback
    toast({
      title: "Scenario Complete! 🎯",
      description: `Great practice session! You demonstrated strong ${selectedScenario?.category} skills.`
    });
  };

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border p-6 bg-card shadow-sm">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center">
              <button
                onClick={endScenario}
                className="mr-4 p-3 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{selectedScenario.title}</h1>
                <p className="text-muted-foreground font-medium">AI Roleplay Simulation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-electric animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm text-muted-foreground">
                {isPlaying ? 'AI Speaking' : isRecording ? 'Recording...' : 'Ready'}
              </span>
            </div>
          </div>
        </header>

        {/* Conversation Area */}
        <div className="p-6 max-w-4xl mx-auto">
          <div className="executive-card p-6 shadow-lg mb-6 min-h-[400px]">
            <h3 className="text-lg font-bold text-foreground mb-4">Conversation</h3>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-electric text-electric-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
              
              {currentMessage && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-muted text-foreground">
                    <p className="text-sm italic">{currentMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <ExecutiveButton
                variant={isRecording ? "destructive" : "primary"}
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isPlaying}
                className="font-medium min-w-[140px]"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Hold to Speak
                  </>
                )}
              </ExecutiveButton>
              
              {isPlaying && (
                <div className="flex items-center space-x-2 text-electric">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">AI Speaking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Scenario Info */}
          <div className="executive-card p-6 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-2">Scenario Details</h3>
            <p className="text-muted-foreground mb-4">{selectedScenario.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`font-bold ${getDifficultyColor(selectedScenario.difficulty)} capitalize`}>
                {selectedScenario.difficulty}
              </span>
              <span className="text-muted-foreground">Duration: {selectedScenario.duration}</span>
              <span className="text-muted-foreground capitalize">Category: {selectedScenario.category}</span>
            </div>
          </div>
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