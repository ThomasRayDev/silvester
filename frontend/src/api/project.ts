import api from './client';
import type { User } from './user';

export type Address = {
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
};

export type ProjectType = {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  budget: number;
  team: User[];
  address: Address;
  author?: User;
  id?: number;
  progress: number;
  created_at?: string;
  updated_at?: string;
};

export type CreateProjectType = {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  budget: number;
  team: number[];
  address: Address;
};

export const getProjects = async () => {
  const response = await api.get('/projects/');
  return response.data;
};

export const createProject = async (projectData: CreateProjectType) => {
  const response = await api.post('/projects/', projectData);
  return response.data;
};
