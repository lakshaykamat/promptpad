import axiosInstance from "./axios";


interface ContextAnalysis {
  Complexity: string;
  Domain: string;
  "Key Concepts": string;
  "Output Format": string;
  Requirements: string;
}

export interface EnhancePromptApiResponse {
  base_prompt: string;
  context_analysis: ContextAnalysis;
  enhanced_prompt: string;
  final_prompt: string;
  input: string;
  intent: string;
  success: boolean;
}

export async function getEnhancedPrompt(userPrompt: string):Promise<EnhancePromptApiResponse> {
  const response = await axiosInstance.post("/generate", { input: userPrompt });
  return response.data;
}