import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PromptPad - AI-Powered Prompt Enhancement for Content Creators",
    template: "%s | PromptPad"
  },
  description: "Generate enhanced, platform-optimized prompts for Twitter, LinkedIn, YouTube, Blog, Email, ChatGPT, and Cursor. AI-powered prompt enhancement for content creators.",
  keywords: [
    "prompt engineering",
    "AI prompts",
    "content creation",
    "social media",
    "Twitter prompts",
    "LinkedIn content",
    "YouTube scripts",
    "blog writing",
    "email marketing",
    "ChatGPT prompts",
    "coding assistance",
    "content optimization",
    "platform-specific content",
    "AI content generation"
  ],
  authors: [{ name: "PromptPad Team" }],
  creator: "PromptPad",
  publisher: "PromptPad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://promptpad.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptpad.app",
    title: "PromptPad - AI-Powered Prompt Enhancement for Content Creators",
    description: "Generate enhanced, platform-optimized prompts for Twitter, LinkedIn, YouTube, Blog, Email, ChatGPT, and Cursor. AI-powered prompt enhancement for content creators.",
    siteName: "PromptPad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptPad - AI-Powered Prompt Enhancement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptPad - AI-Powered Prompt Enhancement for Content Creators",
    description: "Generate enhanced, platform-optimized prompts for Twitter, LinkedIn, YouTube, Blog, Email, ChatGPT, and Cursor.",
    images: ["/og-image.png"],
    creator: "@promptpad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
