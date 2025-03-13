import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  roleId: z.number().int().positive("El rol es obligatorio")
});

// Esquema para respuestas de usuario (incluye id)
export const userResponseSchema = userSchema.extend({
    id: z.number().optional(),
  }); 

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
});