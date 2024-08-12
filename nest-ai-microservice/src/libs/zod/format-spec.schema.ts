import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Task description is required'),
});

export const cardSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Task description is required'),
  tasks: z.array(taskSchema), // Assuming tasks can be anything for now
});

export const boardSchema = z.object({
  name: z.string().min(1, 'Board name is required'),
  cards: z.array(cardSchema),
});

export const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  boards: z.array(boardSchema),
});
