import { z } from 'zod';

export const departmentSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre del departamento es obligatorio"),
});

export const departmentsResponseSchema = z.array(departmentSchema);
