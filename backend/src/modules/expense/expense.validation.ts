import { z } from 'zod';

const expenseSchema = z.object({
  tripId: z.coerce.number().int().positive().optional(),
  vehicleId: z.coerce.number().int().positive().optional(),
  expenseType: z.enum(['TOLL', 'REPAIR', 'PARKING', 'MISC', 'PENALTY']).optional(),
  amount: z.coerce.number().positive('Amount must be greater than 0').optional(),
  remarks: z.string().optional(),
  expenseDate: z.coerce.date().optional()
});

export const createExpenseSchema = expenseSchema;
export const updateExpenseSchema = expenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;