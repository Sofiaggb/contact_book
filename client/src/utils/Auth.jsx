import { jwtDecode } from 'jwt-decode';  

// Obtener los datos del token almacenado
export const getCurrentUser = () => {
  const tokenData = localStorage.getItem('token');
  if (!tokenData) return null;

  try {
    const parsedToken = JSON.parse(tokenData);
    const decoded = jwtDecode(parsedToken.value); // Decodifica el token JWT
    return {
      id: decoded.id,
      email: decoded.email,
      roleId: decoded.roleId,
    };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};