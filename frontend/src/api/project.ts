import api from './client';
import type { User } from './user';

export type Address = {
  city: string;
  street: string;
  house: string;
  apartment?: string;
};

export type ProjectType = {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  id: number;
  budget: number;
  author: User;
  team: User[];
  address: Address;
  progress: number;
  created_at: string;
  updated_at: string;
};

export const getProjects = async () => {
  const response = await api.get('/projects/');
  return response.data;
};
