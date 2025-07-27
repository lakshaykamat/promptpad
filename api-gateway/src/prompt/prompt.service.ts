import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { Readable } from 'stream';
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
      throw new BadGatewayException('PROMPT_ENGINE_URL is not set');
    }

    try {
      const endpoint = new URL('/generate-full', url).toString();
      const res = await axios.post<PromptApiResponse>(
        endpoint,
        { input, platform },
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
        `Unexpected error during prompt generation: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  }

  async streamEnhancedPrompt(
    input: string,
    platform: string,
    res: Response,
  ): Promise<void> {
    if (!input || !platform) {
      throw new BadRequestException({
        success: false,
        error: 'Both input and platform are required',
        code: 'MISSING_FIELDS',
      });
    }

    const url = this.configService.get<string>('PROMPT_ENGINE_URL');
    if (!url) {
      throw new BadGatewayException({
        success: false,
        error: 'PROMPT_ENGINE_URL is not set',
        code: 'CONFIG_ERROR',
      });
    }

    try {
      const endpoint = new URL('/generate', url).toString();
      const flaskRes = await axios.post<Readable>(
        endpoint,
        { input, platform },
        {
          responseType: 'stream',
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000,
        },
      );

      res.setHeader('Content-Type', 'text/plain');
      flaskRes.data.pipe(res); // stream the response
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const responseData = err.response?.data as {
          error?: string;
          code?: string;
          success?: boolean;
        };

        // Handle different types of errors
        if (status === 400) {
          throw new BadRequestException({
            success: false,
            error: responseData?.error || 'Invalid request',
            code: responseData?.code || 'BAD_REQUEST',
          });
        } else if (status === 500) {
          throw new BadGatewayException({
            success: false,
            error: responseData?.error || 'Internal server error',
            code: responseData?.code || 'INTERNAL_ERROR',
          });
        } else if (err.code === 'ECONNABORTED') {
          throw new BadGatewayException({
            success: false,
            error: 'Request timed out. Please try again.',
            code: 'TIMEOUT',
          });
        } else {
          throw new BadGatewayException({
            success: false,
            error: `Prompt Engine ERROR: (${status || 'Network'}): ${responseData?.error || err.message}`,
            code: 'NETWORK_ERROR',
          });
        }
      }

      throw new BadGatewayException({
        success: false,
        error: `Unexpected error during prompt generation: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
        code: 'UNKNOWN_ERROR',
      });
    }
  }
}
