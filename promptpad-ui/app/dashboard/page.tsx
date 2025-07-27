"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Textarea,
  Alert,
  AlertDescription,
} from "@/components/index";
import { EnhancePromptApiResponse, getEnhancedPrompt } from "@/lib";
import Output from "./components/Output";
import {
  Sparkles,
  Target,
  MessageSquare,
  FileText,
  Mail,
  Code,
  Video,
  Linkedin,
  Twitter,
  Lightbulb,
  Home,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";

// Constants for input validation
const INPUT_LIMITS = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 500,
  MIN_LENGTH_MESSAGE: "Please provide more details",
  MAX_LENGTH_MESSAGE: "Consider shortening your description",
  GOOD_LENGTH_MESSAGE: "Good length",
} as const;

// Progress message patterns for filtering
const PROGRESS_PATTERNS = [
  "Analyzing context",
  "Extracting intent", 
  "Generating base prompt",
  "Enhancing prompt",
  "Refining prompt",
] as const;

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<EnhancePromptApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [currentProgress, setCurrentProgress] = useState("");

  // Computed state for input validation
  const inputLength = userInput.length;
  const inputStatus = inputLength < INPUT_LIMITS.MIN_LENGTH 
    ? INPUT_LIMITS.MIN_LENGTH_MESSAGE
    : inputLength > INPUT_LIMITS.MAX_LENGTH
    ? INPUT_LIMITS.MAX_LENGTH_MESSAGE
    : INPUT_LIMITS.GOOD_LENGTH_MESSAGE;

  const platforms = [
    {
      value: "Twitter",
      label: "Twitter",
      icon: Twitter,
      description: "Social media posts",
    },
    {
      value: "LinkedIn",
      label: "LinkedIn",
      icon: Linkedin,
      description: "Professional content",
    },
    {
      value: "YouTube",
      label: "YouTube",
      icon: Video,
      description: "Video scripts",
    },
    {
      value: "Blog",
      label: "Blog",
      icon: FileText,
      description: "Articles & posts",
    },
    {
      value: "Email",
      label: "Email",
      icon: Mail,
      description: "Professional emails",
    },
    {
      value: "ChatGPT",
      label: "ChatGPT",
      icon: MessageSquare,
      description: "AI conversations",
    },
    {
      value: "Cursor",
      label: "Cursor",
      icon: Code,
      description: "Coding assistance",
    },
  ];

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError("Please enter a content idea to generate a prompt.");
      return;
    }

    if (!selectedPlatform) {
      setError("Please select a platform to generate a prompt.");
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);
    setTyping(false);
    setDisplayedPrompt("");
    setCurrentProgress("");

    try {
      const response = await getEnhancedPrompt(
        userInput.trim(),
        selectedPlatform,
        (chunk) => {
          // Real-time streaming from Flask API
          // Show progress messages
          if (PROGRESS_PATTERNS.some(pattern => chunk.includes(pattern))) {
            setCurrentProgress(chunk.trim());
            return;
          }
          
          // Only show content after the "===" marker (the actual prompt)
          if (chunk.includes("===")) {
            // Reset and start showing the actual prompt
            setDisplayedPrompt("");
            setTyping(true);
            setCurrentProgress(""); // Clear progress message
          } else if (chunk.includes("Enhanced Prompt for")) {
            // Skip the header line
            return;
          } else if (typing) {
            // Only add to displayed prompt if we're in typing mode (after ===)
            setDisplayedPrompt(prev => prev + chunk);
          }
        }
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to generate prompt");
      }

      setOutput(response);
      setTyping(false); // Stop typing animation when complete
    } catch (error) {
      console.error("Generation error:", error);

      let errorMessage = "An unexpected error occurred while generating your prompt.";

      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        
        // Handle specific error codes from the API
        if (errorText.includes('invalid_platform')) {
          errorMessage = "Please select a valid platform from the options above.";
        } else if (errorText.includes('missing_fields')) {
          errorMessage = "Please provide both content idea and platform selection.";
        } else if (errorText.includes('timeout')) {
          errorMessage = "The request timed out. Please try again with a shorter content description.";
        } else if (errorText.includes('network_error')) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
        } else if (errorText.includes('config_error')) {
          errorMessage = "Server configuration error. Please try again later.";
        } else if (errorText.includes('internal_error')) {
          errorMessage = "Server error occurred. Please try again later.";
        } else if (errorText.includes('api base url is not configured')) {
          errorMessage = "Application configuration error. Please contact support.";
        } else {
          // Use the error message from the API if available
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleGenerate();
  };

  const clearError = () => {
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">PromptPad</span>
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-primary rounded-xl">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">PromptPad</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate enhanced, platform-optimized prompts for your content
            creation needs
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="flex items-center justify-between border-destructive bg-destructive/10">
            <div className="flex gap-2 items-center">
              <AlertCircle className="h-5 w-5 flex text-destructive" />
              <span className="text-destructive">{error}</span>
            </div>

            <AlertDescription className="text-destructive">
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-1 items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="border-destructive text-destructive hover:cusor-pointer"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Retry
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearError}
                    className="text-destructive hover:bg-destructive/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Horizontal Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Side - Input & Controls */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Choose Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.value}
                      onClick={() => setSelectedPlatform(platform.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedPlatform === platform.value
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-border/50"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-2 rounded-lg bg-muted">
                          <platform.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm text-foreground">
                            {platform.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {platform.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Input Section */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">
                    What would you like to create?
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Describe your content idea, topic, or what you want to create..."
                    value={userInput}
                    onChange={handleInputChange}
                    rows={4}
                    className={`resize-none text-base ${
                      error ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={loading}
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{userInput.length} characters</span>
                    <span>
                      {inputStatus}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading || !userInput.trim() || !selectedPlatform}
                  className="w-full py-3 text-base font-medium"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Enhanced Prompt</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Output */}
          <div className="space-y-6">
            {output ? (
              <Output 
                data={output} 
                typing={typing}
                displayedPrompt={displayedPrompt}
              />
            ) : (
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg text-muted-foreground">
                      Enhanced Prompt
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {error
                      ? "Fix the error above and try again"
                      : "Your generated prompt will appear here"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    className={`p-6 rounded-lg border h-96 flex items-center justify-center ${
                      error
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div
                        className={`p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center ${
                          error ? "bg-destructive/10" : "bg-muted"
                        }`}
                      >
                        {error ? (
                          <AlertCircle className="h-8 w-8 text-destructive" />
                        ) : loading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-2 border-current border-t-transparent"></div>
                        ) : (
                          <Sparkles className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          error ? "text-destructive" : "text-muted-foreground"
                        }`}
                      >
                        {error
                          ? "Fix the error above and try again"
                          : loading
                          ? currentProgress || "Generating your enhanced prompt..."
                          : "Select a platform and enter your content idea to generate an enhanced prompt"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
