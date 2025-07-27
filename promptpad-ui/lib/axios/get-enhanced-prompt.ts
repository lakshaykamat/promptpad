import axiosInstance from "./axios";


export interface EnhancePromptApiResponse {
  input: string;
  platform: string;
  prompt: string;
  success: boolean;
  error?: string;
}

export async function getEnhancedPrompt(userPrompt: string, platform: string = "Blog"): Promise<EnhancePromptApiResponse> {
  const response = await axiosInstance.post("/generate", { 
    input: userPrompt,
    platform: platform
  });
  return response.data;
}