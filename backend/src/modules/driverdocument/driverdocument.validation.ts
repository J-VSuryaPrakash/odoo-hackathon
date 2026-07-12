import { z } from 'zod';

const driverDocumentSchema = z.object({
  driverId: z.coerce.number().int().positive('Driver id is required'),
  documentName: z.string().optional(),
  expiryDate: z.coerce.date().optional(),
  filePath: z.string().optional()
});

export const createDriverDocumentSchema = driverDocumentSchema;
export const updateDriverDocumentSchema = driverDocumentSchema.partial();

export type CreateDriverDocumentInput = z.infer<typeof createDriverDocumentSchema>;
export type UpdateDriverDocumentInput = z.infer<typeof updateDriverDocumentSchema>;