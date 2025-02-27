import { useEffect, useState } from "react";

export const FormContact = ({ addContact, editingContact, updateContact}) => {
  

  const employeeCategories = [
    "Administrativo",
    "Ventas",
    "Soporte Técnico",
    "Recursos Humanos",
    "Producción",
  ];

  const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    role: "Cliente",
    employeeCategory: "",
  };

  const [contact, setContact] = useState(initialState);

  // Cuando editingContact cambia, actualizar el estado con los datos o limpiar si es null
  useEffect(() => {
    if (editingContact) {
      setContact({
        firstName: editingContact.firstName ?? "",
        lastName: editingContact.lastName ?? "",
        phone: editingContact.phone ?? "",
        email: editingContact.email ?? "",
        address: editingContact.address ?? "",
        role: editingContact.role ?? "Cliente",
        employeeCategory: editingContact.employeeCategory ?? "",
      });
    } else {
      setContact(initialState); // Restablecer formulario al cambiar a "Nuevo Contacto"
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContact({ ...contact, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contact.firstName && contact.lastName && contact.phone) {
      if (editingContact) {
        updateContact(contact); // Edita el contacto existente
      } else {
        addContact({ ...contact, id: Date.now() }); // Agrega un nuevo contacto
      }

      // Reiniciar formulario
      setContact({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        role: "Cliente",
        employeeCategory: "",
      });
    }
  };

  return (
    <div className=" bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">{editingContact ? "Editar Contacto" : "Agregar Contacto"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid de inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 space-y-5 items-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Imagen redonda */}
              <div className="w-32 h-32 rounded-full overflow-hidden border border-purple-300">
                {contact.image ? (
                  <img src={contact.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-purple-200">
                    <box-icon name='user' size='lg' type='solid' color='gray'></box-icon>
                  </div>
                )}
              </div>
              {/* Símbolo de "+" */}
              <label htmlFor="image" className="absolute bottom-1 right-1 bg-purple-500 text-white rounded-full p-1.5 cursor-pointer w-8 h-8 flex items-center justify-center">
                <box-icon name='plus' color='white' size='sm'></box-icon>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Nombre</label>
            <input
              type="text"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Teléfono móvil</label>
            <input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Otro teléfono</label>
            <input
              type="tel"
              name="otherPhone"
              value={contact.otherPhone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* genero */}
          <div >
            <label className="block text-gray-700 font-medium mb-2 text-center">Género</label>
            <div className="flex gap-6 justify-center">
              <label className="flex items-center ">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={contact.gender === "F"}
                  onChange={handleChange}
                  className="mr-2 size-5 border-gray-300 text-purple-500"
                />
                F
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={contact.gender === "M"}
                  onChange={handleChange}
                  className="mr-2 size-5 border-gray-300 text-purple-500"
                />
                M
              </label>
            </div>
          </div>

          {/* Radio Button - Cliente / Empleado */}
          <div >
            <label className="block text-gray-700 font-medium mb-2 text-center">Tipo de contacto</label>
            <div className="flex gap-4 justify-center">
              <label className="flex items-center ">
                <input
                  type="radio"
                  name="role"
                  value="Cliente"
                  checked={contact.role === "Cliente"}
                  onChange={handleChange}
                  className="mr-2 size-5 border-gray-300 text-purple-500"
                />
                Cliente
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Empleado"
                  checked={contact.role === "Empleado"}
                  onChange={handleChange}
                  className="mr-2 size-5 border-gray-300 text-purple-500"
                />
                Empleado
              </label>
            </div>
          </div>

          {/* Selección de Categoría (Solo si es Empleado) */}
          {contact.role === "Empleado" && (
            <div>
              <label className="block text-gray-700 font-medium">Categoría de Empleado</label>
              <select
                name="employeeCategory"
                value={contact.employeeCategory}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Seleccione una categoría</option>
                {employeeCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Fecha de Cumpleaños</label>
            <input
              type="date"
              name="birthday"
              value={contact.birthday || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>


        {/* Dirección */}
        <div>
          <label className="block text-gray-700 font-medium">Dirección</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>



        {/* Botón de Enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="p-4  bg-purple-600 text-white py-2 rounded-lg border-purple-600 border
            hover:text-purple-600  hover:bg-white transition"
          >
            {editingContact ? "Actualizar" : "Agregar"}
          </button>
        </div>

      </form>

    </div>
  );
};

