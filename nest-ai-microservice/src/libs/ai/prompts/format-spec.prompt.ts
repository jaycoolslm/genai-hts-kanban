import { ChatCompletionMessageParam } from 'openai/resources';

const formatSpecPrompt: ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      'You are an expert at structured data extraction. You will be given a list of boards, cards, and tasks for a project and you need to extract the structured data from them. Any datawhich you are unable to categorise into a specific attribute should be added in the description attribute. Descriptions can be written in markup.',
  },
];

export default formatSpecPrompt;
