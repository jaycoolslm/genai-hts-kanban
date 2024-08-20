import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const cardSchema = z.object({
  name: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema), // Assuming tasks can be anything for now
});

export const boardSchema = z.object({
  name: z.string(),
  cards: z.array(cardSchema),
});

export const projectSchema = z.object({
  projectName: z.string(),
  boards: z.array(boardSchema),
});
