import React, { useState } from "react";
import { ArrowRight, CheckCircle, Target, Brain, Zap, Crown, Users, BarChart3, Star, Shield, Briefcase, Heart, Clock, Globe, Award } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";

import executiveBoardroom from "@/assets/executive-boardroom.jpg";
import aiCoaching from "@/assets/ai-coaching.jpg";
import executivePresentation from "@/assets/executive-presentation.jpg";
import realisticAnalytics from "@/assets/realistic-analytics.jpg";
import apexLogo from "@/assets/apex-logo-final-new.png";

import SubscriptionPlans from "@/components/payment/subscription-plans";

interface LandingProps {
  onGetStarted: () => void;
  onSelectPlan?: (tier: string) => void;
}

export default function Landing({ onGetStarted, onSelectPlan }: LandingProps) {
  const { userData, user } = useUser();
  const [showDemo, setShowDemo] = useState(false);
  

  const handleGetStarted = () => {
    // Scroll to the pricing section instead of taking to dashboard
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-silver bg-card/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-16 md:h-20 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Features</a>
              <a href="#get-started" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Get Started</a>
              <a href="#about" className="text-slate-gray hover:text-charcoal transition-colors font-lato">About</a>
            </div>
            
            {/* Auth Buttons - Always Visible */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {user ? (
                <button 
                  onClick={() => window.location.href = '/dashboard'} 
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => window.location.href = '/auth'} 
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Login
                </button>
              )}
              <button 
                onClick={handleGetStarted} 
                className="px-4 py-2 text-sm font-medium text-white bg-vivid-indigo rounded-md hover:bg-vivid-indigo/90 transition-colors flex items-center"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-midnight-blue via-midnight-blue to-midnight-blue/90">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23635BFF' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-vivid-indigo/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-vivid-indigo/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-playfair">
              Transform Leadership with
              <span className="text-vivid-indigo bg-gradient-to-r from-vivid-indigo to-vivid-indigo/80 bg-clip-text text-transparent"> AI-Powered</span> Executive Training
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-lato">
              <span className="text-vivid-indigo font-semibold">89% of users report higher confidence in just 15 minutes a day.</span><br />
              Practice investor pitches, crisis management, and difficult conversations with AI that adapts to your leadership style.
            </p>
            
            {/* Value Proposition Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8 mb-12">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <div className="w-3 h-3 bg-vivid-indigo rounded-full flex-shrink-0"></div>
                <span className="text-white font-lato">Practice high-stakes boardroom presentations</span>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <div className="w-3 h-3 bg-vivid-indigo rounded-full flex-shrink-0"></div>
                <span className="text-white font-lato">Master crisis management and difficult conversations</span>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <div className="w-3 h-3 bg-vivid-indigo rounded-full flex-shrink-0"></div>
                <span className="text-white font-lato">Get AI-powered feedback on your leadership style</span>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <div className="w-3 h-3 bg-vivid-indigo rounded-full flex-shrink-0"></div>
                <span className="text-white font-lato">Build executive presence and confidence</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-vivid-indigo mb-2 font-playfair">89%</div>
              <div className="text-white/70 font-lato">Confidence Increase</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-vivid-indigo mb-2 font-playfair">15min</div>
              <div className="text-white/70 font-lato">Daily Practice</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-vivid-indigo mb-2 font-playfair">2x</div>
              <div className="text-white/70 font-lato">Leadership Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-amber-500/5 to-yellow-500/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-playfair leading-tight">
              <span className="text-slate-900">Elite Executive Training.</span><br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Powered by AI.</span><br />
              <span className="text-slate-700">Designed for Leaders.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-lato">
              Experience AI-driven leadership training that adapts to your style, strengthens your strategy, and elevates your authority in every room.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={aiCoaching} 
                  alt="AI-powered executive coaching"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="relative p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Brain className="w-7 h-7 text-amber-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                  AI Strategy Co-pilot
                </h3>
                <p className="text-amber-100/90 text-lg leading-relaxed font-lato">
                  Your personal executive coach available 24/7. Get strategic advice, practice tough conversations, and receive personalized feedback on your leadership decisions.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={executivePresentation} 
                  alt="Executive scenario training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="relative p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                  Immersive Scenarios
                </h3>
                <p className="text-blue-100/90 text-lg leading-relaxed font-lato">
                  Practice real scenarios: investor pitches, board meetings, team conflicts, and crisis situations. Build muscle memory for high-pressure moments.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={realisticAnalytics} 
                  alt="Performance analytics dashboard"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="relative p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                  Performance Analytics
                </h3>
                <p className="text-purple-100/90 text-lg leading-relaxed font-lato">
                  See exactly how you're improving. Track confidence levels, communication effectiveness, and decision-making speed with detailed performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              How <span className="text-primary">APEX</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-lato">
              Transform your leadership in just 15 minutes a day with AI-powered training designed for busy executives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-primary">1</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair">Choose Your Scenario</h3>
              <p className="text-muted-foreground font-lato">
                Select from investor pitches, board meetings, crisis management, or team conflicts. Each scenario is tailored to real executive challenges.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-primary">2</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair">Practice with AI</h3>
              <p className="text-muted-foreground font-lato">
                Engage in realistic conversations with AI that adapts to your responses. Practice until you feel confident and natural.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-primary">3</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair">Get Feedback & Improve</h3>
              <p className="text-muted-foreground font-lato">
                Receive detailed feedback on your communication style, decision-making, and leadership presence. Track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-24 px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
            Ready to <span className="text-primary">Transform</span> Your Leadership?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-lato">
            Join hundreds of executives who've improved their leadership confidence in just 15 minutes a day.
          </p>
          <ExecutiveButton onClick={handleGetStarted} variant="primary" size="lg">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </ExecutiveButton>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                3-Day Free Trial
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Cancel Anytime
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                No Setup Fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Trusted by <span className="text-primary">Executive Leaders</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO, TechCorp",
                content: "APEX transformed my leadership style in just 3 weeks. The AI coaching is incredibly personalized and effective.",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "VP Strategy, Fortune 500",
                content: "The scenario training prepared me for my biggest boardroom presentation. I felt confident and in control.",
                rating: 5
              },
              {
                name: "Dr. Emily Watson",
                role: "Healthcare Executive",
                content: "Finally, executive training that fits my schedule. 15 minutes a day delivered real results.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <SubscriptionPlans />
      </div>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-midnight-blue to-midnight-blue/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
            Ready to <span className="text-vivid-indigo">Transform</span> Your Leadership?
          </h2>
          <p className="text-xl text-white/80 mb-8 font-lato">
            Start your 3-day free trial today. No commitment, cancel anytime.
          </p>
          <ExecutiveButton onClick={handleGetStarted} variant="primary" size="lg">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </ExecutiveButton>
        </div>
      </section>
    </div>
  );
}