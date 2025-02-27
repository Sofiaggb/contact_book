import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; //  verificar si el usuario está autenticado
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
