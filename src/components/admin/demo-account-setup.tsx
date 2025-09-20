import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const DemoAccountSetup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [demoAccount, setDemoAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createDemoAccount = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-demo-account');
      
      if (error) throw error;
      
      setDemoAccount(data);
      toast({
        title: "Success",
        description: "Demo account created for Apple App Store review",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to create demo account",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Apple App Store Demo Account Setup
        </CardTitle>
        <CardDescription>
          Create a demo account for Apple App Store reviewers to test your app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!demoAccount ? (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will create a demo account with email "demo@apexexecutive.com" and password "AppleReview2024!" 
                that Apple reviewers can use to test your app. The account will have premium features enabled.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={createDemoAccount} 
              disabled={isCreating}
              className="w-full"
            >
              {isCreating ? "Creating Demo Account..." : "Create Demo Account"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Demo account created successfully! Use these credentials in App Store Connect.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">Email:</span>
                  <br />
                  <code className="text-sm">{demoAccount.email}</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(demoAccount.email)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-semibold">Password:</span>
                  <br />
                  <code className="text-sm">{demoAccount.password}</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(demoAccount.password)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>For App Store Connect:</strong>
                <br />
                Add these credentials to your app's "Review Information" section in App Store Connect. 
                Include a note that this account has premium features enabled and sample coaching data pre-loaded.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};