import * as z from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Введите название проекта'),
  description: z.string().min(1, 'Введите описание проекта'),
  budget: z.string().min(1, 'Введите бюджет'),
  city: z.string().optional(),
  street: z.string().optional(),
  house: z.string().optional(),
  apartment: z.string().optional(),
  status: z.string().min(1, 'Укажите статус'),
  start_date: z.date(),
  end_date: z.date(),
  team: z.array(z.number()).optional(),
});

export type CreateProjectData = z.infer<typeof createProjectSchema>;
