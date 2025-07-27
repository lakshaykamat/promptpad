import axiosInstance from "./axios";

export interface EnhancePromptApiResponse {
  input: string;
  platform: string;
  prompt: string;
  success: boolean;
  error?: string;
  code?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code: string;
}

export async function getEnhancedPrompt(
  userPrompt: string,
  platform: string,
  onChunk?: (chunk: string) => void
): Promise<EnhancePromptApiResponse> {
  const baseURL = process.env.NEXT_PUBLIC_GATEWAY_URL;
  
  if (!baseURL) {
    throw new Error('API base URL is not configured');
  }

  const response = await fetch(`${baseURL}/prompt/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: userPrompt,
      platform: platform
    }),
  });

  if (!response.ok) {
    // Try to parse structured error response
    try {
      const errorData = await response.json() as ApiError;
      throw new Error(`${errorData.error} (${errorData.code})`);
    } catch {
      // Fallback to generic error if parsing fails
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulatedPrompt = "";
  let finalResponse: EnhancePromptApiResponse | null = null;
  let isPromptContent = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      
      // Call the callback with each chunk for real-time display
      if (onChunk) {
        onChunk(chunk);
      }
      
      // Filter out progress messages and headers from final accumulated prompt
      if (chunk.includes("===")) {
        isPromptContent = true;
        continue; // Skip the header line
      } else if (chunk.includes("Enhanced Prompt for")) {
        continue; // Skip the header line
      } else if (chunk.includes("Analyzing context") || 
                 chunk.includes("Extracting intent") || 
                 chunk.includes("Generating base prompt") || 
                 chunk.includes("Enhancing prompt") || 
                 chunk.includes("Refining prompt")) {
        continue; // Skip progress messages
      } else if (isPromptContent) {
        // Only accumulate actual prompt content
        accumulatedPrompt += chunk;
      }
    }

    // Create the final response object with only the actual prompt
    finalResponse = {
      success: true,
      input: userPrompt,
      platform: platform,
      prompt: accumulatedPrompt,
    };

    return finalResponse;
  } catch (error) {
    throw new Error(`Streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
