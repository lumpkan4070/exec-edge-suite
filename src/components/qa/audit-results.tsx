import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Clock, Target, Brain, Crown, ExternalLink, Zap } from "lucide-react";
import { ExecutiveButton } from "@/components/ui/executive-button";

interface AuditItem {
  id: string;
  title: string;
  status: "pass" | "fail" | "warning" | "pending";
  severity: "P0" | "P1" | "P2" | "P3";
  description: string;
  category: "forms" | "pages" | "flows" | "ui" | "performance" | "security";
}

const auditResults: AuditItem[] = [
  // FORMS AUDIT
  {
    id: "F001",
    title: "Contact Form Submission",
    status: "fail",
    severity: "P0",
    category: "forms",
    description: "Contact form only logs to console, no backend integration or email sending configured"
  },
  {
    id: "F002", 
    title: "Contact Form Validation",
    status: "pass",
    severity: "P1",
    category: "forms",
    description: "Form validates required fields and email format correctly"
  },
  {
    id: "F003",
    title: "Contact Form UI/UX",
    status: "pass",
    severity: "P2",
    category: "forms", 
    description: "Form styled consistently with design system and responsive"
  },
  {
    id: "F004",
    title: "Newsletter Opt-in",
    status: "pending",
    severity: "P2",
    category: "forms",
    description: "Newsletter signup functionality not yet implemented"
  },

  // PAGES AUDIT
  {
    id: "P001",
    title: "Landing Page Load",
    status: "pass",
    severity: "P0",
    category: "pages",
    description: "Landing page renders correctly on all devices with proper navigation"
  },
  {
    id: "P002",
    title: "About Page",
    status: "pass", 
    severity: "P1",
    category: "pages",
    description: "About page loads correctly with no broken links"
  },
  {
    id: "P003",
    title: "Blog Pages",
    status: "pass",
    severity: "P1", 
    category: "pages",
    description: "Blog index and individual posts render correctly"
  },
  {
    id: "P004",
    title: "Contact Page", 
    status: "pass",
    severity: "P1",
    category: "pages",
    description: "Contact page loads with attention-grabbing layout and proper form"
  },
  {
    id: "P005",
    title: "Help Center",
    status: "pass",
    severity: "P2",
    category: "pages", 
    description: "Help/FAQ page loads correctly with proper content structure"
  },
  {
    id: "P006",
    title: "Privacy Policy",
    status: "pass",
    severity: "P2",
    category: "pages",
    description: "Privacy page loads correctly with updated 2025 copyright"
  },

  // APP FLOWS AUDIT
  {
    id: "AF001",
    title: "Authentication Flow",
    status: "pass",
    severity: "P0", 
    category: "flows",
    description: "Supabase auth integration working correctly with sign-in/sign-up"
  },
  {
    id: "AF002",
    title: "Onboarding Flow",
    status: "pass",
    severity: "P0",
    category: "flows", 
    description: "Complete onboarding flow from tier selection to dashboard works properly"
  },
  {
    id: "AF003",
    title: "Dashboard Navigation",
    status: "pass",
    severity: "P1",
    category: "flows",
    description: "Dashboard components (Strategy Copilot, Scenarios, Habits) load correctly"
  },
  {
    id: "AF004",
    title: "Payment Flow - Landing",
    status: "pass",
    severity: "P0",
    category: "flows",
    description: "Payment flow from landing page pricing section works correctly"
  },
  {
    id: "AF005", 
    title: "Payment Flow - Dashboard",
    status: "fail",
    severity: "P0",
    category: "flows",
    description: "CRITICAL: Dashboard 'Upgrade Now' button leads to broken subscription flow"
  },
  {
    id: "AF006",
    title: "AI Strategy Co-pilot",
    status: "pass",
    severity: "P1", 
    category: "flows",
    description: "AI co-pilot loads and responds correctly with OpenAI integration"
  },
  {
    id: "AF007",
    title: "Scenario Library",
    status: "pass",
    severity: "P1",
    category: "flows",
    description: "Scenario library loads with proper role-based scenarios"
  },
  {
    id: "AF008",
    title: "Performance Analytics",
    status: "pass",
    severity: "P2",
    category: "flows", 
    description: "Performance metrics display correctly with simulated data"
  },

  // UI/UX AUDIT
  {
    id: "UI001",
    title: "Brand Consistency",
    status: "pass",
    severity: "P1",
    category: "ui",
    description: "Consistent use of design system colors and Electric Blue theme"
  },
  {
    id: "UI002",
    title: "Responsive Design",
    status: "pass", 
    severity: "P1",
    category: "ui",
    description: "All pages responsive across mobile, tablet, desktop"
  },
  {
    id: "UI003",
    title: "Font Application",
    status: "pass",
    severity: "P2",
    category: "ui",
    description: "Consistent font usage across application"
  },
  {
    id: "UI004",
    title: "Dark/Light Mode",
    status: "warning",
    severity: "P2", 
    category: "ui",
    description: "Some contrast issues in certain components for accessibility"
  },

  // PERFORMANCE AUDIT  
  {
    id: "PERF001",
    title: "Page Load Times",
    status: "pass",
    severity: "P1",
    category: "performance",
    description: "All pages load under 3 seconds on standard connection"
  },
  {
    id: "PERF002",
    title: "App Transitions",
    status: "pass",
    severity: "P2", 
    category: "performance",
    description: "Smooth transitions between app screens under 300ms"
  },

  // SECURITY AUDIT
  {
    id: "SEC001",
    title: "HTTPS/TLS",
    status: "pass",
    severity: "P0",
    category: "security",
    description: "All communications use HTTPS/TLS encryption"
  },
  {
    id: "SEC002",
    title: "Form Security",
    status: "warning",
    severity: "P1",
    category: "security", 
    description: "Contact form lacks spam prevention (captcha/honeypot)"
  },
  {
    id: "SEC003",
    title: "Data Storage",
    status: "pass",
    severity: "P1",
    category: "security",
    description: "No sensitive data stored in plain text, proper Supabase security"
  }
];

