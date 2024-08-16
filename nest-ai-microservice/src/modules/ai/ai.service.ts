import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/libs/ai/open.ai/openai.service';
import { ChatCompletionDto } from './dto/chat.completion.dto';
import { ChatCompletionMessageParam } from 'openai/resources';
import { FormatSpecDto } from './dto/format-spec.dto';
import { projectSchema } from 'src/libs/zod/format-spec.schema';
import { SPEC_QUESTIONS } from 'src/libs/constants/spec-questions';
import generateSpecPrompt from 'src/libs/ai/prompts/generate-spec.prompt';

@Injectable()
export class AiService {
  constructor(private readonly openAiService: OpenAiService) { }

  async listModels() {
    return this.openAiService.listModels();
  }

  listSpecQuestions(): ChatCompletionMessageParam {
    return {
      role: 'assistant',
      content: SPEC_QUESTIONS,
    };
  }

  async completion(dto: ChatCompletionDto) {
    const messages: ChatCompletionMessageParam[] = [...generateSpecPrompt, dto];
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
