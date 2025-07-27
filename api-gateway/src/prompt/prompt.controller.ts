import { Body, Controller, Post } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { GeneratePromptDto } from './dto/generate-prompt.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post('/generate')
  generatePrompt(@Body() body: GeneratePromptDto) {
    const { input, platform } = body;
    return this.promptService.getEnhancedPrompt(input, platform);
  }
}
