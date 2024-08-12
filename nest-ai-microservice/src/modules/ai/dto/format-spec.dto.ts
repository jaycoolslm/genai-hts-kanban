
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class FormatSpecDto {
  @IsString()
  @ApiProperty({})
  content: string;
}
