import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Brain, BarChart3, Zap, Crown, Users, Shield, Star, Clock, Globe, Award, MessageSquare, TrendingUp, BookOpen } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData } from "@/components/seo/StructuredData";

import aiCoaching from "@/assets/ai-coaching.jpg";
import executivePresentation from "@/assets/executive-presentation.jpg";
import realisticAnalytics from "@/assets/realistic-analytics.jpg";
import apexLogo from "@/assets/apex-logo-final-new.png";

export default function Features() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/', { state: { scrollTo: 'pricing' } });
  };

  const handleDemo = () => {
    navigate('/', { state: { demo: true } });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="AI Executive Coaching Features | APEX Executive Training Platform"
        description="Discover APEX Executive's AI-powered coaching features: Strategy Co-pilot, Immersive Scenarios, Performance Analytics. Transform your leadership in 15 minutes daily."
        keywords="AI executive coaching features, leadership training platform, executive scenarios, performance analytics, AI strategy advisor"
        canonical="https://apex-executive.com/features"
      />
      <StructuredData type="SoftwareApplication" />

      {/* Navigation */}
      <nav className="border-b border-silver bg-card/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img 
                  src={apexLogo} 
                  alt="APEX Executive Logo" 
                  className="h-16 md:h-20 w-auto cursor-pointer"
                />
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Home</Link>
              <Link to="/features" className="text-primary border-b-2 border-primary transition-colors font-lato">Features</Link>
              <Link to="/blog" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Resources</Link>
              <Link to="/privacy" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Privacy</Link>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link 
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-white bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <ExecutiveButton onClick={handleGetStarted} variant="primary" size="default">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </ExecutiveButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-midnight-blue via-midnight-blue to-midnight-blue/90">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23635BFF' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-playfair">
              AI-Powered Executive
              <span className="text-vivid-indigo"> Training Features</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-lato">
              Discover the comprehensive suite of AI coaching tools designed to transform your leadership effectiveness in just 15 minutes a day.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <ExecutiveButton onClick={handleDemo} variant="secondary" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                Try Interactive Demo
              </ExecutiveButton>
              <ExecutiveButton onClick={handleGetStarted} variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </ExecutiveButton>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 font-playfair leading-tight">
              <span className="text-slate-900">Three Core Features.</span><br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Infinite Possibilities.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-lato">
              Each feature is designed to address specific executive challenges and accelerate your leadership growth.
            </p>
          </div>

          {/* AI Strategy Co-pilot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-playfair">
                    AI Strategy Co-pilot
                  </h3>
                  <p className="text-lg text-amber-600 font-medium">Your 24/7 Executive Coach</p>
                </div>
              </div>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-lato">
                Get strategic advice, practice tough conversations, and receive personalized feedback on your leadership decisions. Your AI coach learns your style and adapts to your needs.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Real-time strategic advice tailored to your industry",
                  "Practice difficult conversations in a safe environment", 
                  "Get instant feedback on communication style",
                  "Role-play scenarios specific to your challenges"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-700 font-lato">{feature}</span>
                  </div>
                ))}
              </div>
              
              <ExecutiveButton onClick={handleDemo} variant="secondary" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Try AI Co-pilot Demo
              </ExecutiveButton>
            </div>
            
            <div className="relative">
              <img 
                src={aiCoaching} 
                alt="AI Strategy Co-pilot interface showing executive coaching conversation"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Immersive Scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 lg:order-1 relative">
              <img 
                src={executivePresentation} 
                alt="Executive practicing boardroom presentation with AI feedback"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-playfair">
                    Immersive Scenarios
                  </h3>
                  <p className="text-lg text-blue-600 font-medium">Practice Makes Perfect</p>
                </div>
              </div>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-lato">
                Practice real scenarios: investor pitches, board meetings, team conflicts, and crisis situations. Build muscle memory for high-pressure moments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users, text: "Board Meetings" },
                  { icon: TrendingUp, text: "Investor Pitches" },
                  { icon: Shield, text: "Crisis Management" },
                  { icon: Award, text: "Team Conflicts" }
                ].map((scenario, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
                    <scenario.icon className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700 font-medium font-lato">{scenario.text}</span>
                  </div>
                ))}
              </div>
              
              <ExecutiveButton onClick={handleDemo} variant="secondary" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                Explore Scenarios
              </ExecutiveButton>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-playfair">
                    Performance Analytics
                  </h3>
                  <p className="text-lg text-purple-600 font-medium">Track Your Growth</p>
                </div>
              </div>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-lato">
                See exactly how you're improving. Track confidence levels, communication effectiveness, and decision-making speed with detailed performance metrics.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Confidence level tracking over time",
                  "Communication effectiveness scoring",
                  "Decision-making speed improvements",
                  "Leadership presence assessment"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-slate-700 font-lato">{feature}</span>
                  </div>
                ))}
              </div>
              
              <ExecutiveButton onClick={handleDemo} variant="secondary" size="lg">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics Demo
              </ExecutiveButton>
            </div>
            
            <div className="relative">
              <img 
                src={realisticAnalytics} 
                alt="Performance analytics dashboard showing leadership improvement metrics"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 px-6 bg-gradient-to-br from-white via-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Feature <span className="text-primary">Comparison</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-lato">
              See what's included in each plan and choose the right level of AI coaching for your needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              {/* Header */}
              <div className="p-6 bg-slate-50 border-r border-slate-200">
                <h3 className="font-bold text-slate-900 font-playfair">Features</h3>
              </div>
              <div className="p-6 text-center border-r border-slate-200">
                <h3 className="font-bold text-slate-900 font-playfair">Trial</h3>
                <p className="text-sm text-slate-600">3 Days Free</p>
              </div>
              <div className="p-6 text-center border-r border-slate-200">
                <h3 className="font-bold text-slate-900 font-playfair">Professional</h3>
                <p className="text-sm text-slate-600">$97/month</p>
              </div>
              <div className="p-6 text-center bg-primary/5">
                <h3 className="font-bold text-primary font-playfair">Executive</h3>
                <p className="text-sm text-primary/70">$197/month</p>
              </div>
              
              {/* Feature rows */}
              {[
                { feature: "AI Strategy Co-pilot", trial: true, professional: true, executive: true },
                { feature: "Basic Scenarios (5)", trial: true, professional: true, executive: false },
                { feature: "Premium Scenarios (20+)", trial: false, professional: false, executive: true },
                { feature: "Performance Analytics", trial: "Basic", professional: "Advanced", executive: "Full Suite" },
                { feature: "Session Length", trial: "15 min", professional: "30 min", executive: "Unlimited" },
                { feature: "Priority Support", trial: false, professional: true, executive: true },
                { feature: "Custom Scenarios", trial: false, professional: false, executive: true },
                { feature: "Team Management", trial: false, professional: false, executive: true }
              ].map((row, index) => (
                <React.Fragment key={index}>
                  <div className="p-4 bg-slate-50 border-r border-slate-200 border-t">
                    <span className="font-medium text-slate-900 font-lato">{row.feature}</span>
                  </div>
                  <div className="p-4 text-center border-r border-slate-200 border-t">
                    {typeof row.trial === 'boolean' ? (
                      row.trial ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : 
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className="text-slate-700 font-lato">{row.trial}</span>
                    )}
                  </div>
                  <div className="p-4 text-center border-r border-slate-200 border-t">
                    {typeof row.professional === 'boolean' ? (
                      row.professional ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : 
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className="text-slate-700 font-lato">{row.professional}</span>
                    )}
                  </div>
                  <div className="p-4 text-center bg-primary/5 border-t">
                    {typeof row.executive === 'boolean' ? (
                      row.executive ? <CheckCircle className="w-5 h-5 text-primary mx-auto" /> : 
                      <span className="text-slate-400">—</span>
                    ) : (
                      <span className="text-primary font-lato font-medium">{row.executive}</span>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-midnight-blue to-midnight-blue/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
            Experience the Future of <span className="text-vivid-indigo">Executive Training</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 font-lato">
            Join thousands of executives who've transformed their leadership with AI-powered coaching.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ExecutiveButton onClick={handleDemo} variant="secondary" size="lg">
              <Globe className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </ExecutiveButton>
            <ExecutiveButton onClick={handleGetStarted} variant="primary" size="lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </ExecutiveButton>
          </div>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-sm text-white/60">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                3-Day Free Trial
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Cancel Anytime
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-400" />
                Setup in 2 Minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-blue border-t border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-slate-400 mb-6 max-w-md font-lato">
                AI-powered executive coaching that transforms leaders in just 15 minutes a day.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  3-Day Free Trial
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Cancel Anytime
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 font-playfair">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors font-lato">Features</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors font-lato">Resources</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors font-lato">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 font-playfair">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-slate-400 hover:text-white transition-colors font-lato">Help Center</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors font-lato">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400 font-lato">
              © 2024 APEX Executive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}