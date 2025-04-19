import { UserIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {getRoles, getDepartments } from "../api/contactService";
import { API_URL } from "../api/api";
import { validateForm } from "../utils/AuthForm";

export const FormContact = ({ addContact, editingContact, updateContact}) => {

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    // establecer fecha maxima el años actual menos 16 años
    const today = new Date();
    const year = today.getFullYear() - 16;
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMaxDate(`${year}-${month}-${day}`);

    // Obtener roles y departamentos
    const fetchRolesAndDepartments = async () => {
      try {
        const rolesData = await getRoles();
        const departmentsData = await getDepartments();
        setRoles(rolesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching roles and departments:", error);
      }
    };

    fetchRolesAndDepartments();
  }, []);


  const initialState = {
    first_name: "",
    last_name: "",
    phone: "",
    other_phone: "",
    email: "",
    address: "",
    roleId: "",  
    departmentId: "", 
    gender: "",
    image: "",
    birthday: "",
  };

  const [contact, setContact] = useState(initialState);

  // Cuando editingContact cambia, actualizar el estado con los datos o limpiar si es null
  useEffect(() => {
    if (editingContact) {
      
      setContact({
        first_name: editingContact.first_name ?? "",
        last_name: editingContact.last_name ?? "",
        phone: editingContact.phone ?? "",
        other_phone: editingContact.other_phone ?? "",
        email: editingContact.email ?? "",
        address: editingContact.address ?? "",
        roleId: editingContact.RoleId ?? "",
        departmentId: editingContact.DepartmentId ?? "",
        gender: editingContact.gender ?? "",
        image: editingContact.image ?? "",
        birthday: new Date(editingContact.birthday).toISOString().split("T")[0] ?? "",
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
      const imageURL = URL.createObjectURL(file); // Generar la URL temporal
      setContact((prevContact) => ({
        ...prevContact,
        imageURL: imageURL, // Usar la URL temporal para mostrar la imagen
        image: file // Guardar el archivo real para enviarlo en el FormData
      }));
    }
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    const errors = validateForm(contact);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    setError("");
    
    try {
        const formData = new FormData();
    
        // Agrega los demás campos
        formData.append("first_name", contact.first_name);
        formData.append("last_name", contact.last_name);
        formData.append("phone", contact.phone);
        formData.append ( "other_phone",  contact.other_phone === "" ? null : contact.other_phone );
        formData.append("email", contact.email);
        formData.append("address", contact.address);
        formData.append("roleId", contact.roleId);
        formData.append("gender", contact.gender);
        formData.append("birthday", contact.birthday);
        formData.append("image", contact.image);
        if (contact.departmentId !== null && contact.departmentId !== "") {
          formData.append("departmentId", contact.departmentId);
        } 

        if (editingContact) {
          // Llamar a la función para editar el contacto 
          updateContact(editingContact.id, formData); 
        } else {
          
          console.log(formData);
          addContact(formData);
          // Reiniciar el formulario
          setContact(initialState);
        }
    } catch (error) {
      console.error('Error al registrar/actualizar usuario:', error);
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
    <div className=" bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">{editingContact ? "Editar Contacto" : "Agregar Contacto"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid de inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 space-y-5 items-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Imagen redonda */}
              <div className="w-32 h-32 rounded-full overflow-hidden border border-purple-300">
                { contact.imageURL ? (
                  <img src={contact.imageURL} alt="Profile" className="w-full h-full object-cover" />
                ): editingContact && editingContact.image ? (
                  <img src={API_URL + editingContact.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-purple-200">
                    <UserIcon className="w-3/4 h-3/4"/>
                  </div>
                )}
              </div>
              {/* Símbolo de "+" */}
              <label htmlFor="image" className="absolute bottom-1 right-1 bg-purple-500  rounded-full p-1.5 cursor-pointer w-8 h-8 flex items-center justify-center">
                <PlusIcon className="text-white w-full h-full"  />
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
              name="first_name"
              value={contact.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={contact.last_name}
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
              name="other_phone"
              value={contact.other_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            
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

          <div>
              <label className="block text-gray-700 font-medium">Categoría de Empleado</label>
              <select
                name="roleId"
                // value={editingContact ? editingContact.roleId : contact.roleId} 
                value={contact.roleId}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Seleccione una categoría</option>

                {
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))
                }
              </select>
            </div>

          {/* Selección de Categoría (Solo si es Empleado) */}
          {contact.roleId == 2 && (
            <div>
              <label className="block text-gray-700 font-medium">Departamento del Empleado</label>
              <select
                name="departmentId"
                value={contact.departmentId}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Seleccione una categoría</option>
                {
                  departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))
                }
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
              value={contact.birthday}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1930-01-01"
              max={maxDate}
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

        {error && (
          <div className="text-red-500">
            {Object.entries(error).map(([key, value]) => (
              <p key={key}>{value}</p>
            ))}
          </div>
        )}
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

