import { z } from "zod";

const maintenanceLogSchema = z.object({
  vehicleId: z.coerce.number().int().positive("Vehicle id is required"),
  serviceType: z.string().optional(),
  description: z.string().optional(),
  cost: z.coerce.number().positive("Cost must be greater than 0").optional(),
  serviceDate: z.coerce.date().optional(),
  status: z.enum(["AVAILABLE", "IN_SHOP"]).optional(),
});

export const createMaintenanceLogSchema = maintenanceLogSchema;
export const updateMaintenanceLogSchema = maintenanceLogSchema.partial();

export type CreateMaintenanceLogInput = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogInput = z.infer<typeof updateMaintenanceLogSchema>;