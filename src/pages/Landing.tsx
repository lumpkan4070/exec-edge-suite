import { useState } from "react";
import { ArrowRight, CheckCircle, Target, Brain, Zap, Crown, Users, BarChart3, Mic, Play, X, Star, Shield, Briefcase, Heart, Clock, Globe, Award } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";
import executiveBoardroom from "@/assets/executive-boardroom.jpg";
import aiCoaching from "@/assets/ai-coaching.jpg";
import executivePresentation from "@/assets/executive-presentation.jpg";
import realisticAnalytics from "@/assets/realistic-analytics.jpg";

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
              <Crown className="w-8 h-8 text-vivid-indigo" />
              <span className="text-2xl font-bold text-charcoal font-playfair">APEX</span>
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

      {/* Features Section - Redesigned to 2-column layout as per WRD */}
      <section id="features" className="py-20 px-6 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-playfair">
              Executive-Grade Training
            </h2>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto font-lato">
              Advanced AI technology meets executive expertise to deliver personalized training that adapts to your leadership style and challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feature 1 - AI Strategy Co-pilot */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-silver">
              <div className="h-48 overflow-hidden">
                <img 
                  src={aiCoaching} 
                  alt="AI-powered executive coaching session with advanced technology interface"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center group-hover:bg-vivid-indigo/20 transition-colors">
                    <Brain className="w-6 h-6 text-vivid-indigo" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal font-playfair">AI Strategy Co-pilot</h3>
                </div>
                <p className="text-slate-gray leading-relaxed font-lato">
                  Real-time strategic guidance powered by advanced AI. Get instant insights, decision frameworks, and leadership strategies tailored to your specific challenges.
                </p>
              </div>
            </div>

            {/* Feature 2 - Immersive Scenarios */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-silver">
              <div className="h-48 overflow-hidden">
                <img 
                  src={executivePresentation} 
                  alt="Executive delivering confident presentation in modern boardroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center group-hover:bg-vivid-indigo/20 transition-colors">
                    <Target className="w-6 h-6 text-vivid-indigo" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal font-playfair">Immersive Scenarios</h3>
                </div>
                <p className="text-slate-gray leading-relaxed font-lato">
                  Practice high-stakes situations in a safe environment. From investor pitches to crisis management, master every scenario that matters.
                </p>
              </div>
            </div>

            {/* Feature 3 - Voice & Presence */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-silver">
              <div className="h-48 overflow-hidden">
                <img 
                  src={executiveBoardroom} 
                  alt="Professional business leaders engaged in strategic discussion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center group-hover:bg-vivid-indigo/20 transition-colors">
                    <Mic className="w-6 h-6 text-vivid-indigo" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal font-playfair">Voice & Presence</h3>
                </div>
                <p className="text-slate-gray leading-relaxed font-lato">
                  Advanced voice AI analyzes your communication style and provides real-time feedback to enhance your executive presence and authority.
                </p>
              </div>
            </div>

            {/* Feature 4 - Performance Analytics */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-silver">
              <div className="h-48 overflow-hidden">
                <img 
                  src={realisticAnalytics} 
                  alt="Executive analyzing detailed business performance analytics on multiple monitors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-vivid-indigo/10 rounded-lg flex items-center justify-center group-hover:bg-vivid-indigo/20 transition-colors">
                    <BarChart3 className="w-6 h-6 text-vivid-indigo" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal font-playfair">Performance Analytics</h3>
                </div>
                <p className="text-slate-gray leading-relaxed font-lato">
                  Track your leadership growth with detailed analytics. Measure confidence, decision-making speed, and communication effectiveness.
                </p>
              </div>
            </div>
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