export default function AuditResults() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredResults = selectedCategory === "all" 
    ? auditResults 
    : auditResults.filter(item => item.category === selectedCategory);

  const statusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "fail": return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "pending": return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const severityColor = (severity: string) => {
    switch (severity) {
      case "P0": return "text-red-600 bg-red-50 border-red-200";
      case "P1": return "text-orange-600 bg-orange-50 border-orange-200"; 
      case "P2": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "P3": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTotalsByStatus = () => {
    return {
      pass: auditResults.filter(item => item.status === "pass").length,
      fail: auditResults.filter(item => item.status === "fail").length,
      warning: auditResults.filter(item => item.status === "warning").length,
      pending: auditResults.filter(item => item.status === "pending").length
    };
  };

  const getCriticalIssues = () => {
    return auditResults.filter(item => 
      (item.status === "fail" || item.status === "warning") && 
      (item.severity === "P0" || item.severity === "P1")
    );
  };

  const totals = getTotalsByStatus();
  const criticalIssues = getCriticalIssues();
  const overallScore = Math.round((totals.pass / auditResults.length) * 100);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Crown className="w-10 h-10 text-electric" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">APEX Executive</h1>
                <p className="text-xl text-muted-foreground">Comprehensive Application Audit Report</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">{overallScore}%</div>
              <div className="text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="executive-card p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totals.pass}</div>
            <div className="text-muted-foreground">Passing</div>
          </div>
          <div className="executive-card p-6 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totals.fail}</div>
            <div className="text-muted-foreground">Failed</div>
          </div>
          <div className="executive-card p-6 text-center">
            <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totals.warning}</div>
            <div className="text-muted-foreground">Warnings</div>
          </div>
          <div className="executive-card p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totals.pending}</div>
            <div className="text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Critical Issues Alert */}
        {criticalIssues.length > 0 && (
          <div className="executive-card p-6 mb-8 border-red-200 bg-red-50">
            <div className="flex items-center space-x-3 mb-4">
              <XCircle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-800">Critical Issues Requiring Immediate Attention</h2>
            </div>
            <div className="space-y-3">
              {criticalIssues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${severityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                  <div>
                    <div className="font-medium text-red-800">{issue.title}</div>
                    <div className="text-red-700 text-sm">{issue.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {["all", "forms", "pages", "flows", "ui", "performance", "security"].map((category) => (
              <ExecutiveButton
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </ExecutiveButton>
            ))}
          </div>
        </div>

        {/* Detailed Results */}
        <div className="executive-card p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Audit Results</h2>
          <div className="space-y-4">
            {filteredResults.map((item) => (
              <div key={item.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityColor(item.severity)}`}>
                      {item.id} - {item.severity}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-foreground">{item.title}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {statusIcon(item.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Recommendation */}
        <div className="mt-8 executive-card p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Launch Readiness Assessment</h2>
            
            {criticalIssues.filter(issue => issue.severity === "P0").length > 0 ? (
              <div className="space-y-4">
                <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                <div className="text-xl font-bold text-red-600">NOT READY FOR PRODUCTION</div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {criticalIssues.filter(issue => issue.severity === "P0").length} critical P0 issues must be resolved before launch. 
                  Primary concerns: Contact form integration and dashboard payment flow.
                </p>
                <div className="space-y-2">
                  <ExecutiveButton variant="primary" className="mr-4">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Fix Critical Issues
                  </ExecutiveButton>
                  <ExecutiveButton variant="outline">
                    View Deployment Guide
                  </ExecutiveButton>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <div className="text-xl font-bold text-green-600">APPROVED FOR LAUNCH</div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  All critical systems are functional. Minor issues can be addressed post-launch. 
                  Application meets production readiness standards.
                </p>
                <div className="space-y-2">
                  <ExecutiveButton variant="primary" className="mr-4">
                    <Zap className="w-4 h-4 mr-2" />
                    Deploy to Production
                  </ExecutiveButton>
                  <ExecutiveButton variant="outline">
                    View Launch Checklist
                  </ExecutiveButton>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Target className="w-8 h-8 text-electric mx-auto mb-2" />
                <div className="font-bold text-foreground">Next Sprint</div>
                <div className="text-sm text-muted-foreground">Fix P0/P1 issues</div>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-electric mx-auto mb-2" />
                <div className="font-bold text-foreground">Performance</div>
                <div className="text-sm text-muted-foreground">Optimize load times</div>
              </div>
              <div className="text-center">
                <Crown className="w-8 h-8 text-electric mx-auto mb-2" />
                <div className="font-bold text-foreground">Enhancement</div>
                <div className="text-sm text-muted-foreground">Add advanced features</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}