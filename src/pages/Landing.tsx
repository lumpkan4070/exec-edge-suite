import { useState } from "react";
import { ArrowRight, CheckCircle, Target, Brain, Zap, Crown, Users, BarChart3, Mic, Play, X, Star, Shield, Briefcase, Heart, Clock, Globe, Award } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";
import executiveBoardroom from "@/assets/executive-boardroom.jpg";
import aiCoaching from "@/assets/ai-coaching.jpg";
import executivePresentation from "@/assets/executive-presentation.jpg";
import realisticAnalytics from "@/assets/realistic-analytics.jpg";
import apexLogo from "@/assets/apex-logo-new.png";

interface LandingProps {
  onGetStarted: () => void;
  onSelectPlan?: (tier: string) => void;
}

export default function Landing({ onGetStarted, onSelectPlan }: LandingProps) {
  const { userData } = useUser();
  const [showDemo, setShowDemo] = useState(false);

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
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Features</a>
              <a href="#pricing" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Pricing</a>
              <a href="#about" className="text-slate-gray hover:text-charcoal transition-colors font-lato">About</a>
            </div>
            <ExecutiveButton onClick={onGetStarted} variant="primary">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </ExecutiveButton>
          </div>
        </div>
      </nav>

      {/* Hero Section - WRD Compliant */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-midnight-blue via-midnight-blue to-midnight-blue/90">
        {/* Professional background image overlay */}
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
              Master high-stakes scenarios through immersive roleplay and personalized AI coaching.
            </p>
            
            {/* Single prominent CTA as per WRD */}
            <div className="flex justify-center mb-12">
              <ExecutiveButton 
                onClick={onGetStarted} 
                size="hero" 
                variant="primary" 
                className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-white text-xl font-semibold px-12 py-6 shadow-2xl hover:shadow-vivid-indigo/30 transform hover:scale-105 transition-all duration-300"
              >
                Start Your 14-Day Free Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </ExecutiveButton>
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

      {/* Executive-Grade Training Section - Premium Redesign */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-amber-500/5 to-yellow-500/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Premium Header */}
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

          {/* Premium Interactive Cards - Staggered Layout */}
          <div className="space-y-8">
            {/* Row 1 - Left Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* AI Strategy Co-pilot */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:-translate-y-2 lg:ml-0">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={aiCoaching} 
                    alt="Elite AI-powered executive strategy session"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors backdrop-blur-sm border border-amber-500/30">
                      <Brain className="w-7 h-7 text-amber-400" />
                    </div>
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 font-playfair group-hover:text-amber-100 transition-colors">
                    AI Strategy Co-pilot
                  </h3>
                  <p className="text-amber-100/90 text-lg leading-relaxed font-lato">
                    Get instant AI-powered insights and decision frameworks to drive executive-level results.
                  </p>
                </div>
              </div>

              {/* Immersive Scenarios */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 lg:ml-8 lg:mt-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={executivePresentation} 
                    alt="High-stakes boardroom scenario training"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors backdrop-blur-sm border border-blue-500/30">
                      <Target className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 font-playfair group-hover:text-blue-100 transition-colors">
                    Immersive Scenarios
                  </h3>
                  <p className="text-blue-100/90 text-lg leading-relaxed font-lato">
                    Step into investor boardrooms and crisis rooms. Train risk-free, perform under pressure.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 - Right Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Voice & Presence */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 lg:mr-8 lg:-mt-6 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={executiveBoardroom} 
                    alt="Executive presence and leadership authority training"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors backdrop-blur-sm border border-purple-500/30">
                      <Mic className="w-7 h-7 text-purple-400" />
                    </div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 font-playfair group-hover:text-purple-100 transition-colors">
                    Voice & Presence
                  </h3>
                  <p className="text-purple-100/90 text-lg leading-relaxed font-lato">
                    Command the room. Refine your voice, body language, and executive presence.
                  </p>
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={realisticAnalytics} 
                    alt="Executive performance analytics and growth tracking"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  {/* Animated Analytics Elements */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    <div className="bg-emerald-500/20 backdrop-blur-sm rounded-lg p-3 border border-emerald-500/30">
                      <BarChart3 className="w-6 h-6 text-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors backdrop-blur-sm border border-emerald-500/30">
                      <BarChart3 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 font-playfair group-hover:text-emerald-100 transition-colors">
                    Performance Analytics
                  </h3>
                  <p className="text-emerald-100/90 text-lg leading-relaxed font-lato">
                    See the data behind your decisions. Measure growth, track strengths, and refine your edge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="text-center mt-20">
            <ExecutiveButton 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 transition-all duration-300 glow-effect"
            >
              Start Your Executive Training
              <ArrowRight className="w-6 h-6 ml-3" />
            </ExecutiveButton>
          </div>
        </div>
      </section>

      {/* Pricing Section - Alternating background */}
      <section id="pricing" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
              Choose Your Path
            </h2>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto font-lato">
              Flexible plans designed for every stage of your leadership journey. Start building executive presence today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Personal Plan */}
            <div className="bg-white border border-silver rounded-xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-charcoal mb-2 font-playfair">Personal</h3>
                <p className="text-slate-gray mb-6 font-lato">Perfect for individual professionals building their leadership foundation</p>
                <div className="text-4xl font-bold text-charcoal mb-2 font-playfair">
                  $29<span className="text-lg text-slate-gray font-lato">/month</span>
                </div>
                <p className="text-sm text-slate-gray font-lato">Billed monthly</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Basic AI Strategy Co-pilot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">5 scenario simulations/month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Performance habit tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Basic analytics</span>
                </div>
              </div>

              <ExecutiveButton 
                onClick={() => onSelectPlan ? onSelectPlan('personal') : onGetStarted()} 
                variant="outline" 
                className="w-full border-vivid-indigo text-vivid-indigo hover:bg-vivid-indigo hover:text-white"
              >
                Start Personal Plan
              </ExecutiveButton>
            </div>

            {/* Professional Plan */}
            <div className="bg-white border border-silver rounded-xl p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-vivid-indigo text-white px-4 py-1 text-sm font-medium font-lato">
                RECOMMENDED
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-charcoal mb-2 font-playfair">Professional</h3>
                <p className="text-slate-gray mb-6 font-lato">Advanced training for senior leaders and executives</p>
                <div className="text-4xl font-bold text-charcoal mb-2 font-playfair">
                  $99<span className="text-lg text-slate-gray font-lato">/month</span>
                </div>
                <p className="text-sm text-slate-gray font-lato">Billed monthly</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Advanced AI Strategy Co-pilot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Unlimited scenario simulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Voice coaching & analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Advanced performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Weekly AI coaching reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-vivid-indigo" />
                  <span className="text-slate-gray font-lato">Priority support</span>
                </div>
              </div>

              <ExecutiveButton 
                onClick={() => onSelectPlan ? onSelectPlan('professional') : onGetStarted()} 
                variant="primary" 
                className="w-full bg-vivid-indigo hover:bg-vivid-indigo/90"
              >
                Start Professional Plan
              </ExecutiveButton>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-gray mb-4 font-lato">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-sm text-slate-gray font-lato">
              Need enterprise solutions? <a href="#contact" className="text-vivid-indigo hover:underline">Contact our team</a>
            </p>
          </div>
        </div>
      </section>

      {/* Why Work at APEX Section - Alternating background */}
      <section id="about" className="py-20 px-6 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 font-playfair">
              Why Work at APEX?
            </h2>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed font-lato">
              Join a team that's transforming leadership development with cutting-edge AI and executive expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Professional testimonial */}
            <div className="relative">
              <div className="bg-white rounded-xl p-12 shadow-lg border border-silver relative">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-vivid-indigo to-vivid-indigo/70 rounded-2xl flex items-center justify-center shadow-lg">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <blockquote className="text-center">
                  <div className="text-6xl text-vivid-indigo/30 mb-4 font-bold font-playfair">"</div>
                  <p className="text-2xl font-medium text-charcoal mb-6 leading-relaxed font-lato">
                    At APEX, I've grown faster than in any role before. The technology we're building is genuinely transforming how leaders develop.
                  </p>
                  <footer className="text-slate-gray font-lato">
                    <cite className="not-italic font-semibold text-charcoal">Sarah Chen</cite>
                    <div className="text-sm">Senior AI Engineer</div>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Right side - Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Heart className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Health & Wellness</h3>
                <p className="text-sm text-slate-gray font-lato">Comprehensive health coverage and wellness programs</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Clock className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Flexible Schedule</h3>
                <p className="text-sm text-slate-gray font-lato">Work-life balance with flexible hours and remote options</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Award className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Growth Opportunities</h3>
                <p className="text-sm text-slate-gray font-lato">Continuous learning and career development programs</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Globe className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Global Impact</h3>
                <p className="text-sm text-slate-gray font-lato">Shape the future of leadership development worldwide</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Shield className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Job Security</h3>
                <p className="text-sm text-slate-gray font-lato">Stable growth company with long-term vision</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-silver group">
                <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vivid-indigo/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-vivid-indigo" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 font-playfair">Stock Options</h3>
                <p className="text-sm text-slate-gray font-lato">Equity participation in company success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and CTA Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-charcoal mb-8 font-playfair">Featured In</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 mb-12">
            <span className="text-lg font-semibold text-slate-gray font-lato">TechCrunch</span>
            <span className="text-lg font-semibold text-slate-gray font-lato">Forbes</span>
            <span className="text-lg font-semibold text-slate-gray font-lato">Harvard Business Review</span>
            <span className="text-lg font-semibold text-slate-gray font-lato">Wired</span>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-charcoal mb-6 font-playfair">Ready to Transform Your Leadership?</h3>
            <p className="text-lg text-slate-gray mb-8 font-lato">
              Join thousands of executives who are already using APEX to build unshakeable confidence and accelerate their careers.
            </p>
            <ExecutiveButton 
              onClick={onGetStarted} 
              variant="primary" 
              size="lg"
              className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-white px-8 py-4 text-lg"
            >
              Start Your 14-Day Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </ExecutiveButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-midnight-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="w-8 h-8 text-vivid-indigo" />
                <span className="text-2xl font-bold font-playfair">APEX</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md font-lato">
                AI-powered executive coaching for the modern leader. Build confidence, master high-stakes scenarios, and accelerate your career growth.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 font-playfair">Product</h4>
              <div className="space-y-2 font-lato">
                <a href="#features" className="block text-white/70 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-white/70 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Enterprise</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Security</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 font-playfair">Company</h4>
              <div className="space-y-2 font-lato">
                <a href="#about" className="block text-white/70 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 font-lato">
            <p>&copy; 2024 APEX Executive. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-charcoal font-playfair">Experience APEX</h3>
                <button 
                  onClick={() => setShowDemo(false)}
                  className="text-slate-gray hover:text-charcoal transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-video bg-light-gray rounded-xl mb-6 flex items-center justify-center">
                <Play className="w-16 h-16 text-vivid-indigo" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Target className="w-8 h-8 text-vivid-indigo mx-auto mb-3" />
                  <h4 className="font-semibold text-charcoal mb-2 font-playfair">Scenario Training</h4>
                  <p className="text-sm text-slate-gray font-lato">Practice investor pitches, board meetings, and crisis situations</p>
                </div>
                <div className="text-center">
                  <Brain className="w-8 h-8 text-vivid-indigo mx-auto mb-3" />
                  <h4 className="font-semibold text-charcoal mb-2 font-playfair">AI Coaching</h4>
                  <p className="text-sm text-slate-gray font-lato">Real-time feedback and personalized improvement strategies</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-vivid-indigo mx-auto mb-3" />
                  <h4 className="font-semibold text-charcoal mb-2 font-playfair">Progress Tracking</h4>
                  <p className="text-sm text-slate-gray font-lato">Detailed analytics on your leadership development journey</p>
                </div>
              </div>

              <div className="text-center">
                <ExecutiveButton 
                  onClick={() => {
                    setShowDemo(false);
                    onGetStarted();
                  }}
                  variant="primary"
                  size="lg"
                  className="bg-vivid-indigo hover:bg-vivid-indigo/90"
                >
                  Start Your 14-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </ExecutiveButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}