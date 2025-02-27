import { useState } from "react";
import { usersData } from "../data/UsersData";

export const UserManagement = () => {

  const [users, setUsers] = useState(usersData);
  const onDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="w-full mx-auto bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Administración de Usuarios
      </h2>
      {users.length > 0 ? (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          

          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-all">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                >
                    <box-icon name="trash"  color="white"></box-icon>
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
