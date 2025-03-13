import { z } from 'zod';

export const roleSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre del rol es obligatorio"),
});

export const rolesResponseSchema = z.array(roleSchema);
