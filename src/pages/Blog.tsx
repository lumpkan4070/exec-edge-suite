import { Crown, Calendar, User, ArrowRight, TrendingUp, Lightbulb, Target } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";
import { Link } from "react-router-dom";

export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of Executive Presence in an AI-Driven World",
      excerpt: "How artificial intelligence is reshaping leadership communication and what it means for modern executives.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Leadership",
      icon: TrendingUp,
      featured: true
    },
    {
      title: "5 Essential Skills Every Executive Needs in 2024",
      excerpt: "From emotional intelligence to digital fluency, discover the competencies that define successful leaders today.",
      author: "Dr. Michael Rodriguez",
      date: "March 10, 2024", 
      category: "Skills Development",
      icon: Target
    },
    {
      title: "Mastering Virtual Leadership: Executive Presence on Screen",
      excerpt: "Best practices for maintaining executive gravitas and influence in remote and hybrid work environments.",
      author: "Jennifer Williams",
      date: "March 5, 2024",
      category: "Remote Leadership",
      icon: Lightbulb
    },
    {
      title: "The Psychology of Confidence: Building Unshakeable Executive Presence",
      excerpt: "Understanding the cognitive and behavioral patterns that create authentic leadership confidence.",
      author: "Sarah Chen",
      date: "February 28, 2024",
      category: "Psychology",
      icon: Target
    },
    {
      title: "AI-Powered Coaching: Personalized Development at Scale",
      excerpt: "How machine learning algorithms are revolutionizing executive coaching and leadership development.",
      author: "Dr. Michael Rodriguez", 
      date: "February 22, 2024",
      category: "Technology",
      icon: TrendingUp
    },
    {
      title: "Crisis Leadership: Maintaining Executive Presence Under Pressure",
      excerpt: "Strategies for leading with clarity and confidence during organizational challenges and uncertainty.",
      author: "Jennifer Williams",
      date: "February 15, 2024",
      category: "Crisis Management",
      icon: Lightbulb
    }
  ];

  const categories = ["All", "Leadership", "Skills Development", "Remote Leadership", "Psychology", "Technology", "Crisis Management"];

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
            Leadership Insights & 
            <span className="text-electric block">Executive Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stay ahead with cutting-edge research, practical strategies, and expert perspectives on executive presence and leadership development.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" 
                    ? "bg-electric text-electric-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-electric/20 hover:text-electric"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
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
                <div className="bg-gradient-to-br from-electric/20 to-primary/20 rounded-xl p-12 flex items-center justify-center">
                  <post.icon className="w-24 h-24 text-electric" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <article key={index} className="executive-card group cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <post.icon className="w-6 h-6 text-electric" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-electric transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-electric group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
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