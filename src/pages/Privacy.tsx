import { Crown, Shield, Lock, Eye, Database, Users } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";
import apexLogo from "@/assets/apex-logo-v3.png";

export default function Privacy() {
  const principles = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your personal and training data is encrypted and protected with enterprise-grade security measures."
    },
    {
      icon: Lock,
      title: "Secure Storage", 
      description: "All data is stored on secure, SOC 2 compliant infrastructure with regular security audits."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We're clear about what data we collect, how we use it, and who has access to it."
    },
    {
      icon: Users,
      title: "User Control",
      description: "You have full control over your data with options to export, modify, or delete your information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={apexLogo} 
                alt="APEX Executive Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <Link to="/">
              <ExecutiveButton variant="outline">Back to Home</ExecutiveButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Privacy Policy &
            <span className="text-electric block">Data Protection</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your privacy is our priority. Learn how we collect, use, and protect your data while delivering world-class AI-powered training.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: March 19, 2024
          </p>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Privacy Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="text-center">
                <principle.icon className="w-12 h-12 text-electric mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* Information We Collect */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-8 h-8 text-electric" />
                <h2 className="text-2xl font-bold text-foreground m-0">Information We Collect</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>When you create an account, we collect your name, email address, company information, and billing details. This information is necessary to provide our services and process payments.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Training Data</h3>
                  <p>During training sessions, we collect voice recordings, performance metrics, interaction patterns, and feedback responses. This data is used exclusively to personalize your training experience and track your progress.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Usage Analytics</h3>
                  <p>We collect information about how you use our platform, including features accessed, time spent in training modules, and technical performance data to improve our services.</p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-electric" />
                <h2 className="text-2xl font-bold text-foreground m-0">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3 list-disc list-inside">
                  <li>Deliver personalized AI-powered coaching and training experiences</li>
                  <li>Track your progress and provide performance analytics</li>
                  <li>Process payments and manage your subscription</li>
                  <li>Communicate with you about updates, features, and support</li>
                  <li>Improve our platform through aggregated, anonymized data analysis</li>
                  <li>Ensure platform security and prevent unauthorized access</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-8 h-8 text-electric" />
                <h2 className="text-2xl font-bold text-foreground m-0">Data Security & Protection</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Encryption</h3>
                  <p>All data is encrypted both in transit and at rest using industry-standard AES-256 encryption. Our platform uses HTTPS/TLS protocols for all communications.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Access Controls</h3>
                  <p>We implement strict access controls and multi-factor authentication for all team members. Data access is limited to authorized personnel on a need-to-know basis.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Infrastructure Security</h3>
                  <p>Our platform is hosted on SOC 2 Type II certified infrastructure with regular security audits, penetration testing, and vulnerability assessments.</p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-electric" />
                <h2 className="text-2xl font-bold text-foreground m-0">Data Sharing & Third Parties</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <p className="font-semibold text-foreground">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Service Providers</h3>
                  <p>We work with trusted service providers for payment processing, cloud hosting, and analytics. These partners are bound by strict data protection agreements and can only use your data to provide services to us.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Legal Requirements</h3>
                  <p>We may disclose information if required by law, court order, or to protect our rights and the safety of our users.</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 text-electric" />
                <h2 className="text-2xl font-bold text-foreground m-0">Your Rights & Control</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="space-y-3 list-disc list-inside">
                  <li><strong className="text-foreground">Access:</strong> Request a copy of your personal data</li>
                  <li><strong className="text-foreground">Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-foreground">Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong className="text-foreground">Restrict Processing:</strong> Limit how we use your data</li>
                </ul>
                <p className="mt-4">To exercise these rights, contact us at <span className="text-electric">privacy@apex-training.com</span></p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We retain your data for as long as necessary to provide our services and fulfill legal obligations:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Account data: While your account is active and for 12 months after cancellation</li>
                  <li>Training recordings: 24 months after creation or until you request deletion</li>
                  <li>Billing information: 7 years for tax and legal compliance</li>
                  <li>Support communications: 3 years after resolution</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-background p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <div className="text-muted-foreground space-y-2">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-1">
                  <p><strong className="text-foreground">Email:</strong> privacy@apex-training.com</p>
                  <p><strong className="text-foreground">Mail:</strong> APEX Privacy Team, 123 Market Street, Suite 500, San Francisco, CA 94105</p>
                  <p><strong className="text-foreground">Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Questions About Privacy?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help you understand how we protect your data
          </p>
          <Link to="/contact">
            <ExecutiveButton variant="primary" size="lg">
              Contact Privacy Team
            </ExecutiveButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src={apexLogo} 
              alt="APEX Executive Logo" 
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-muted-foreground">&copy; 2025 APEX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}