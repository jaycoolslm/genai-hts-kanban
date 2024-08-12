import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/libs/ai/open.ai/openai.service';
import { ChatCompletionDto } from './dto/chat.completion.dto';
import { ChatCompletionMessageParam } from 'openai/resources';
import { FormatSpecDto } from './dto/format-spec.dto';
import { projectSchema } from 'src/libs/zod/format-spec.schema';

@Injectable()
export class AiService {
  constructor(private readonly openAiService: OpenAiService) {}

  async listModels() {
    return this.openAiService.listModels();
  }

  async completion(dto: ChatCompletionDto) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are an expert Product Owner and are creating a feature spec for an application based on the user prompt.',
      },
      dto,
    ];
    return this.openAiService.chatCompletion(messages);
  }

  async formatSpec(dto: FormatSpecDto) {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are an expert at structured data extraction. You will be given a list of user stories and deliverables for a project and you need to extract the structured data from them.',
      },
      {
        role: 'user',
        content: dto.content,
      },
    ];
    return this.openAiService.structuredDataExtraction(projectSchema, messages);
  }
}
