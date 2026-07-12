import { z } from 'zod';

const permissionSchema = z.object({
  permissionName: z.string().min(1, 'Permission name is required'),
  moduleName: z.string().optional()
});

export const createPermissionSchema = permissionSchema;
export const updatePermissionSchema = permissionSchema.partial();

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;