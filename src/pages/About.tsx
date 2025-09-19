import { Crown, Users, Target, Award, ArrowRight, CheckCircle } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-electric" />
              <span className="text-2xl font-bold text-foreground">APEX</span>
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Transforming Leaders Through
            <span className="text-electric block">AI-Powered Training</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            APEX was founded on the belief that executive presence isn't innate—it's learnable. 
            Our cutting-edge AI platform helps professionals develop the confidence and skills needed to lead at the highest levels.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize executive presence training by making world-class leadership development 
                accessible to ambitious professionals everywhere through innovative AI technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Personalized Learning</h3>
                    <p className="text-muted-foreground">AI adapts to your unique style and goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-World Application</h3>
                    <p className="text-muted-foreground">Practice with scenarios that matter to your role</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Measurable Results</h3>
                    <p className="text-muted-foreground">Track your progress with detailed analytics</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-electric/10 to-primary/10 rounded-2xl p-8">
              <Target className="w-16 h-16 text-electric mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where every professional has access to the tools and training they need to develop 
                authentic executive presence and lead with confidence in an AI-driven future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground">
              Bringing together expertise in AI, executive coaching, and leadership development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                background: "Former McKinsey Partner, Stanford MBA",
                icon: Users
              },
              {
                name: "Dr. Michael Rodriguez",
                role: "CTO & Co-Founder", 
                background: "AI Research, MIT PhD Computer Science",
                icon: Target
              },
              {
                name: "Jennifer Williams",
                role: "Head of Learning Design",
                background: "Executive Coach, 15+ years Fortune 500",
                icon: Award
              }
            ].map((member, index) => (
              <div key={index} className="executive-card p-6 text-center">
                <member.icon className="w-16 h-16 text-electric mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-electric font-semibold mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Innovation",
                description: "We push the boundaries of what's possible in leadership development"
              },
              {
                title: "Authenticity", 
                description: "We help leaders develop their unique executive presence, not a one-size-fits-all approach"
              },
              {
                title: "Excellence",
                description: "We maintain the highest standards in everything we do"
              },
              {
                title: "Impact",
                description: "We measure success by the positive change we create in our users' careers"
              }
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Leadership?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who have elevated their executive presence with APEX
          </p>
          <Link to="/">
            <ExecutiveButton variant="primary" size="lg">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </ExecutiveButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-electric" />
            <span className="text-xl font-bold text-foreground">APEX</span>
          </Link>
          <p className="text-muted-foreground">&copy; 2024 APEX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}