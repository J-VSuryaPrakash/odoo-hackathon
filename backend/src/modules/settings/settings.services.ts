import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateSettingsInput, UpdateSettingsInput } from './settings.validation.js';

const validateUpdater = async (updatedBy?: number) => {
  if (!updatedBy) {
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: updatedBy } });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
};

const create = async (payload: CreateSettingsInput) => {
  await validateUpdater(payload.updatedBy);
  return prisma.setting.create({ data: payload });
};

const findAll = async () => {
  return prisma.setting.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const setting = await prisma.setting.findUnique({ where: { id } });

  if (!setting) {
    throw new ApiError(404, 'Setting not found');
  }

  return setting;
};

const update = async (id: number, payload: UpdateSettingsInput) => {
  await findById(id);
  await validateUpdater(payload.updatedBy);

  return prisma.setting.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.setting.delete({ where: { id } });
};

export const settingsService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
