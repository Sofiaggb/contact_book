import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {  PlusIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { getDepartments, getRoles, searchContacts } from "../api/contactService";
import { months } from "../data/MonthsData";

export const Search = ({onSelectContact }) => {
  const [contacts, setContacts] = useState([]); // Estado para almacenar contactos
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setdepartmentFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [birthdayFilter, setBirthdayFilter] = useState("");
  const [dateInitFilter, setDateInitFilter] = useState("");
  const [dateFinFilter, setDateFinFilter] = useState("");

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Función para cargar contactos con filtros
  const fetchContacts = async () => {
    try {
      const filters = {
        searchTerm,
        role: roleFilter,
        department:  roleFilter === "1" ? "" : departmentFilter,
        gender: genderFilter,
        date: birthdayFilter
      };
      if (dateInitFilter && dateFinFilter) {
        filters.dateInit = dateInitFilter;
        filters.dateFin = dateFinFilter;
      }
      // console.log(filters)
      const data = await searchContacts(filters); // Llamar a la API
      console.log(data.contacts)
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      setContacts([]); // Vaciar lista en caso de error
    }
  };

  useEffect(() => {
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


  useEffect(() => {
    if (roleFilter === "1") {
      setdepartmentFilter("");
    }
  }, [roleFilter]);

  // Llamar a fetchContacts cuando cambien los filtros
  useEffect(() => {
    if (roleFilter === "1") {
      setdepartmentFilter("");
    }
    fetchContacts();
  }, [searchTerm, roleFilter, departmentFilter, genderFilter, birthdayFilter, dateInitFilter, dateFinFilter])


  // Exportar los contactos filtrados a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Contactos", 14, 10);
    autoTable(doc, {
      head: [["Nombre", "Apellido", "Email", "Categoría"]],
      body: contacts.map((contact) => [contact.first_name , contact.last_name, contact.email, contact.role.name]),
      startY: 20,
    });
    doc.save("contactos.pdf");
  };
  

  return (
    <div className=" mx-auto p-6">

      {/* Filtros */}
      <div className="mt-9 grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {/* Búsqueda general (Ocupa dos columnas en pantallas medianas y grandes) */}
        <div className="flex items-center border rounded col-span-2">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            // className=" flex-grow  p-2 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            className="flex-grow  p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <MagnifyingGlassIcon className="w-9 h-full p-2 bg-purple-200 hover:bg-purple-300 rounded-r" /> */}
        </div>

        {/* Filtro por categoría */}
        <select
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Categoría</option>
          {
            roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))
          }
        </select>

        {roleFilter == 2 && (
            
              <select
                name="departmentId"
                value={departmentFilter}
                onChange={(e) => setdepartmentFilter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 col-span-2"
                required
              >
                <option value="">Departamento</option>
                {
                  departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))
                }
              </select>
          )}

        {/* Filtro por género */}
        <div className="flex items-end">
          <select
            className="p-2 border w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        
      
        {/* Filtro por cumpleaño mes */}
        <div className="flex items-end">
          <select 
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setBirthdayFilter(e.target.value)}
          >
            <option value="">Cumpleaños mes</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="dateInit" className="block text-gray-700 font-medium">Desde</label>
 
          <input type="date"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" 
            name="dateInit" 
            id="dateInit" 
            placeholder="Desde"
            value={dateInitFilter}
            onChange={(e) => setDateInitFilter(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dateFin" className="block text-gray-700 font-medium">Hasta</label>
          <input type="date"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" 
            name="dateFin" 
            id="dateFin" 
            placeholder="Hasta"
            value={dateFinFilter}
            onChange={(e) => setDateFinFilter(e.target.value)}
          />
        </div>
        
      </div> 

      {/* Botón de exportar PDF */}
      <button
        className="m-2 flex bg-indigo-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        onClick={exportToPDF}
      >
        <span>Exportar PDF</span> 
        <DocumentIcon className="w-6 text-white"/>
      </button>


      {/* Tabla de resultados */}

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Apellido</th>
            <th className="p-4 text-left">Teléfono</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-center w-16"></th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-500">
          {contacts.map((contact) => (
            
            <tr key={contact.id} className="hover:bg-gray-100 transition">
              <td className="p-4 border-b">{contact.first_name} </td>
              <td className="p-4 border-b">{contact.last_name}</td>
              <td className="p-4 border-b">{contact.phone}</td>
              <td className="p-4 border-b">{contact.email}</td>
              <td className="p-4 border-b text-center">
                <button className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-700 transition"
                onClick={() => onSelectContact(contact.id)} //  Selección del contacto
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};
