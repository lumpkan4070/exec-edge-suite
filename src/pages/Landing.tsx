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
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
            <ExecutiveButton onClick={onGetStarted} variant="primary">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </ExecutiveButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Master Executive 
              <span className="text-electric"> Presence</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              AI-powered training platform that transforms professionals into confident, decisive leaders through immersive roleplay scenarios and personalized coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <ExecutiveButton onClick={onGetStarted} size="lg" variant="primary">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </ExecutiveButton>
              <ExecutiveButton size="lg" variant="outline" onClick={() => setShowDemo(true)}>
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
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
      <section id="features" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Executive-Grade Training
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI technology meets executive expertise to deliver personalized training that adapts to your leadership style and challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <Brain className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">AI Strategy Co-pilot</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time strategic guidance powered by advanced AI. Get instant insights, decision frameworks, and leadership strategies tailored to your specific challenges.
              </p>
            </div>

            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <Target className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Immersive Scenarios</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practice high-stakes situations in a safe environment. From investor pitches to crisis management, master every scenario that matters.
              </p>
            </div>

            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <Mic className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Voice & Presence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced voice AI analyzes your communication style and provides real-time feedback to enhance your executive presence and authority.
              </p>
            </div>

            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Performance Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track your leadership growth with detailed analytics. Measure confidence, decision-making speed, and communication effectiveness.
              </p>
            </div>

            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <Zap className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Habit Formation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build mission-critical daily behaviors that compound into executive excellence. Science-backed habit tracking and reinforcement.
              </p>
            </div>

            <div className="executive-card p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                <Users className="w-8 h-8 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Leadership Coaching</h3>
              <p className="text-muted-foreground leading-relaxed">
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

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for Executives, by Executives
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              APEX combines decades of executive experience with cutting-edge AI to deliver training that actually works in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">The Executive Edge</h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Most leadership training fails because it's theoretical. APEX is different. We use advanced AI to create realistic, high-pressure scenarios that mirror the exact challenges you face as an executive.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every interaction is designed to build the muscle memory of executive excellence - from how you pause before responding to objections, to how you command presence in a boardroom.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Used by Fortune 500 executives, startup founders, and senior leaders who demand training that delivers measurable results.
                </p>
              </div>
            </div>
            
            <div className="executive-card p-8">
              <h4 className="text-xl font-bold text-foreground mb-6">Why APEX Works</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Behavioral Science</div>
                    <div className="text-sm text-muted-foreground">Evidence-based methods for rapid skill acquisition</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Real-World Application</div>
                    <div className="text-sm text-muted-foreground">Scenarios based on actual executive challenges</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Personalized Learning</div>
                    <div className="text-sm text-muted-foreground">AI adapts to your role, industry, and leadership style</div>
                  </div>
                </div>
              </div>
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
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-6 h-6 text-electric" />
                <span className="text-xl font-bold text-foreground">APEX</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered executive presence training for the modern leader.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Demo</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Blog</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 APEX. All rights reserved.</p>
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