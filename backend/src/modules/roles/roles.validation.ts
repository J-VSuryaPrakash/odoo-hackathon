import { z } from 'zod';

const roleSchema = z.object({
  roleName: z.string().trim().min(1, 'Role name is required').max(50),
  description: z.string().trim().max(255).optional()
});

export const createRoleSchema = roleSchema;
export const updateRoleSchema = roleSchema.partial();

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
