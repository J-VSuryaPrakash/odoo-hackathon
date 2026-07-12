import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateVehicleInput, UpdateVehicleInput } from './vehicle.validation.js';

const create = async (payload: CreateVehicleInput) => {
  const existingVehicle = await prisma.vehicle.findUnique({
    where: { registrationNo: payload.registrationNo }
  });

  if (existingVehicle) {
    throw new ApiError(409, 'Registration number already exists');
  }

  return prisma.vehicle.create({ data: payload });
};

const findAll = async () => {
  return prisma.vehicle.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found');
  }

  return vehicle;
};

const update = async (id: number, payload: UpdateVehicleInput) => {
  await findById(id);

  if (payload.registrationNo) {
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { registrationNo: payload.registrationNo }
    });

    if (existingVehicle && existingVehicle.id !== id) {
      throw new ApiError(409, 'Registration number already exists');
    }
  }

  return prisma.vehicle.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.vehicle.delete({ where: { id } });
};

export const vehicleService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
