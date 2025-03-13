import { api } from './api';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Obtener roles de usuario 
export const getUsersRole = async () => {
  const response = await api.get('/users/role');
  return response.data;
};
