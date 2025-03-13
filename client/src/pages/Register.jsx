import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersRole } from "../api/userService";
import { register } from "../api/authService";

export const Register = () => {
  const navigate= useNavigate();
  const [userCategory, setUserCategory] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    typeUser:"",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await getUsersRole();  // Obtener roles de usuario
        setUserCategory(roles);  // Actualizar el estado con los roles
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
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

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roleId: Number(formData.typeUser),
      };
      console.log(userData)
      // Llamada al servicio de registro
      const response = await register(userData);
      
      console.log('Usuario registrado exitosamente:', response);
      // Redirigir al login o mostrar un mensaje
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      if (error.response) {
        // Si la respuesta del backend tiene un error
        setError(error.response.data.error || "Error desconocido al registrar");
      } else {
        // En caso de que no haya respuesta, mostrar un error genérico
        setError("Error al registrar el usuario. Por favor, intenta nuevamente.");
      }
    }
      
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
              {userCategory.length > 0 ? (
                userCategory.map((role)=>(
                  <option value={role.id} key={role.id}>{role.name}</option>
                )) 
              ): (
                <option value="">Cargando roles...</option>
              )}
              
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
          <Link to="/" className="text-purple-500 hover:underline">
            Iniciar sessiòn
          </Link>
        </p>
      </div>
    </div>
  );
};

