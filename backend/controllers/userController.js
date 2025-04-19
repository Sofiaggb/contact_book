import { userSchema, loginSchema } from '../schemas/userShema.js';
import User from '../models/userModel.js';
import RoleUser from '../models/roleUserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();
const tokenBlacklist = new Set();

export const controller = {

  create: async (req, res) => {
    try {
        // Validar datos del usuario
        const validData = userSchema.parse(req.body);
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ where: { email: validData.email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        validData.password = await bcrypt.hash(validData.password, salt);

        // Crear usuario en la base de datos
        const newUser = await User.create(validData);

        res.status(201).json({ 
            message: 'Usuario creado correctamente',
            user: newUser
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); // Buscar el usuario por ID
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy(); // Eliminar el usuario
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  },

  getAll: async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
              model: RoleUser,
              as: 'role', // Nombre del alias definido en la relación
              attributes: ['name'], // Solo traer el nombre del rol
            },
          }); // Obtener todos los usuarios
        if (!users.length) {
            return res.status(404).json({ error: 'No hay usuarios registrados' });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  },

    login: async (req, res) => {
        try {
            // Validar los datos del login
            const validData = loginSchema.parse(req.body);
    
            // Buscar el usuario por su email
            const user = await User.findOne({ where: { email: validData.email } });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            // Comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcrypt.compare(validData.password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
    
            // Generar el token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, roleId: user.roleId },
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
    
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    roleId: user.roleId
                }
            });
    
        } catch (error) {
            console.error('Error en el login:', error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors }); // Errores de validación
            }
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    } 
    
      
}
