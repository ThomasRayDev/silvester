import api from './client';

export const getRolesEnum = async () => {
  const response = await api.get('/enums/roles');
  return response.data;
};

export const getProjectStatutesEnum = async () => {
  const response = await api.get('/enums/projects');
  return response.data;
};
