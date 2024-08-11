import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChatCompletionDto {
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @ApiProperty({
    description: "Explain what you're building?",
    example:
      'An application which adds event tracking on the Hedera Consesnus service to an existing opensource kanban board.',
  })
  prompt: string;
}
