import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DemoAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const demoCredentials = {
    email: "demo@apexexecutive.com",
    password: "AppleReview2024!"
  };

  const handleCreateDemoAccount = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-demo-account');
      
      if (error) {
        throw error;
      }

      setResult(data);
      
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        });
      }
    } catch (error: any) {
      console.error('Error creating demo account:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create demo account",
        variant: "destructive",
      });
      setResult({ success: false, error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const copyAllCredentials = () => {
    const credentialsText = `Demo Account for Apple App Store Review:

Email: ${demoCredentials.email}
Password: ${demoCredentials.password}

Instructions:
This account includes sample coaching data and full access to premium features. The executive dashboard shows pre-populated performance metrics and coaching progress.`;
    
    navigator.clipboard.writeText(credentialsText);
    toast({
      title: "Copied",
      description: "All credentials copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Demo Account Manager</h1>
          <p className="text-slate-600">Create and manage the demo account for Apple App Store reviewers</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Apple App Store Demo Account
            </CardTitle>
            <CardDescription>
              Demo account credentials for Apple App Store reviewers to test the app functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-slate-100 rounded border font-mono text-sm">
                    {demoCredentials.email}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(demoCredentials.email, "Email")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-slate-100 rounded border font-mono text-sm">
                    {showPassword ? demoCredentials.password : "••••••••••••••••"}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(demoCredentials.password, "Password")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateDemoAccount}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Creating..." : "Create/Verify Demo Account"}
              </Button>
              <Button
                variant="outline"
                onClick={copyAllCredentials}
              >
                Copy All Credentials
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                {result.success ? result.message : `Error: ${result.error}`}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>App Store Review Notes Template</CardTitle>
            <CardDescription>
              Copy this text into the "Review Notes" section in App Store Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-slate-100 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div><strong>Demo Account:</strong></div>
                  <div>Email: {demoCredentials.email}</div>
                  <div>Password: {demoCredentials.password}</div>
                  <div className="mt-3">
                    <strong>Instructions:</strong><br />
                    This account includes sample coaching data and full access to premium features. 
                    The executive dashboard shows pre-populated performance metrics and coaching progress.
                    Use the AI Strategy Copilot to test interactive coaching features.
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(
                  `Demo Account:\nEmail: ${demoCredentials.email}\nPassword: ${demoCredentials.password}\n\nInstructions:\nThis account includes sample coaching data and full access to premium features. The executive dashboard shows pre-populated performance metrics and coaching progress. Use the AI Strategy Copilot to test interactive coaching features.`,
                  "Review notes"
                )}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Review Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoAdmin;