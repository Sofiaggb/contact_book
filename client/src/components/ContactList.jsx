import { useState } from "react";

const ContactsList = ({setShowForm,contacts, onSelectContact, manageUsers}) => {

  const [filter, setFilter] = useState("Todos"); // Estado para filtrar

  // Filtrar contactos según la categoría seleccionada
  const filteredContacts = contacts.filter((contact) => {
    if (filter === "Todos") return true;
    return contact.role === filter;
  });

  // Ordenar contactos alfabéticamente
  const sortedContacts = [...filteredContacts].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  // Extraer las letras iniciales para el abecedario
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    
    <div className="w-1/3 bg-gray-100 ">
          <div className="flex justify-between mx-4 mt-4 ">
            <div>
              <span className="cursor-pointer" onClick={() => manageUsers(true)}>
                <box-icon name='cog' size='md'  color='gray'></box-icon>
              </span>
            </div>
          
            <div className="space-x-4">
              <span className="cursor-pointer" onClick={() => setShowForm(true)}>
                <box-icon name='plus' size='md' type='solid' color='gray'></box-icon>
              </span>
              <span className="cursor-pointer" >
                <box-icon name='log-in' size='md'  color='gray'></box-icon>
              </span>
            </div>
          </div>

           {/* Botones de filtro */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "Todos" ? "bg-purple-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("Todos")}
            >
              Todos
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "Cliente" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("Cliente")}
            >
              Clientes
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === "Empleado" ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setFilter("Empleado")}
            >
              Empleados
            </button>
      </div>
      <div className=" flex h-[90vh]  overflow-y-auto ">

        <div className=" p-4">
          <ul className="space-y-2 text-center">
            {alphabet.map((letter) => (
              <li key={letter} className="text-gray-700 font-medium">{letter}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex  bg-gray-100 ">
          <div className="p-6 rounded-lg  w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Lista de Contáctos</h2>

            <ul className="divide-y divide-gray-300">
              {sortedContacts.map((contact) => (
                <li key={contact.id} className="p-3 rounded-lg flex items-center cursor-pointer hover:bg-purple-200 transition-all" 
                 onClick={() => onSelectContact(contact)}>

                  <div className="w-10 h-10 rounded-full overflow-hidden border mr-4 border-purple-300">
                  { contact.image ? (
                      <img
                        src={contact.image}
                        alt={contact.firstName}
                        className=" w-full h-full  object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-purple-200">
                        <box-icon name='user' size='sm' type='solid' color='gray'></box-icon>
                      </div>
                    )
                  }
                  </div>

                  <span className="text-gray-800 font-medium">{contact.firstName + " " + contact.lastName}</span>
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

