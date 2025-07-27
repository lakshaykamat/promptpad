import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { PromptApiResponse } from '../types';

@Injectable()
export class PromptService {
  constructor(private configService: ConfigService) {}

  async getEnhancedPrompt(input: string, platform: string) {
    if (!input || !platform) {
      throw new BadGatewayException('Both input and platform are required');
    }

    const url = this.configService.get<string>('PROMPT_ENGINE_URL');

    if (!url) {
      throw new BadGatewayException(
        'PROMPT_ENGINE_URL environment variable is not set',
      );
    }

    try {
      const res = await axios.post<PromptApiResponse>(`${url}/generate`, {
        input,
        platform,
      });
      return res.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error?: string }>;
      const message =
        axiosError.response?.data?.error || 'Prompt Generation Failed!';

      throw new BadGatewayException(`Prompt Engine ERROR: ${message}`);
    }
  }
}
