import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PromptService } from './prompt.service';
import { GeneratePromptDto } from './dto/generate-prompt.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post('/generate')
  async generatePrompt(@Body() body: GeneratePromptDto, @Res() res: Response) {
    const { input, platform } = body;
    await this.promptService.streamEnhancedPrompt(input, platform, res);
  }
}
