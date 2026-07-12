import { z } from 'zod';

const rolePermissionSchema = z.object({
  roleId: z.coerce.number().int().positive(),
  permissionId: z.coerce.number().int().positive()
});

export const createRolePermissionSchema = rolePermissionSchema;

export type CreateRolePermissionInput = z.infer<typeof createRolePermissionSchema>;
