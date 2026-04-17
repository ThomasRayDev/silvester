import type { CreateProjectData } from '@/schemas/createProjectSchema';

export const mapProjectToForm = (project: any): Partial<CreateProjectData> => ({
  name: project.name,
  description: project.description,
  budget: String(project.budget),
  status: project.status,
  start_date: new Date(project.start_date),
  end_date: new Date(project.end_date),
  city: project.address?.city ?? '',
  street: project.address?.street ?? '',
  house: project.address?.house ?? '',
  apartment: project.address?.apartment ?? '',
});
