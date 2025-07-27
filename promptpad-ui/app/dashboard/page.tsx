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
  Badge,
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

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Blog");
  const [output, setOutput] = useState<EnhancePromptApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    setLoading(true);
    setError(null);

    try {
      const response = await getEnhancedPrompt(
        userInput.trim(),
        selectedPlatform
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to generate prompt");
      }

      setOutput(response);
    } catch (error) {
      console.error("Generation error:", error);

      let errorMessage =
        "An unexpected error occurred while generating your prompt.";

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage =
            "Unable to connect to the server. Please check your internet connection and try again.";
        } else if (error.message.includes("timeout")) {
          errorMessage =
            "The request timed out. Please try again with a shorter content description.";
        } else if (error.message.includes("rate limit")) {
          errorMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else {
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
                      {userInput.length > 0 &&
                        (userInput.length < 10
                          ? "Please provide more details"
                          : userInput.length > 500
                          ? "Consider shortening your description"
                          : "Good length")}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading || !userInput.trim()}
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
              <Output data={output} />
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
                          ? "Unable to generate prompt due to an error"
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
