import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreatePermissionInput, UpdatePermissionInput } from './permission.validation.js';

const create = async (payload: CreatePermissionInput) => {
  const existingPermission = await prisma.permission.findUnique({
    where: { permissionName: payload.permissionName }
  });

  if (existingPermission) {
    throw new ApiError(409, 'Permission name already exists');
  }

  return prisma.permission.create({ data: payload });
};

const findAll = async () => {
  return prisma.permission.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const permission = await prisma.permission.findUnique({ where: { id } });

  if (!permission) {
    throw new ApiError(404, 'Permission not found');
  }

  return permission;
};

const update = async (id: number, payload: UpdatePermissionInput) => {
  await findById(id);

  if (payload.permissionName) {
    const existingPermission = await prisma.permission.findUnique({
      where: { permissionName: payload.permissionName }
    });

    if (existingPermission && existingPermission.id !== id) {
      throw new ApiError(409, 'Permission name already exists');
    }
  }

  return prisma.permission.update({
    where: { id },
    data: payload
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.permission.delete({ where: { id } });
};

export const permissionService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
