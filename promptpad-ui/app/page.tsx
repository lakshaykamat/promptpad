import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowRight,
  Zap,
  CheckCircle,
  Users,
  Globe
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: "Platform-Specific Optimization",
      description: "Generate prompts tailored for Twitter, LinkedIn, YouTube, Blog, Email, ChatGPT, and Cursor"
    },
    {
      icon: Zap,
      title: "AI-Powered Enhancement",
      description: "5-step intelligent pipeline that analyzes, interprets, generates, enhances, and refines your prompts"
    },
    {
      icon: CheckCircle,
      title: "Professional Quality",
      description: "Get high-quality, optimized prompts that follow platform best practices and engagement strategies"
    },
    {
      icon: Users,
      title: "Content Creators",
      description: "Perfect for social media managers, marketers, writers, and anyone creating digital content"
    }
  ];

  const platforms = [
    { name: "Twitter", icon: Twitter, description: "Social media posts" },
    { name: "LinkedIn", icon: Linkedin, description: "Professional content" },
    { name: "YouTube", icon: Video, description: "Video scripts" },
    { name: "Blog", icon: FileText, description: "Articles & posts" },
    { name: "Email", icon: Mail, description: "Professional emails" },
    { name: "ChatGPT", icon: MessageSquare, description: "AI conversations" },
    { name: "Cursor", icon: Code, description: "Coding assistance" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="p-3 bg-primary rounded-xl">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">
              PromptPad
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-3xl mx-auto">
            Generate Enhanced, Platform-Optimized Prompts for Your Content
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional, engaging content with AI-powered prompt enhancement. 
            Optimized for 7+ platforms with intelligent customization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Globe className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose PromptPad?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent system creates prompts that are optimized for engagement, 
              platform-specific requirements, and professional quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Supported Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate optimized prompts for all your favorite content platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-muted rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <platform.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Create Amazing Content?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of content creators who are already using PromptPad to generate 
            professional, engaging prompts for their content.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/dashboard">
              <Sparkles className="h-5 w-5 mr-2" />
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
