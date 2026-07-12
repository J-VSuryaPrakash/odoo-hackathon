import { z } from 'zod';

const vehicleSchema = z.object({
  registrationNo: z.string().min(1, 'Registration number is required'),
  vehicleName: z.string().optional(),
  vehicleType: z.enum(['Van', 'Truck', 'Mini', 'Trailer', 'Other']).optional(),
  model: z.string().optional(),
  capacityKg: z.coerce.number().positive('Capacity must be greater than 0').optional(),
  purchaseCost: z.coerce.number().positive('Purchase cost must be greater than 0').optional(),
  odometer: z.coerce.number().int().min(0).optional(),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'CNG']).optional(),
  purchaseDate: z.coerce.date().optional(),
  status: z.enum(['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED']).optional()
});

export const createVehicleSchema = vehicleSchema;
export const updateVehicleSchema = vehicleSchema.partial();

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;