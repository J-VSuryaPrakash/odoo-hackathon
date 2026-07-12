import { z } from 'zod';

const driverSchema = z.object({
  driverName: z.string().min(1, 'Driver name is required'),
  licenseNumber: z.string().min(1, 'License number is required').optional(),
  licenseType: z.enum(['LMV', 'HMV']).optional(),
  phone: z.string().min(1, 'Phone is required').optional(),
  address: z.string().min(1, 'Address is required').optional(),
  licenseExpiry: z.coerce.date().optional(),
  joiningDate: z.coerce.date().optional(),
  safetyScore: z.coerce.number().min(0).optional(),
  status: z.enum(['AVAILABLE', 'ON_TRIP', 'OFF_DUTY', 'SUSPENDED']).optional()
});

export const createDriverSchema = driverSchema;
export const updateDriverSchema = driverSchema.partial();

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;