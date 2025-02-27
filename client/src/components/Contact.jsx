
export const Contact = ({contact, onEdit}) => {
    return (

        <div className=" bg-gray-50 p-6 flex justify-center">
        <div className=" p-6 w-full max-w-3xl">
          {/* Imagen de Perfil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-300">
              {contact.image ? (
                <img src={contact.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-purple-200">
                  <box-icon name="user" size="lg" type="solid" color="gray"></box-icon>
                </div>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{contact.firstName} {contact.lastName}</h2>
            <p className="text-gray-600">{contact.role}</p>
          </div>
      
          {/* Información del Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Teléfono</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.phone}</p>
            </div>
      
            <div>
              <label className="block text-gray-600 font-medium">Otro Teléfono</label>
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.otherPhone}</p>
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
              <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.birthday}</p>
            </div>
      
            {contact.role === 'Empleado' && (
              <div>
                <label className="block text-gray-600 font-medium">Categoría de Empleado</label>
                <p className="p-2 bg-gray-100 rounded-lg text-gray-800">{contact.employeeCategory}</p>
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
            >
              <div className="flex items-center">
                Eliminar
                <box-icon name="trash" class=" ml-1 group-hover:fill-current" color="currentColor"></box-icon>
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
                <box-icon name="edit-alt" class=" ml-1 group-hover:fill-current" color="currentColor"></box-icon>
              </div>
              
              <span className="h-px bg-teal-600 w-0  group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
      

    )
}
