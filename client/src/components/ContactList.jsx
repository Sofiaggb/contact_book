import { useEffect, useRef, useState } from "react";
import { PlusIcon, 
         ArrowLeftStartOnRectangleIcon,
         MagnifyingGlassIcon, 
         Cog6ToothIcon ,
         UserIcon
        } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../api/contactService";
import { API_URL } from "../api/api";
import { logout } from "../api/authService";
import Swal from "sweetalert2";

const ContactsList = ({ setShowForm, setShowSearch, onSelectContact, manageUsers, refresh }) => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("Todos"); // Estado para filtrar
  const [selectedLetter, setSelectedLetter] = useState(null); 
  const letterRefs = useRef({});

  const navigate = useNavigate()

  // Llamar a la API para obtener los contactos
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();
        // console.log(data)
        setContacts(data.contacts); // Almacena los contactos en el estado
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      }
    };

    fetchContacts();
  }, [refresh]); 

  // Filtrar contactos según la categoría seleccionada
  const filteredContacts = contacts.filter((contact) => {
    if (filter !== "Todos" && contact.RoleId !== filter) return false; // No cumple con el filtro de categoría
    return true;

  });

  // Ordenar contactos alfabéticamente
  const sortedContacts = [...filteredContacts].sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

   // Asignar referencia a cada contacto en el DOM
   const setContactRef = (element, id) => {
    if (element) {
      letterRefs.current[id] = element;
    }
  };

  useEffect(() => {
    if (selectedLetter) {
      const firstContact = sortedContacts.find((contact) =>
        contact.first_name.toUpperCase().startsWith(selectedLetter)
      );

      if (firstContact && letterRefs.current[firstContact.id]) {
        letterRefs.current[firstContact.id].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [selectedLetter, sortedContacts]);

  // Extraer las letras iniciales para el abecedario
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLogout = async() => {

    Swal.fire({
          title: "Cerrar sessión",
          text: "¿deseas cerrar tu sessión?.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await logout(); // Llama a la función de logout de la API
              localStorage.removeItem('token'); // Elimina el token después de la llamada exitosa
              navigate('/'); // Redirige al login
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              // Maneja el error 
              localStorage.removeItem('token'); // Elimina el token incluso si hay un error
              navigate('/'); // Redirige al login
            }
          }
        });
     
  };

  return (

    <div className="w-[28%] bg-gray-100 ">
      <div className="flex justify-between mx-4 mt-4 ">
        <div>
          <Cog6ToothIcon className="w-6 h-6 text-gray-500 cursor-pointer" 
          onClick={() => manageUsers(true)} />

        </div>

        <div className="flex space-x-4">

          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 cursor-pointer"
           onClick={() => setShowSearch(true)} />

          <PlusIcon className="w-6 h-6 text-gray-500 cursor-pointer" 
          onClick={() => setShowForm(true)} />

          <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-gray-500 cursor-pointer"
          onClick={()=> handleLogout()} />

        </div>
      </div>

      {/* Botones de filtro */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${filter === "Todos" ? "bg-purple-500 text-white" : "bg-gray-300"
            }`}
          onClick={() => setFilter("Todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          onClick={() => setFilter(1)}
        >
          Clientes
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 2 ? "bg-indigo-500 text-white" : "bg-gray-300"
            }`}
          onClick={() => setFilter(2)}
        >
          Empleados
        </button>
      </div>
      <div className=" flex h-[84vh]  overflow-y-auto ">

        <div className=" px-4 sticky -top-3 ">
          <ul className="space-y-1 text-center">
            {alphabet.map((letter) => (
              <li key={letter} 
              className={`text-gray-700 font-medium text-xs cursor-pointer
                 ${selectedLetter === letter ? "font-bold text-purple-600" : ""}`}
                 onClick={() => setSelectedLetter(letter)}
              >{letter}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex  bg-gray-100 ">
          <div className="p-6 rounded-lg  w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Lista de Contáctos</h2>

            <ul className="divide-y divide-gray-300">
              {sortedContacts.map((contact) => (
                <li key={contact.id} 
                  ref={(el) => setContactRef(el, contact.id)}
                  className="p-3 rounded-lg flex items-center cursor-pointer hover:bg-purple-200 transition-all"
                  onClick={() => onSelectContact(contact)}>

                  <div className="w-10 h-10 rounded-full overflow-hidden border mr-4 border-purple-300">
                    {contact.image ? (
                      <img
                        src={API_URL + contact.image}
                        alt={contact.first_name}
                        className=" w-full h-full  object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-purple-200">
                        <UserIcon className="w-6 h-6 text-gray-900 cursor-pointer" />
                      </div>
                    )
                    }
                  </div>

                  <span className="text-gray-800 font-medium">{contact.first_name + " " + contact.last_name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ContactsList;

