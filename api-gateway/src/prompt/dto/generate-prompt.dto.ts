import { IsString, IsNotEmpty } from 'class-validator';

export class GeneratePromptDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsNotEmpty()
  platform: string;
}
