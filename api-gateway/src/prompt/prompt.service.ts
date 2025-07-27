import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PromptApiResponse } from '../types';

@Injectable()
export class PromptService {
  constructor(private configService: ConfigService) {}

  async getEnhancedPrompt(
    input: string,
    platform: string,
  ): Promise<PromptApiResponse> {
    if (!input || !platform) {
      throw new BadRequestException('Both input and platform are required');
    }

    const url = this.configService.get<string>('PROMPT_ENGINE_URL');

    if (!url) {
      throw new BadGatewayException(
        'PROMPT_ENGINE_URL environment variable is not set',
      );
    }

    try {
      const endpoint = new URL('/generate', url).toString();
      const res = await axios.post<PromptApiResponse>(
        endpoint,
        {
          input,
          platform,
        },
        {
          timeout: 30000,
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const errMsg =
          (err.response?.data as { error?: string })?.error || err.message;

        throw new BadGatewayException(
          `Prompt Engine ERROR: (${status || 'Network'}): ${errMsg}`,
        );
      }

      throw new BadGatewayException(
        `Unexpected error during prompt generation: ${err instanceof Error ? err.message : 'Unkown Error'}`,
      );
    }
  }
}
