import { z } from 'zod';

const settingsSchema = z.object({
  depotName: z.string().optional(),
  currency: z.string().optional(),
  distanceUnit: z.string().optional(),
  updatedBy: z.coerce.number().int().positive().optional()
});

export const createSettingsSchema = settingsSchema;
export const updateSettingsSchema = settingsSchema.partial();

export type CreateSettingsInput = z.infer<typeof createSettingsSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;