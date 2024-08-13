import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { Model } from 'openai/resources';
import { ApiOperation } from '@nestjs/swagger';
import { ChatCompletionDto } from './dto/chat.completion.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly service: AiService) {}

  @Get('models')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'Returns a list of available OpenAI models',
    summary: 'Get available models',
  })
  async listModels(): Promise<Model[]> {
    return this.service.listModels();
  }

  @Post('completion/chat')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'Performs a chat completion',
    summary: 'Performs a chat completion',
  })
  async complete(@Body() dto: ChatCompletionDto[]) {
    return this.service.completion(dto);
  }
}
