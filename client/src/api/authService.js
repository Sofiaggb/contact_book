import { api } from './api';

export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const logout = async () => {
  await api.post('/users/logout');
  localStorage.removeItem('token'); // Eliminar token del almacenamiento local
};

export const register = async (userData) => {
    try {
      const response = await api.post('/users/register', userData, { 
        headers: { 'Content-Type': 'application/json' }
      }); // Usamos la ruta que has definido para registrar el usuario
      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error; // Re-lanzar el error para manejarlo en el frontend si es necesario
    }
  };