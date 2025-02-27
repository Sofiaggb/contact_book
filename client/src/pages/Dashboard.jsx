import { useState } from "react";
import ContactList from "../components/ContactList";
import { FormContact } from "../components/FormContact";
import { Contact } from "../components/Contact";
import { contactsData } from "../data/ContactsData";
import { UserManagement } from "../components/UserManagement ";

export const Dashboard = () => {
  const [contacts, setContacts] = useState(contactsData);
   // Estado para el contacto seleccionado
   const [selectedContact, setSelectedContact] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [showManageUsers, setShowManageUsers] = useState(false);
   const [editingContact, setEditingContact] = useState(null);

   const manageUsers = (e) => {
    setShowManageUsers(e)
    setSelectedContact(null);
    setEditingContact(null);
    setShowForm(false);
   }

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setShowManageUsers(false)
    setShowForm(false); // Ocultamos el formulario al seleccionar un contacto
  };

  const handleCreateContact = (e) => {
    setEditingContact(null);
    setShowForm(e); // true
  };
  
  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null); // Salir del modo edición
    setShowForm(false);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact); // Pasa el contacto seleccionado al formulario
    setShowForm(true); // Muestra el formulario de edición
  };

  return (

      <div className="flex bg-gray-50">
          {/* Lista de contactos */}
          <ContactList 
          setShowForm={handleCreateContact} 
          contacts={contacts} 
          onSelectContact={handleSelectContact} 
          manageUsers={manageUsers}
          />

        <div className="flex-1 h-screen overflow-y-auto">
          
           { showForm ? (
              // {/* Formulario de nuevo contacto */}
               <FormContact 
                addContact={addContact}
                editingContact={editingContact}
                updateContact={updateContact} /> 
              
              ): showManageUsers ? (

                <UserManagement />

              ): selectedContact ? (
                  <Contact contact={selectedContact} onEdit={handleEditContact} />
              ) : (
                  <div className="flex h-full justify-center items-center">
                    <box-icon size='lg' name='edit' color='grey'></box-icon>
                  </div>
              )
      
           }
           
        </div>
        
      </div>
   
  );
};

export default Dashboard;
