import { contactSchema } from '../schemas/contactShema.js';
import Contact from '../models/contactModel.js';
import { z } from 'zod';
import { Op, Sequelize } from 'sequelize';
import Role from '../models/roleModel.js';
import Department from '../models/departmentModel.js';

export const controller = {
  
  // Crear un contacto
  create: async (req, res) => {
    try {
      // Convertir los valores de roleId y employeeCategoryId a números si están en formato string
      if (req.body.roleId) req.body.roleId = Number(req.body.roleId);
      if (!req.body.departmentId) {
        req.body.departmentId = null;
      }else{
        req.body.departmentId = Number(req.body.departmentId);
      }

      // Validar datos del cuerpo de la solicitud
      const validData = contactSchema.parse(req.body);

      // Si hay una imagen, agregarla a los datos válidos
      if (req.file) {
        validData.image = `/uploads/${req.file.filename}`;
      }

      // Crear el contacto
      const newContact = await Contact.create({ 
        ...validData,  // Incluye todos los datos validados
        RoleId: validData.roleId,
        DepartmentId: validData.departmentId
      });

      res.status(201).json({
        message: 'Contacto creado correctamente',
        contact: newContact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Error al crear el contacto' });
    }
  },

  // Editar un contacto por su ID
  update: async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone, other_phone, gender, email, birthday, address, roleId, departmentId } = req.body;
    try {
      // Convertir roleId y employeeCategoryId a números si es necesario
      if (departmentId) req.body.departmentId = Number(departmentId);

      const contact = await Contact.findByPk(id); // Buscar el contacto por su ID
      if (!contact) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }

      // Actualizar los datos del contacto
      contact.first_name = first_name || contact.first_name;
      contact.last_name = last_name || contact.last_name;
      contact.phone = phone || contact.phone;
      contact.other_phone = other_phone || contact.other_phone;
      contact.gender = gender || contact.gender;
      contact.email = email || contact.email;
      contact.birthday = birthday || contact.birthday;
      contact.address = address || contact.address;
      contact.RoleId =  parseInt(roleId, 10) || contact.RoleId;
      contact.DepartmentId = departmentId || contact.DepartmentId;
      
      // Si se envía una imagen nueva, actualizarla
      if (req.file) {
        contact.image = `/uploads/${req.file.filename}`;
      }

      // Guardar los cambios en la base de datos
      await contact.save();
  
      res.status(200).json({ message: 'Contacto actualizado correctamente', contact });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el contacto' });
    }
  },

  // Eliminar un contacto por su ID
  delete: async (req, res) => {
    const { id } = req.params;
  
    try {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
  
      // Eliminar el contacto
      await contact.destroy();
  
      // Responder con el contacto eliminado
      res.status(200).json({
        message: 'Contacto eliminado correctamente',
        contact // Puedes incluir los datos eliminados si lo deseas
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el contacto' });
    }
  },
  

  // Obtener un contacto por su ID
  getById: async (req, res) => {
    const { id } = req.params;  // Tomar el id del contacto desde los parámetros de la URL

    try {
      const contact = await Contact.findByPk(id);  // Buscar el contacto por ID
      if (!contact) {
        return res.status(404).json({ error: 'Contacto no encontrado' });  // Si no se encuentra el contacto
      }

      // Si se encuentra, devolverlo
      res.status(200).json({ contact });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el contacto' });  // Si ocurre algún error
    }
  },


  // Obtener todos los contactos
  getAll: async (req, res) => {
    try {
      const contacts = await Contact.findAll({
        include: [
          { model: Role, as: 'role', attributes: ['id', 'name'] },
          { model: Department, as: 'department', attributes: ['id', 'name'] },
        ],
      });  // Obtener todos los contactos de la base de datos
      res.status(200).json({ contacts });  // Devolver los contactos encontrados
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los contactos' });  // Si ocurre algún error
    }
  },

  // Obtener contactos con filtros
  getFiltered: async (req, res) => {
    const { searchTerm, role,department, gender, date, dateInit, dateFin } = req.query;
    try {
      // Construir los filtros dinámicamente
      const filters = {};

      if (searchTerm) {
        const terms = searchTerm.split(" ").filter(term => term.trim() !== ""); // Dividir el término en palabras
        
        filters[Op.or] = [
          ...terms.flatMap(term => [
            { first_name: { [Op.iLike]: `%${term}%` } },
            { last_name: { [Op.iLike]: `%${term}%` } }
          ]),
          { email: { [Op.iLike]: `%${searchTerm}%` } }
        ];
      }

      if (role) {
        filters.RoleId = Number(role); 
      }
  
      // Filtrar por departamento (usamos el campo DepartmentId)
      if (department) {
        filters.DepartmentId  = Number(department); 
      }

      if (gender) {
        filters.gender = gender;  // Filtrar por género
      }

      if (date) {
        filters.birthday = Sequelize.literal(` EXTRACT(MONTH FROM "birthday" AT TIME ZONE 'UTC') = ${Number(date)}`);
      }

       // Agregar filtros de fecha (dateInit y dateFin)
      if (dateInit && dateFin) {
        const startDate = new Date(dateInit);
        const endDate = new Date(dateFin);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          filters.birthday = {
            [Op.between]: [startDate, endDate]
          };
        } else {
          return res.status(400).json({ error: 'Fechas de inicio y fin inválidas' });
        }
      }

      // Buscar contactos con los filtros
      const contacts = await Contact.findAll({
         where: filters,
         include: [
            { model: Role, as: 'role', attributes: ['id', 'name'] },
            { model: Department, as: 'department', attributes: ['id', 'name'] },
          ], 
        });
      // console.log("Contactos encontrados:", contacts);
      if (contacts.length === 0) {
        return res.status(404).json({ error: 'No se encontraron contactos' });
      }

      res.status(200).json({ contacts });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al obtener los contactos' });
    }
  }


};



