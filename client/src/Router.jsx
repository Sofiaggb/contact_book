import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Error } from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute"; // Para rutas protegidas

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Ruta protegida (requiere autenticación) */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      <Route path="*" element={<Error />} />

    </Routes>
  );
};

export default AppRoutes;
