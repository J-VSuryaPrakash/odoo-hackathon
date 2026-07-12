import { z } from "zod";

const maintenanceLogSchema = z.object({
  vehicleId: z.string().uuid("Invalid vehicle ID"),
  description: z.string().min(1, "Description is required"),
  cost: z.number().positive("Cost must be greater than 0"),
  isActive: z.boolean().default(true),
  createdAt: z.coerce.date().optional(),
  closedAt: z.coerce.date().optional(),
});

export const createMaintenanceLogSchema = maintenanceLogSchema;
export const updateMaintenanceLogSchema = maintenanceLogSchema.partial();

export type CreateMaintenanceLogInput = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogInput = z.infer<typeof updateMaintenanceLogSchema>;