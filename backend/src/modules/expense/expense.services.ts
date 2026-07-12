import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateExpenseInput, UpdateExpenseInput } from './expense.validation.js';

const validateRelations = async (tripId?: number, vehicleId?: number) => {
  if (tripId) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });

    if (!trip) {
      throw new ApiError(404, 'Trip not found');
    }
  }

  if (vehicleId) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });

    if (!vehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }
  }
};

const create = async (payload: CreateExpenseInput) => {
  await validateRelations(payload.tripId, payload.vehicleId);
  return prisma.expense.create({ data: payload });
};

const findAll = async () => {
  return prisma.expense.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const expense = await prisma.expense.findUnique({ where: { id } });

  if (!expense) {
    throw new ApiError(404, 'Expense not found');
  }

  return expense;
};

const update = async (id: number, payload: UpdateExpenseInput) => {
  await findById(id);
  await validateRelations(payload.tripId, payload.vehicleId);

  return prisma.expense.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.expense.delete({ where: { id } });
};

export const expenseService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
