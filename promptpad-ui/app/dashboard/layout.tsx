import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Generate Enhanced Prompts",
  description: "Create platform-optimized prompts for Twitter, LinkedIn, YouTube, Blog, Email, ChatGPT, and Cursor. AI-powered prompt enhancement dashboard.",
  keywords: [
    "prompt generator",
    "AI prompt dashboard",
    "content creation tools",
    "social media prompts",
    "platform optimization"
  ],
  openGraph: {
    title: "PromptPad Dashboard - Generate Enhanced Prompts",
    description: "Create platform-optimized prompts with our AI-powered enhancement dashboard.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 