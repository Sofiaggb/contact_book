import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Todos los campos son requeridos.");
      return;
    }

    try {
      // Llamada a la función `login` para autenticar
      const response = await login(email, password);  

      // Si el login es exitoso, se redirige a otra página
      console.log("Usuario autenticado:", response);

       // Guardar token con tiempo de expiración
       const expiresInMinutes =60; // Define el tiempo de expiración (en minutos)
       const now = new Date().getTime(); // Tiempo actual en ms
       const expirationTime = now + expiresInMinutes * 60 * 1000;
 
       const tokenData = {
         value: response.token,
         expiration: expirationTime
       };
 
       localStorage.setItem("token", JSON.stringify(tokenData));
      // guardar token  en el localStorage o en cookies
      // localStorage.setItem("token", response.token); 

      // Redirigir a la página de inicio después del login exitoso
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        // Si la respuesta del backend tiene un error
        setError(error.response.data.error || "Error desconocido al iniciar sesión");
      } else {
        // En caso de que no haya respuesta, mostrar un error genérico
        setError("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className=" w-full p-4  bg-purple-600 text-white py-2 rounded-lg border-purple-600 border
            hover:text-purple-600  hover:bg-white transition"
          >
            Iniciar sessión
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          No tienes una cuenta{" "}
          <Link to="/register" className="text-purple-500 hover:underline">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

