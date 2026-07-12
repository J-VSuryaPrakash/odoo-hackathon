import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateFuelLogInput, UpdateFuelLogInput } from './fuellog.validation.js';

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

const create = async (payload: CreateFuelLogInput) => {
  await validateRelations(payload.tripId, payload.vehicleId);
  return prisma.fuelLog.create({ data: payload });
};

const findAll = async () => {
  return prisma.fuelLog.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const fuelLog = await prisma.fuelLog.findUnique({ where: { id } });

  if (!fuelLog) {
    throw new ApiError(404, 'Fuel log not found');
  }

  return fuelLog;
};

const update = async (id: number, payload: UpdateFuelLogInput) => {
  await findById(id);
  await validateRelations(payload.tripId, payload.vehicleId);

  return prisma.fuelLog.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.fuelLog.delete({ where: { id } });
};

export const fuelLogService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
