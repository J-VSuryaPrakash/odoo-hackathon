import { z } from 'zod';

const tripSchema = z.object({
  tripNo: z.string().optional(),
  source: z.string().optional(),
  destination: z.string().optional(),
  vehicleId: z.coerce.number().int().positive().optional(),
  driverId: z.coerce.number().int().positive().optional(),
  cargoWeight: z.coerce.number().positive('Cargo weight must be greater than 0').optional(),
  plannedDistance: z.coerce.number().positive().optional(),
  actualDistance: z.coerce.number().positive().optional(),
  estimatedTime: z.coerce.number().int().min(0).optional(),
  actualTime: z.coerce.number().int().min(0).optional(),
  dispatchTime: z.coerce.date().optional(),
  arrivalTime: z.coerce.date().optional(),
  status: z.enum(['DRAFT', 'DISPATCHED', 'COMPLETED', 'CANCELLED']).optional(),
  createdBy: z.coerce.number().int().positive().optional()
});

export const createTripSchema = tripSchema;
export const updateTripSchema = tripSchema.partial();

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;