import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../api/userService";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "../utils/Auth";


export const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const currentUser = getCurrentUser(); // { id, email, roleId }
  
   // Obtener todos los usuarios
   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users); // Asegúrate de que la API devuelve `{ users: [...] }`
        
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios excluyendo al usuario actual
  const filteredUsers = users.filter(user => user.id !== currentUser?.id);

   // Eliminar usuario con SweetAlert2
  const onDeleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id); // Llama a la API para eliminar el usuario
          setUsers(users.filter((user) => user.id !== id)); // Actualiza la lista local

          Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
      }
    });
  };


  return (
    <div className="w-full mt-5 m-auto bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Administración de Usuarios
      </h2>
      {users.length > 0 ? (
      <table className="w-4/5 border-collapse mx-auto rounded-lg overflow-hidden ">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4  text-left">Email</th>
            <th className="p-4  text-left">Tipo de usuario</th>
            <th className="p-4 text-center">Acción</th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-500">
          
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition">
              <td className="border-b border-gray-300 p-4 ">{user.name} </td>
              <td className="border-b border-gray-300 p-4 ">{user.email}</td>
              <td className="border-b border-gray-300 p-4 ">{user.role.name} </td>

              <td className="border-b border-gray-300 p-4 text-center">
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className=" bg-red-500 text-white  hover:bg-red-700  p-2 rounded-full  transition"
                >
                   <TrashIcon className="w-6 h-6 "/>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
          </table>
        ) : (
            <p className="text-center py-4 text-gray-500">
              No hay usuarios registrados.
            </p>
        )}
   
    </div>
  );
};

