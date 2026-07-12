import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateRoleInput, UpdateRoleInput } from './roles.validation.js';

const create = async (payload: CreateRoleInput) => {
  const existingRole = await prisma.role.findUnique({
    where: { roleName: payload.roleName }
  });

  if (existingRole) {
    throw new ApiError(409, 'Role name already exists');
  }

  return prisma.role.create({
    data: {
      roleName: payload.roleName,
      ...(payload.description !== undefined ? { description: payload.description } : {})
    }
  });
};

const findAll = async () => {
  return prisma.role.findMany({ orderBy: { id: 'asc' } });
};

const findById = async (id: number) => {
  const role = await prisma.role.findUnique({ where: { id } });

  if (!role) {
    throw new ApiError(404, 'Role not found');
  }

  return role;
};

const update = async (id: number, payload: UpdateRoleInput) => {
  await findById(id);

  if (payload.roleName) {
    const existingRole = await prisma.role.findUnique({
      where: { roleName: payload.roleName }
    });

    if (existingRole && existingRole.id !== id) {
      throw new ApiError(409, 'Role name already exists');
    }
  }

  const updateData: { roleName?: string; description?: string | null } = {};

  if (payload.roleName !== undefined) {
    updateData.roleName = payload.roleName;
  }

  if (payload.description !== undefined) {
    updateData.description = payload.description;
  }

  return prisma.role.update({
    where: { id },
    data: updateData
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.role.delete({ where: { id } });
};

export const roleService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
