export type PromptApiResponse = {
  basePrompt: string;
  contextAnalysis: {
    Complexity: string;
    Domain: string;
    'Key Concepts': string;
    'Output Format': string;
    Requirements: string;
    platform: string;
    platform_context: {
      character_limit: number;
      format: string;
      purpose: string;
      style_guide: string;
      tone: string;
    };
  };
  enhanced_prompt: string;
  input: string;
  intent: string;
  platform: string;
  platformContext: {
    character_limit: number;
    format: string;
    purpose: string;
    style_guide: string;
    tone: string;
  };
  prompt: string;
  success: boolean;
};
