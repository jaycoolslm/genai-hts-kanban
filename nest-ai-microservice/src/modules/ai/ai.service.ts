import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/libs/ai/open.ai/openai.service';
import { ChatCompletionDto } from './dto/chat.completion.dto';
import { ChatCompletionMessageParam } from 'openai/resources';

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
}
