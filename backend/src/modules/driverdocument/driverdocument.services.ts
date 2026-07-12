import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type {
  CreateDriverDocumentInput,
  UpdateDriverDocumentInput
} from './driverdocument.validation.js';

const validateDriver = async (driverId: number) => {
  const driver = await prisma.driver.findUnique({ where: { id: driverId } });

  if (!driver) {
    throw new ApiError(404, 'Driver not found');
  }
};

const create = async (payload: CreateDriverDocumentInput) => {
  await validateDriver(payload.driverId);
  return prisma.driverDocument.create({ data: payload });
};

const findAll = async () => {
  return prisma.driverDocument.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const document = await prisma.driverDocument.findUnique({ where: { id } });

  if (!document) {
    throw new ApiError(404, 'Driver document not found');
  }

  return document;
};

const update = async (id: number, payload: UpdateDriverDocumentInput) => {
  await findById(id);

  if (payload.driverId) {
    await validateDriver(payload.driverId);
  }

  return prisma.driverDocument.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.driverDocument.delete({ where: { id } });
};

export const driverDocumentService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
