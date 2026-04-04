import api from './client';

export type User = {
  username: string;
  email: string;
  id: number;
  firstname: string;
  secondname: string;
  position: string;
  role: string;
  avatar_path: string;
  avatar_content_type: string;
  password_updated: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const createNewUser = async (userData: any) => {
  const { data } = await api.post('/users/', userData);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get('/users/');
  return data;
};

export const updateUser = async (userData: any) => {
  const { data } = await api.put(`/users/${userData.id}`, {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    firstname: userData.firstname,
    secondname: userData.secondname,
    position: userData.position,
  });
  return data;
};

export const changePassword = async (userData: any) => {
  const { data } = await api.post('/users/changePassword', {
    old_password: userData.currentPassword,
    new_password: userData.newPassword,
  });
  return data;
};
