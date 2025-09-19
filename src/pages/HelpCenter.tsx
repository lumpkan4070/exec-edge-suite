import { Crown, Search, Book, MessageCircle, Video, HelpCircle, ArrowRight, CheckCircle } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of APEX and set up your account",
      articles: 12
    },
    {
      icon: Video,
      title: "Training Modules", 
      description: "How to use our AI-powered training scenarios",
      articles: 18
    },
    {
      icon: MessageCircle,
      title: "AI Co-pilot",
      description: "Making the most of your AI strategy assistant",
      articles: 8
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 15
    }
  ];

  const popularArticles = [
    {
      title: "How to Get Started with APEX",
      category: "Getting Started",
      readTime: "3 min read"
    },
    {
      title: "Understanding Your Performance Analytics",
      category: "Training Modules",
      readTime: "5 min read"
    },
    {
      title: "Setting Up Your AI Co-pilot Preferences",
      category: "AI Co-pilot", 
      readTime: "4 min read"
    },
    {
      title: "Troubleshooting Audio Issues During Training",
      category: "Troubleshooting",
      readTime: "2 min read"
    },
    {
      title: "How to Track Your Progress Over Time",
      category: "Training Modules",
      readTime: "6 min read"
    },
    {
      title: "Customizing Your Training Scenarios",
      category: "Training Modules",
      readTime: "4 min read"
    }
  ];

  const faqs = [
    {
      question: "How does the AI co-pilot work?",
      answer: "Our AI co-pilot uses advanced natural language processing to analyze your communication patterns and provide real-time, personalized coaching suggestions based on executive presence best practices."
    },
    {
      question: "Can I use APEX on mobile devices?",
      answer: "Yes, APEX is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android that provide the full training experience."
    },
    {
      question: "How often should I use APEX for best results?",
      answer: "We recommend 15-20 minutes of training 3-4 times per week for optimal skill development. Consistency is more important than duration."
    },
    {
      question: "Is my training data private and secure?",
      answer: "Absolutely. All your training sessions and personal data are encrypted and stored securely. We never share individual user data with third parties."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until your current billing period ends."
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
      <section className="py-16 px-6 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            How Can We
            <span className="text-electric block">Help You Today?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers, get support, and make the most of your APEX experience
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="executive-card p-6 cursor-pointer group hover:shadow-lg transition-shadow">
                <category.icon className="w-12 h-12 text-electric mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-electric transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <p className="text-sm text-electric font-medium">{category.articles} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <div key={index} className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                <span className="inline-block px-3 py-1 bg-electric/10 text-electric text-sm font-medium rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-electric transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground">{article.readTime}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-xl p-6 bg-card">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-electric mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is here to help you succeed with APEX
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-xl p-6 border border-border">
              <MessageCircle className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
              <ExecutiveButton variant="outline" className="w-full">
                Start Chat
              </ExecutiveButton>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <Book className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us your questions and we'll respond within 24 hours</p>
              <ExecutiveButton variant="outline" className="w-full">
                Send Email
              </ExecutiveButton>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <Video className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Video Tutorials</h3>
              <p className="text-muted-foreground mb-4">Watch step-by-step guides and training videos</p>
              <ExecutiveButton variant="outline" className="w-full">
                Watch Videos
              </ExecutiveButton>
            </div>
          </div>
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