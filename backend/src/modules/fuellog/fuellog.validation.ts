import { z } from "zod";

const fuelLogSchema = z.object({
  vehicleId: z.string().uuid("Invalid vehicle ID"),
  tripId: z.string().uuid("Invalid trip ID").optional(),
  liters: z.number().positive("Liters must be greater than 0"),
  cost: z.number().positive("Cost must be greater than 0"),
  date: z.coerce.date().default(() => new Date()),
});

export const createFuelLogSchema = fuelLogSchema;
export const updateFuelLogSchema = fuelLogSchema.partial();

export type CreateFuelLogInput = z.infer<typeof createFuelLogSchema>;
export type UpdateFuelLogInput = z.infer<typeof updateFuelLogSchema>;