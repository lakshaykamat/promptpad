import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GeneratePromptDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsOptional()
  platform?: string;
}
