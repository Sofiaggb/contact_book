import axios from 'axios';

export const API_URL = 'http://localhost:3000'; // URL de tu backend

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // Para manejar cookies o tokens
});

// Interceptor para agregar el token automáticamente a las solicitudes
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    const { value, expiration } = token;

    // Verificar si el token ha expirado
    const now = new Date().getTime();
    if (now < expiration) {
      config.headers.Authorization = `Bearer ${value}`; // Solo si el token no ha expirado
    } else {
      // El token ha expirado, puedes manejar la reautenticación aquí
      console.log('Token expirado');
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
