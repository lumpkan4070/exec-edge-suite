import { Crown, MapPin, Clock, Users, Zap, Heart, ArrowRight, Briefcase } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";

export default function Careers() {
  const openRoles = [
    {
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Build the next generation of AI-powered coaching algorithms that personalize leadership development for executives worldwide."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "New York, NY / Remote", 
      type: "Full-time",
      description: "Design intuitive experiences that make complex AI insights accessible and actionable for busy executives."
    },
    {
      title: "Executive Coach",
      department: "Content",
      location: "Remote",
      type: "Contract",
      description: "Develop scenario-based training content and coaching methodologies for our AI platform."
    },
    {
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "Austin, TX / Remote",
      type: "Full-time", 
      description: "Build scalable web applications that deliver seamless user experiences across our entire platform."
    },
    {
      title: "Head of Sales",
      department: "Sales",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead our sales organization as we scale to serve Fortune 500 companies and growing enterprises."
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Boston, MA / Remote",
      type: "Full-time",
      description: "Analyze user behavior and training effectiveness to continuously improve our AI coaching algorithms."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Comprehensive Health",
      description: "Medical, dental, vision, and mental health coverage for you and your family"
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description: "Annual learning budget, conference attendance, and internal mentorship programs"
    },
    {
      icon: Users,
      title: "Equity & Impact",
      description: "Meaningful equity participation and the chance to transform leadership development"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push boundaries and challenge conventional thinking in everything we do"
    },
    {
      title: "Authentic Excellence", 
      description: "We deliver exceptional quality while staying true to our values and mission"
    },
    {
      title: "Inclusive Leadership",
      description: "We believe diverse perspectives make us stronger and more innovative"
    },
    {
      title: "Continuous Growth",
      description: "We invest in each other's development and celebrate learning from challenges"
    }
  ];

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
            Build the Future of
            <span className="text-electric block">Leadership Development</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our mission to democratize executive presence training through cutting-edge AI technology. 
            Help shape how the next generation of leaders develops their authentic voice and influence.
          </p>
          <ExecutiveButton variant="primary" size="lg">
            View Open Positions
            <ArrowRight className="w-5 h-5 ml-2" />
          </ExecutiveButton>
        </div>
      </section>

      {/* Why APEX */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Work at APEX?</h2>
            <p className="text-lg text-muted-foreground">
              Be part of a team that's revolutionizing how professionals develop executive presence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <benefit.icon className="w-12 h-12 text-electric mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide how we work and grow together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="executive-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Find your next opportunity to make a meaningful impact
            </p>
          </div>
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <div key={index} className="executive-card p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-electric" />
                      <h3 className="text-xl font-bold text-foreground group-hover:text-electric transition-colors">
                        {role.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {role.department}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {role.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ExecutiveButton variant="outline">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </ExecutiveButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Hiring Process</h2>
            <p className="text-lg text-muted-foreground">
              We believe in a transparent, respectful hiring process that showcases mutual fit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Application", description: "Submit your resume and cover letter" },
              { step: "2", title: "Phone Screen", description: "Initial conversation with our team" },
              { step: "3", title: "Technical/Case", description: "Role-specific assessment or case study" },
              { step: "4", title: "Final Interview", description: "Meet the team and leadership" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-electric text-electric-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Don't See Your Role?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute.
          </p>
          <ExecutiveButton variant="primary" size="lg">
            Contact Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </ExecutiveButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-electric" />
            <span className="text-xl font-bold text-foreground">APEX</span>
          </Link>
          <p className="text-muted-foreground">&copy; 2025 APEX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}