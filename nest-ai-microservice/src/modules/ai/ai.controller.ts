import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatCompletionMessageParam, Model } from 'openai/resources';
import { ApiOperation } from '@nestjs/swagger';
import { ChatCompletionDto } from './dto/chat.completion.dto';
import { FormatSpecDto } from './dto/format-spec.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly service: AiService) { }

  @Get('models')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'Returns a list of available OpenAI models',
    summary: 'Get available models',
  })
  async listModels(): Promise<Model[]> {
    return this.service.listModels();
  }

  @Get('questions')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'Returns a list of available OpenAI models',
    summary: 'Get available models',
  })
  listSpecQuestions(): ChatCompletionMessageParam {
    return this.service.listSpecQuestions();
  }

  @Post('completion/chat')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'Performs a chat completion',
    summary: 'Performs a chat completion',
  })
  async complete(@Body() dto: ChatCompletionDto) {
    return this.service.completion(dto);
  }

  @Post('format-spec')
  @ApiOperation({
    description:
      'Formats the generated project specification and returns it as a structured JSON object that can be used to generate a project',
    summary: 'Format project specification',
  })
  async formatSpec(@Body() dto: FormatSpecDto) {
    return this.service.formatSpec(dto);
  }
}
