import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/libs/ai/open.ai/openai.service';
import { ChatCompletionDto } from './dto/chat.completion.dto';
import { ChatCompletionMessageParam } from 'openai/resources';
import { FormatSpecDto } from './dto/format-spec.dto';
import { projectSchema } from 'src/libs/zod/format-spec.schema';
import { SPEC_QUESTIONS } from 'src/libs/constants/spec-questions';
import generateSpecPrompt from 'src/libs/ai/prompts/generate-spec.prompt';
import formatSpecPrompt from 'src/libs/ai/prompts/format-spec.prompt';

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

  async completion(dto: ChatCompletionDto[]) {
    const messages: ChatCompletionMessageParam[] = [
      ...generateSpecPrompt,
      ...dto,
    ];
    return this.openAiService.chatCompletion(messages);
  }

  async formatSpec(dto: FormatSpecDto) {
    const messages: ChatCompletionMessageParam[] = [
      ...formatSpecPrompt,
      {
        role: 'user',
        content: dto.content,
      },
    ];
    return this.openAiService.structuredDataExtraction(projectSchema, messages);
  }
}
