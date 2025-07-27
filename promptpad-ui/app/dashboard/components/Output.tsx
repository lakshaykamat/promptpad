import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Alert,
  AlertDescription,
} from "@/components/";
import { EnhancePromptApiResponse } from "@/lib";
import { 
  Copy, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

function Output({ data }: { data: EnhancePromptApiResponse }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.prompt);
      setCopySuccess(true);
      setCopyError(null);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyError("Failed to copy to clipboard. Please try again.");
      setCopySuccess(false);
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setCopyError(null);
      }, 5000);
    }
  };

  const clearCopyError = () => {
    setCopyError(null);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Enhanced Prompt</CardTitle>
              <p className="text-sm text-muted-foreground">Optimized for {data.platform}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {data.platform}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              disabled={copySuccess}
            >
              {copySuccess ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copy Success/Error Alerts */}
        {copySuccess && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Prompt copied to clipboard successfully!
            </AlertDescription>
          </Alert>
        )}
        
        {copyError && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <div className="flex items-center justify-between">
                <span>{copyError}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCopyError}
                  className="text-destructive hover:bg-destructive/20 h-6 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Prompt Content */}
        <div className="bg-muted/50 p-6 rounded-lg border border-border h-96 overflow-y-auto">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-muted rounded-lg mt-1 flex-shrink-0">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground break-words">
                {data.prompt}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Character Count */}
        <div className="text-xs text-muted-foreground text-right">
          {data.prompt.length} characters
        </div>
      </CardContent>
    </Card>
  );
}

export default Output;