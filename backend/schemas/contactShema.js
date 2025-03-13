import { z } from 'zod';

// Esquema base para Contactos
export const contactSchema = z.object({
  first_name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  other_phone: z.string().optional(),
  gender: z.enum(['M', 'F']).optional(),
  email: z.string().email("Correo inválido"),
  birthday: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "La fecha de cumpleaños no es válida",
  }),
  address: z.string().min(1, "La dirección es obligatoria"),
  image: z.string().optional(),
  roleId: z.number().int().positive("El rol es obligatorio"),
  departmentId: z.number().int().positive().nullable().optional(),
});

// Esquema para respuestas de contacto (incluye id)
export const contactResponseSchema = contactSchema.extend({
  id: z.number().int().positive().optional(),
  role: z.object({
    id: z.number().int().positive().optional(),
    name: z.string().optional()
  }).optional(),
  department: z.object({
    id: z.number().int().positive().optional(),
    name: z.string().optional()
  }).optional()
});
