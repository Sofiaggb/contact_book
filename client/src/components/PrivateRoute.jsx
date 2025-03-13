import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token =  JSON.parse(localStorage.getItem("token"));
  console.log("paso 1")
  console.log(token)
  if (!token || new Date().getTime() > token.expiration)  {
  console.log("paso 2")
  localStorage.removeItem("token");
    // Si no hay token, redirigimos a login
    return <Navigate to="/" />;

  }

  // Si hay token, renderizamos la ruta protegida
  return children;
};

export default PrivateRoute;
