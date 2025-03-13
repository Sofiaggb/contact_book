import { ArrowUturnLeftIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
import { API_URL } from "../api/api"

export const Contact = ({contact, onEdit, onBack, onDelete }) => {
    return (

        <div className=" bg-gray-50 p-6 flex justify-center">
        <div className=" p-6 w-full max-w-3xl">
        <ArrowUturnLeftIcon
          className="mb-4 w-8 h-8 flex items-center cursor-pointer text-purple-600 hover:text-purple-800 transition"
          onClick={() => onBack()} //  Vuelve al buscador
        />

          {/* Imagen de Perfil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-300">
              {contact.image ? (
                <img src={API_URL + contact.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                  <UserIcon className="flex items-center justify-center w-full h-full bg-purple-200" />
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{contact.first_name} {contact.last_name}</h2>
            <p className="text-gray-600">{contact.role.name}</p>
          </div>
      
          {/* Información del Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Teléfono</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.phone}</p>
            </div>
      
            <div>
              <label className="block text-gray-600 font-medium">Otro Teléfono</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.other_phone}</p>
            </div>
      
            <div>
              <label className="block text-gray-600 font-medium">Género</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">
                {contact.gender === 'F' ? 'Femenino' : 'Masculino'}
              </p>
            </div>
      
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.email}</p>
            </div>
      
            <div>
              <label className="block text-gray-600 font-medium">Fecha de Cumpleaños</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{new Date(contact.birthday).toISOString().split("T")[0]}</p>
            </div>
      
            {contact.RoleId === 2 && (
              <div>
                <label className="block text-gray-600 font-medium">Categoría de Empleado</label>
                <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.department.name}</p>
              </div>
            )}
      
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-600 font-medium">Dirección</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.address}</p>
            </div>
          </div>
      
          
          <div className="mt-6 flex gap-10 ">
            {/* Botón de Eliminar */}
            <button
              type="button"
              className="text-red-700 hover:text-red-800 transition flex flex-col items-center group"
              onClick={() => onDelete(contact.id)}
            >
              <div className="flex items-center text-red-700 hover:text-red-800 transition ">
                Eliminar
                <TrashIcon className="w-6 h-6 "/>
              </div>
              
              <span className="h-px bg-red-800 w-0  group-hover:w-full transition-all duration-300"></span>
            </button>

        {/* Botón de editar */}
            <button
              type="button"
              className="text-teal-700 hover:text-teal-800 transition flex flex-col items-center group"
              onClick={() => onEdit(contact)}
            >
              <div className="flex items-center" >
                Editar
                <PencilIcon className="w-6 h-6 "/>
              </div>
              
              <span className="h-px bg-teal-600 w-0  group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
      

    )
}
