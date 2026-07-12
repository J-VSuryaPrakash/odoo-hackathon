import { z } from 'zod';

const usersSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address'),
  passwordHash: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(1, 'Phone is required').optional(),
  roleId: z.coerce.number().int().positive('Role id is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'LOCKED']).optional()
});

export const createUsersSchema = usersSchema;
export const updateUsersSchema = usersSchema.partial();

export type CreateUsersInput = z.infer<typeof createUsersSchema>;
export type UpdateUsersInput = z.infer<typeof updateUsersSchema>;