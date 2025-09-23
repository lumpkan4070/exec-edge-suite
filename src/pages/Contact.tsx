import { Crown, Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";
import { useState } from "react";
import apexLogo from "@/assets/apex-logo-v3.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "info@aclpublishing.com",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 9 AM - 5 PM PT",
      action: "Start Chat"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 500",
      zipcode: "San Francisco, CA 94105",
      phone: "+1 (415) 555-0123"
    },
    {
      city: "New York", 
      address: "456 Broadway, Floor 12",
      zipcode: "New York, NY 10013",
      phone: "+1 (212) 555-0123"
    },
    {
      city: "Austin",
      address: "789 Congress Ave, Suite 200",
      zipcode: "Austin, TX 78701", 
      phone: "+1 (512) 555-0123"
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
            Get in Touch with
            <span className="text-electric block">Our Team</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you have questions about our platform, need support, or want to discuss enterprise solutions, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How Can We Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="executive-card p-6 text-center hover:shadow-lg transition-shadow">
                <method.icon className="w-12 h-12 text-electric mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                <p className="text-muted-foreground mb-3">{method.description}</p>
                <p className="text-electric font-medium mb-4">{method.contact}</p>
                <ExecutiveButton variant="outline" className="w-full" onClick={() => {
                  if (method.action === "Send Email") {
                    window.open('mailto:info@aclpublishing.com?subject=General Inquiry&body=Hi APEX team,%0A%0A', '_blank');
                  } else if (method.action === "Call Now") {
                    window.open('tel:+15551234567', '_self');
                  } else if (method.action === "Start Chat") {
                    // Open live chat widget  
                    if (typeof window !== 'undefined' && (window as any).Intercom) {
                      (window as any).Intercom('show');
                    } else {
                      window.open('mailto:info@aclpublishing.com?subject=Live Chat Request', '_blank');
                    }
                  }
                }}>
                  {method.action}
                </ExecutiveButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - Attention Grabbing Design */}
      <section className="py-20 px-6 bg-gradient-to-br from-electric/20 via-primary/10 to-electric/30 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-electric/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-electric/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your
              <span className="text-electric block">Leadership Journey?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized guidance from our team. We'll help you choose the perfect plan and answer any questions about APEX Executive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-electric/20">
                <h3 className="text-2xl font-bold text-foreground mb-6">Why Contact Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-electric rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">Personalized Demo</h4>
                      <p className="text-muted-foreground text-sm">See APEX in action with scenarios tailored to your role</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-electric rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">Custom Pricing</h4>
                      <p className="text-muted-foreground text-sm">Enterprise solutions and volume discounts available</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-electric rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">Implementation Support</h4>
                      <p className="text-muted-foreground text-sm">White-glove onboarding for teams and organizations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-electric/20">
                <h3 className="text-xl font-bold text-foreground mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Live Chat</span>
                    <span className="text-electric font-medium">Instant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-electric font-medium">&lt; 4 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="text-electric font-medium">&lt; 1 hour</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-background rounded-3xl p-8 shadow-2xl border border-electric/10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h3>
                  <p className="text-muted-foreground">We'll get back to you within 4 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-xl border-2 border-muted bg-background text-foreground focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-xl border-2 border-muted bg-background text-foreground focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border-2 border-muted bg-background text-foreground focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground">
                      What can we help you with? *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border-2 border-muted bg-background text-foreground focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="demo">Schedule a Demo</option>
                      <option value="enterprise">Enterprise Solutions</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Question</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border-2 border-muted bg-background text-foreground focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all resize-none"
                      placeholder="Tell us about your goals and how we can help..."
                    />
                  </div>

                  <div className="pt-4">
                    <ExecutiveButton type="submit" variant="primary" className="w-full h-14 text-lg font-semibold rounded-xl bg-electric hover:bg-electric/90 transform hover:scale-[1.02] transition-all duration-200">
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </ExecutiveButton>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Or reach out directly: 
                      <a href="mailto:info@aclpublishing.com" className="text-electric hover:underline ml-1">
                        info@aclpublishing.com
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="text-center">
                <MapPin className="w-8 h-8 text-electric mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{office.city}</h3>
                <p className="text-muted-foreground mb-1">{office.address}</p>
                <p className="text-muted-foreground mb-3">{office.zipcode}</p>
                <p className="text-electric font-medium">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the power of AI-driven executive presence training
          </p>
          <Link to="/">
            <ExecutiveButton variant="primary" size="lg">
              Start Free Trial
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