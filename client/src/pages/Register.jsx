import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {

  const userCategory = [
    "administrador",
    "usuario"
  ]

  const [formData, setFormData] = useState({
    typeUser:"",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.typeUser || !formData.name || !formData.email || !formData.password) {
      setError("Todos los campos son requeridos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    console.log("Registering user:", formData);

    // Here, you can send the formData to your API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Registro
        </h2>

        {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600" >Tipo de usuario</label> 
            <select name="typeUser" id="typeUser" 
            className=" w-full border p-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
            onChange={handleChange} value={formData.typeUser}>
              <option value="">selecciona</option>
              {userCategory.map((type)=>(
                <option value={type} key={type}>{type}</option>
              ))
              }
            </select>

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nombre</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirmar tú contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-4  bg-purple-600 text-white py-2 rounded-lg border-purple-600 border
            hover:text-purple-600  hover:bg-white transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-purple-500 hover:underline">
            Iniciar sessiòn
          </Link>
        </p>
      </div>
    </div>
  );
};

