import { api } from './api';

// Obtener todos los contactos
export const getAllContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};

// Obtener un contacto por ID
export const getContactById = async (id) => {
  const response = await api.get(`/contacts/contact/${id}`);
  return response.data;
};

// Buscar contactos con filtros
export const searchContacts = async (filters) => {
  const response = await api.get('/contacts/search', { params: filters });
  return response.data;
};

// Crear un nuevo contacto
export const createContact = async (contactData) => {
  const response = await api.post('/contacts/save', contactData);
  return response.data;
};

// Actualizar un contacto por ID
export const updateContact = async (id, contactData) => {
  const response = await api.put(`/contacts/update/${id}`, contactData);
  return response.data;
};

// Eliminar un contacto por ID
export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/delete/${id}`);
  return response.data;
};

// Obtener departamentos
export const getDepartments = async () => {
  const response = await api.get('/contacts/department');
  return response.data;
};

// Obtener roles
export const getRoles = async () => {
  const response = await api.get('/contacts/role');
  return response.data;
};
