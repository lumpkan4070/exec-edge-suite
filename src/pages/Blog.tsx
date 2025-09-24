import React from "react";
import { ArrowRight, Clock, User, Calendar, BookOpen, Download, ExternalLink, TrendingUp, Users, Target, Award, Crown } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData } from "@/components/seo/StructuredData";
import { BlogStructuredData } from "@/components/seo/BlogStructuredData";
import { Link, useNavigate } from "react-router-dom";

import apexLogo from "@/assets/apex-logo-final-new.png";

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const handleGetStarted = () => {
    navigate('/');
  };

  const blogPosts = [
    {
      title: "The Science Behind AI-Powered Leadership Coaching: 89% Confidence Study",
      excerpt: "Discover how artificial intelligence is revolutionizing executive training and why 89% of users report higher confidence. Full methodology and data included.",
      author: "Dr. Sarah Chen, PhD",
      date: "March 15, 2024",
      category: "Research",
      readTime: "12 min read",
      featured: true,
      studyLink: "https://apex-executive.com/research/confidence-study-methodology"
    },
    {
      title: "Mastering Difficult Conversations: A CEO's Proven Framework",
      excerpt: "Learn the exact 5-step framework used by Fortune 500 CEOs to handle challenging discussions with investors, board members, and team members.",
      author: "Michael Rodriguez, Former Fortune 500 CEO",
      date: "March 10, 2024", 
      category: "Leadership Skills",
      readTime: "10 min read"
    },
    {
      title: "Building Executive Presence in Virtual Meetings: Data-Driven Strategies",
      excerpt: "Essential strategies for commanding authority and influence in remote boardroom presentations. Based on analysis of 10,000+ executive video calls.",
      author: "Dr. Emily Watson, Communication Expert",
      date: "March 5, 2024",
      category: "Virtual Leadership",
      readTime: "8 min read"
    },
    {
      title: "Crisis Management: How Top CEOs Navigate $50M+ Challenges",
      excerpt: "Real case studies and frameworks from executives who successfully managed major organizational crises. Includes decision trees and communication templates.",
      author: "Crisis Management Institute",
      date: "February 28, 2024",
      category: "Crisis Leadership",
      readTime: "15 min read"
    },
    {
      title: "The ROI of Executive Coaching: $7 Return for Every $1 Invested",
      excerpt: "Comprehensive analysis of performance improvements and business outcomes from AI-powered coaching programs. Includes benchmark data from 500+ executives.",
      author: "APEX Analytics Team", 
      date: "February 22, 2024",
      category: "ROI Research",
      readTime: "11 min read"
    },
    {
      title: "Negotiation Mastery: How to Close $10M+ Deals with Confidence",
      excerpt: "Advanced techniques for high-stakes negotiations, backed by behavioral psychology research and real-world examples from successful M&A executives.",
      author: "Jennifer Williams, M&A Expert",
      date: "February 15, 2024",
      category: "Negotiation",
      readTime: "13 min read"
    }
  ];

  const categories = ["All", "Research", "Leadership Skills", "Virtual Leadership", "Crisis Leadership", "ROI Research", "Negotiation"];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const whitepapers = [
    {
      title: "The Executive's Guide to AI-Powered Performance",
      description: "Comprehensive 32-page research report on implementing AI coaching in enterprise environments.",
      pages: "32 pages",
      type: "Whitepaper"
    },
    {
      title: "Leadership Confidence Metrics: 2024 Benchmark Study",
      description: "Industry benchmarks and KPIs for measuring executive confidence and leadership effectiveness.",
      pages: "24 pages", 
      type: "Research Report"
    },
    {
      title: "Crisis Communication Playbook for Executives",
      description: "Step-by-step frameworks and templates for managing stakeholder communications during crises.",
      pages: "16 pages",
      type: "Playbook"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Executive Leadership Resources | APEX Executive Blog & Research"
        description="Expert insights on AI-powered executive coaching, leadership development, crisis management, and executive presence. Download research reports and case studies."
        keywords="executive leadership blog, leadership development resources, crisis management guide, executive coaching research, leadership whitepapers"
        canonical="https://apex-executive.com/blog"
      />
      <StructuredData type="Organization" />
      {filteredPosts.slice(0, 3).map((post, index) => (
        <BlogStructuredData
          key={index}
          title={post.title}
          excerpt={post.excerpt}
          category={post.category}
          url={`https://apex-executive.com/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      ))}

      {/* Header */}
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
              <Link to="/features" className="text-slate-gray hover:text-charcoal transition-colors font-lato">Features</Link>
              <Link to="/blog" className="text-primary border-b-2 border-primary transition-colors font-lato">Resources</Link>
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
              Executive Leadership
              <span className="text-vivid-indigo"> Resources</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-lato">
              Research-backed insights, proven frameworks, and real case studies from the world's leading executives and leadership experts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <ExecutiveButton onClick={() => document.getElementById('whitepapers')?.scrollIntoView({ behavior: 'smooth' })} variant="secondary" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Resources
              </ExecutiveButton>
              <ExecutiveButton onClick={handleGetStarted} variant="primary" size="lg">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </ExecutiveButton>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Article categories" role="tablist">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 ${
                    category === selectedCategory 
                      ? "bg-electric text-electric-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-electric/20 hover:text-electric"
                  }`}
                  role="tab"
                  aria-selected={category === selectedCategory}
                  aria-controls="articles-section"
                >
                  {category}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post, index) => (
        <section key={index} className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-electric/10 to-primary/10 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-electric text-electric-foreground text-sm font-medium rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-4">{post.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                  <ExecutiveButton variant="primary">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </ExecutiveButton>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-12 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-24 h-24 text-primary mx-auto mb-6" />
                    <p className="text-lg text-slate-700 font-lato">
                      <span className="text-3xl font-bold text-primary">89%</span><br />
                      confidence increase documented
                    </p>
                    <a 
                      href={blogPosts[0].studyLink} 
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium underline mt-2 block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Study Methodology →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Blog Posts Grid */}
      <section id="articles-section" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <article key={index} className="executive-card group cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-electric transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-electric group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers & Resources */}
      <section id="whitepapers" className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Executive Resources & Whitepapers</h2>
            <p className="text-lg text-muted-foreground">
              In-depth research reports and frameworks for strategic decision-making
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <div key={index} className="executive-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                      {paper.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{paper.pages}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{paper.title}</h3>
                  <p className="text-muted-foreground mb-6">{paper.description}</p>
                  <ExecutiveButton variant="secondary" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </ExecutiveButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-gradient-to-r from-electric/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Informed</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest insights on executive presence and leadership directly in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-electric"
            />
            <ExecutiveButton variant="primary">
              Subscribe
            </ExecutiveButton>
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
          <p className="text-muted-foreground">&copy; 2025 APEX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}