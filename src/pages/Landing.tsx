import { useState } from "react";
import { ArrowRight, CheckCircle, Target, Brain, Zap, Crown, Users, BarChart3, Mic, Play, X } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { useUser } from "@/contexts/user-context";

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
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-electric" />
              <span className="text-2xl font-bold text-foreground">APEX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors scroll-smooth">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors scroll-smooth">Pricing</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors scroll-smooth">About</a>
            </div>
            <ExecutiveButton onClick={onGetStarted} variant="primary">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </ExecutiveButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background to-electric/5">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--electric-blue)_0%,_transparent_50%)] opacity-10"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-electric/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-electric/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-electric rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-electric/60 rounded-full animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Transform Leadership with
              <span className="text-electric bg-gradient-to-r from-electric to-electric-blue bg-clip-text text-transparent"> AI-Powered</span> Executive Training
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              <span className="text-electric font-semibold">89% of users report higher confidence in just 15 minutes a day.</span><br />
              Master high-stakes scenarios through immersive roleplay and personalized AI coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <ExecutiveButton onClick={onGetStarted} size="lg" variant="primary" className="shadow-electric/30 shadow-xl hover:shadow-electric/40 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </ExecutiveButton>
              <ExecutiveButton size="lg" variant="outline" onClick={() => setShowDemo(true)} className="hover:bg-electric/5 border-electric/40">
                Learn More About APEX
                <Play className="w-5 h-5 mr-2" />
              </ExecutiveButton>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="executive-card p-6 text-center">
              <div className="text-3xl font-bold text-electric mb-2">89%</div>
              <div className="text-muted-foreground">Confidence Increase</div>
            </div>
            <div className="executive-card p-6 text-center">
              <div className="text-3xl font-bold text-electric mb-2">15min</div>
              <div className="text-muted-foreground">Daily Practice</div>
            </div>
            <div className="executive-card p-6 text-center">
              <div className="text-3xl font-bold text-electric mb-2">2x</div>
              <div className="text-muted-foreground">Leadership Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-br from-charcoal-black via-charcoal-black to-electric/20 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--electric-blue)_0%,_transparent_70%)] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Executive-Grade Training
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Advanced AI technology meets executive expertise to deliver personalized training that adapts to your leadership style and challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <Brain className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Strategy Co-pilot</h3>
              <p className="text-white/70 leading-relaxed">
                Real-time strategic guidance powered by advanced AI. Get instant insights, decision frameworks, and leadership strategies tailored to your specific challenges.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <Target className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Immersive Scenarios</h3>
              <p className="text-white/70 leading-relaxed">
                Practice high-stakes situations in a safe environment. From investor pitches to crisis management, master every scenario that matters.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <Mic className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Voice & Presence</h3>
              <p className="text-white/70 leading-relaxed">
                Advanced voice AI analyzes your communication style and provides real-time feedback to enhance your executive presence and authority.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <BarChart3 className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Performance Analytics</h3>
              <p className="text-white/70 leading-relaxed">
                Track your leadership growth with detailed analytics. Measure confidence, decision-making speed, and communication effectiveness.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <Zap className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Habit Formation</h3>
              <p className="text-white/70 leading-relaxed">
                Build mission-critical daily behaviors that compound into executive excellence. Science-backed habit tracking and reinforcement.
              </p>
            </div>

            <div className="bg-card/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-card/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                <Users className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Leadership Coaching</h3>
              <p className="text-white/70 leading-relaxed">
                Personalized coaching that adapts to your role, industry, and leadership challenges. From entrepreneur to C-suite executive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible plans designed for every stage of your leadership journey. Start building executive presence today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Personal Plan */}
            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Personal</h3>
                <p className="text-muted-foreground mb-6">Perfect for individual professionals building their leadership foundation</p>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $29<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Basic AI Strategy Co-pilot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">5 scenario simulations/month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Performance habit tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Basic analytics</span>
                </div>
              </div>

              <ExecutiveButton 
                onClick={() => onSelectPlan ? onSelectPlan('personal') : onGetStarted()} 
                variant="outline" 
                className="w-full"
              >
                Start Personal Plan
              </ExecutiveButton>
            </div>

            {/* Professional Plan */}
            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-electric text-electric-foreground px-4 py-1 text-sm font-medium">
                RECOMMENDED
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Professional</h3>
                <p className="text-muted-foreground mb-6">Advanced training for senior leaders and executives</p>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $99<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Advanced AI Strategy Co-pilot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Unlimited scenario simulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Voice coaching & analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Advanced performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Weekly AI coaching reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric" />
                  <span className="text-muted-foreground">Priority support</span>
                </div>
              </div>

              <ExecutiveButton 
                onClick={() => onSelectPlan ? onSelectPlan('professional') : onGetStarted()} 
                variant="primary" 
                className="w-full"
              >
                Start Professional Plan
              </ExecutiveButton>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-sm text-muted-foreground">
              Need enterprise solutions? <a href="#contact" className="text-electric hover:underline">Contact our team</a>
            </p>
          </div>
        </div>
      </section>

      {/* Why Work at APEX Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-background via-background to-electric/5 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--electric-blue)_0%,_transparent_80%)] opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-electric/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-electric/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Why Work at APEX?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join a team that's transforming leadership development with cutting-edge AI and executive expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Enhanced testimonial */}
            <div className="relative">
              <div className="executive-card p-12 bg-gradient-to-br from-electric/5 to-electric/10 border-electric/20 relative">
                {/* Decorative elements */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-electric rounded-full opacity-60"></div>
                <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-electric/60 rounded-full opacity-80"></div>
                
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-electric to-electric/70 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <blockquote className="text-center">
                  <div className="text-6xl text-electric/30 mb-4 font-bold">"</div>
                  <p className="text-2xl font-medium text-foreground mb-6 leading-relaxed">
                    At APEX, I've grown faster than in any role before.
                  </p>
                  <footer className="text-muted-foreground text-lg">
                    — Sarah Chen, Senior Team Member
                  </footer>
                </blockquote>
              </div>
            </div>
            
            {/* Right side - Enhanced benefits grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="group p-6 executive-card hover:shadow-electric/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric/10 to-electric/20 rounded-2xl flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/30 transition-all duration-300 shadow-lg">
                    <Target className="w-8 h-8 text-electric" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Comprehensive Health</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">World-class medical, dental, and vision for you and your family.</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 executive-card hover:shadow-electric/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric/10 to-electric/20 rounded-2xl flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/30 transition-all duration-300 shadow-lg">
                    <Zap className="w-8 h-8 text-electric" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Flexible Work</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">Remote-first culture with flexible hours and unlimited PTO.</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 executive-card hover:shadow-electric/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric/10 to-electric/20 rounded-2xl flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/30 transition-all duration-300 shadow-lg">
                    <Brain className="w-8 h-8 text-electric" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Growth & Learning</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">Annual learning budget, mentorship, and conference access.</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 executive-card hover:shadow-electric/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric/10 to-electric/20 rounded-2xl flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/30 transition-all duration-300 shadow-lg">
                    <BarChart3 className="w-8 h-8 text-electric" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Equity & Impact</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">Equity participation and a chance to transform leadership.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/5 via-background to-electric/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-muted-foreground mb-8 font-medium">Featured in</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
              <div className="text-2xl font-bold text-muted-foreground hover:text-electric transition-colors cursor-pointer">Forbes</div>
              <div className="text-2xl font-bold text-muted-foreground hover:text-electric transition-colors cursor-pointer">Inc.</div>
              <div className="text-2xl font-bold text-muted-foreground hover:text-electric transition-colors cursor-pointer">Fast Company</div>
              <div className="text-2xl font-bold text-muted-foreground hover:text-electric transition-colors cursor-pointer">Harvard Business Review</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Master Executive Presence?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of leaders who've transformed their executive presence with APEX.
          </p>
          <ExecutiveButton onClick={onGetStarted} size="lg" variant="primary">
            Start Your 14-Day Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </ExecutiveButton>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-8 h-8 text-electric" />
                <span className="text-2xl font-bold text-foreground">APEX</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Transform leadership with AI-powered executive training.
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/company/apex-executive" className="text-muted-foreground hover:text-electric transition-colors" aria-label="LinkedIn">
                  <Users className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/apex_executive" className="text-muted-foreground hover:text-electric transition-colors" aria-label="Twitter">
                  <Target className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-electric transition-colors">About</a></li>
                <li><a href="/careers" className="text-muted-foreground hover:text-electric transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-muted-foreground hover:text-electric transition-colors">Blog</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-electric transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-muted-foreground hover:text-electric transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-electric transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 APEX Executive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">APEX Executive Demo</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-electric mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Experience Executive Presence Training</h4>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    See how APEX transforms professionals into confident leaders through AI-powered scenarios and real-time coaching.
                  </p>
                  <div className="space-y-4 text-left max-w-md mx-auto">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">AI Strategy Co-pilot</div>
                        <div className="text-sm text-muted-foreground">Real-time strategic guidance for high-stakes decisions</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">Immersive Roleplay</div>
                        <div className="text-sm text-muted-foreground">Practice investor pitches, negotiations, and crisis management</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">Voice Analysis</div>
                        <div className="text-sm text-muted-foreground">AI-powered feedback on tone, pace, and authority</div>
                      </div>
                    </div>
                  </div>
                  <ExecutiveButton onClick={onGetStarted} className="mt-6" variant="primary">
                    Start Your Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ExecutiveButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}