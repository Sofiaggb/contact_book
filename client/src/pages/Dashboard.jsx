import Swal from "sweetalert2";
import { useState } from "react";
import ContactList from "../components/ContactList";
import { FormContact } from "../components/FormContact";
import { Contact } from "../components/Contact";
import { UserManagement } from "../components/UserManagement ";
import { Search } from "../components/Search";
import { createContact, updateContact, deleteContact } from "../api/contactService";

export const Dashboard = () => {
   // Estado para el contacto seleccionado
   const [selectedContact, setSelectedContact] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showManageUsers, setShowManageUsers] = useState(false);
   const [editingContact, setEditingContact] = useState(null);
  //  const [showSearch, setShowSearch] = useState(false);
   const [refresh, setRefresh] = useState(false);
   // Estado para almacenar la consulta de búsqueda
  const [searchQuery, setSearchQuery] = useState({
    searchTerm: "",
    role: null,
    department: null,
    gender: null,
    date: null,
  });

  const refreshContacts = () => {
    setRefresh((prev) => !prev); // Cambia el estado para forzar la recarga
  };


  const manageUsers = (e) => {
    // setShowSearch(false);
    setShowManageUsers(e)
    setSelectedContact(null);
    setEditingContact(null);
    setShowForm(false);
  }

  const addContact = async(contactData) => {
    try {
      const response = await createContact(contactData);
      refreshContacts();
      console.log('Contacto registrado exitosamente:', response);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        console.log(error.response)
        console.log(error.response.data.error || "Error desconocido al iniciar sesión")
        // Si la respuesta del backend tiene un error
        alert(error.response.data.error || "Error desconocido al iniciar sesión");
      }
      
    }
  };

  const handleSelectContact = (contact, search) => {
    setSearchQuery(search);
    // setShowSearch(false);
    setSelectedContact(contact);
    setShowManageUsers(false)
    setShowForm(false); // Ocultamos el formulario al seleccionar un contacto
  };

  const handleCreateContact = (e) => {
    setEditingContact(null);
    setShowForm(e); // true
  };
  
  const update = async(id,updatedContact) => {
    try {
      const response = await updateContact(id,updatedContact);
      refreshContacts();
      console.log('Contacto actualizado exitosamente:', response);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        console.log(error.response)
        console.log(error.response.data.error || "Error desconocido al iniciar sesión")
        // Si la respuesta del backend tiene un error
        alert(error.response.data.error || "Error desconocido al iniciar sesión");
      }
      
    }
    setEditingContact(null); // Salir del modo edición
    setShowForm(false);
  };

  const handleEditContact = (contact) => {
    // setShowSearch(false);
    setEditingContact(contact); // Pasa el contacto seleccionado al formulario
    setShowForm(true); // Muestra el formulario de edición
  };

  const handleBackToSearch = () => {
    setSelectedContact(null);
    // setShowSearch(false);  // Regresa al buscador
    setShowForm(false);
    setShowManageUsers(false)
  };
  
  const handleDeleteContact = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteContact(id);
          refreshContacts(); // Recargar la lista después de eliminar
          setSelectedContact(null);
          setShowForm(false);

          // Mostrar mensaje de éxito
          Swal.fire("¡Eliminado!", "El contacto ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el contacto:", error);
          Swal.fire("Error", "No se pudo eliminar el contacto", "error");
        }
      }
    });
  };


  return (

      <div className="flex bg-gray-50">
          {/* Lista de contactos */}
          <ContactList 
          setShowForm={handleCreateContact} 
          setShowSearch={handleBackToSearch}
          onSelectContact={handleSelectContact} 
          manageUsers={manageUsers}
          refresh={refresh} 
          />

        <div className="flex-1 h-screen overflow-y-auto">
          
           { showForm ? (
              // {/* Formulario de nuevo contacto */}
               <FormContact 
                addContact={addContact}
                editingContact={editingContact}
                updateContact={update}
                 /> 
              
              ): showManageUsers ? (

                <UserManagement />

              ): selectedContact ? (
                  <Contact 
                  contact={selectedContact} 
                  onEdit={handleEditContact} 
                  onBack={handleBackToSearch}
                  onDelete={handleDeleteContact} 
                  />
              ): 
              // showSearch ? (
              //   <Search onSelectContact={handleSelectContact}/>
              // ): 
              (
                <Search 
                  onSelectContact={handleSelectContact}
                  searchQuery={searchQuery}
                />
              )
      
           }
           
        </div>
        
      </div>
   
  );
};

export default Dashboard;
