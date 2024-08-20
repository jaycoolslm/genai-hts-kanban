import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';
import { ChatCompletionMessageParam } from 'openai/resources';
import { zodResponseFormat } from 'openai/helpers/zod';

@Injectable()
export class OpenAiService {
  private readonly DEFAULT_MODEL = 'gpt-4o-mini';
  private readonly MAX_TOKENS = 5000;

  private readonly client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });
  }

  async listModels() {
    return this.client.models
      .list()
      .then((response) => response.data)
      .then((model) => model);
  }

  async chatCompletion(
    messages: ChatCompletionMessageParam[],
    modelId: string = this.DEFAULT_MODEL,
    maxTokens: number = this.MAX_TOKENS,
  ) {
    return await this.client.chat.completions.create({
      messages: messages,
      model: modelId,
      max_tokens: maxTokens,
    });
  }

  async structuredDataExtraction(
    ZodObject: z.ZodObject<any>,
    messages: ChatCompletionMessageParam[],
    modelId: string = this.DEFAULT_MODEL,
  ) {
    return await this.client.beta.chat.completions.parse({
      model: modelId,
      messages,
      response_format: zodResponseFormat(
        ZodObject,
        'structured_data_extraction',
      ),
    });
  }
}
