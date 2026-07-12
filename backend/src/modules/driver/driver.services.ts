import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateDriverInput, UpdateDriverInput } from './driver.validation.js';

const create = async (payload: CreateDriverInput) => {
  if (payload.licenseNumber) {
    const existingDriver = await prisma.driver.findUnique({
      where: { licenseNumber: payload.licenseNumber }
    });

    if (existingDriver) {
      throw new ApiError(409, 'License number already exists');
    }
  }

  return prisma.driver.create({ data: payload });
};

const findAll = async () => {
  return prisma.driver.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const driver = await prisma.driver.findUnique({ where: { id } });

  if (!driver) {
    throw new ApiError(404, 'Driver not found');
  }

  return driver;
};

const update = async (id: number, payload: UpdateDriverInput) => {
  await findById(id);

  if (payload.licenseNumber) {
    const existingDriver = await prisma.driver.findUnique({
      where: { licenseNumber: payload.licenseNumber }
    });

    if (existingDriver && existingDriver.id !== id) {
      throw new ApiError(409, 'License number already exists');
    }
  }

  return prisma.driver.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.driver.delete({ where: { id } });
};

export const driverService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};