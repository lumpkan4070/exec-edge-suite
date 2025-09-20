import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DemoAccountSetup } from "@/components/admin/demo-account-setup";
import { SEOHead } from "@/components/seo/SEOHead";

const AdminDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <SEOHead 
        title="Admin Demo Setup - Apex Executive Performance Coach"
        description="Create demo account for Apple App Store review"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Demo Setup
          </h1>
          <p className="text-white/80">
            Create and manage demo accounts for app store reviewers
          </p>
        </div>

        <DemoAccountSetup />
      </div>
    </div>
  );
};

export default AdminDemo;