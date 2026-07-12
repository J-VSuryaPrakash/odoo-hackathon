import { z } from "zod";

const fuelLogSchema = z.object({
  vehicleId: z.coerce.number().int().positive().optional(),
  tripId: z.coerce.number().int().positive().optional(),
  liters: z.coerce.number().positive("Liters must be greater than 0").optional(),
  pricePerLiter: z.coerce.number().positive("Price per liter must be greater than 0").optional(),
  amount: z.coerce.number().positive("Amount must be greater than 0").optional(),
  fuelStation: z.string().optional(),
  odometer: z.coerce.number().int().min(0).optional(),
  date: z.coerce.date().optional(),
});

export const createFuelLogSchema = fuelLogSchema;
export const updateFuelLogSchema = fuelLogSchema.partial();

export type CreateFuelLogInput = z.infer<typeof createFuelLogSchema>;
export type UpdateFuelLogInput = z.infer<typeof updateFuelLogSchema>;