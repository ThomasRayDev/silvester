import api from './client';
import type { User } from './user';

export type ProjectType = {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  id: number;
  author: User;
  created_at: string;
  updated_at: string;
};

export const getProjects = async () => {
  const response = await api.get('/projects/');
  return response.data;
};
