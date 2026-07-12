import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateRolePermissionInput } from './rolepermissions.validation.js';

const create = async (payload: CreateRolePermissionInput) => {
  const role = await prisma.role.findUnique({ where: { id: payload.roleId } });
  if (!role) {
    throw new ApiError(404, 'Role not found');
  }

  const permission = await prisma.permission.findUnique({ where: { id: payload.permissionId } });
  if (!permission) {
    throw new ApiError(404, 'Permission not found');
  }

  const existingAssignment = await prisma.rolePermission.findUnique({
    where: {
      roleId_permissionId: {
        roleId: payload.roleId,
        permissionId: payload.permissionId
      }
    }
  });

  if (existingAssignment) {
    throw new ApiError(409, 'Role permission assignment already exists');
  }

  return prisma.rolePermission.create({ data: payload });
};

const findAll = async () => {
  return prisma.rolePermission.findMany({
    include: {
      role: true,
      permission: true
    },
    orderBy: [{ roleId: 'asc' }, { permissionId: 'asc' }]
  });
};

const findByIds = async (roleId: number, permissionId: number) => {
  const assignment = await prisma.rolePermission.findUnique({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId
      }
    }
  });

  if (!assignment) {
    throw new ApiError(404, 'Role permission assignment not found');
  }

  return assignment;
};

const remove = async (roleId: number, permissionId: number) => {
  await findByIds(roleId, permissionId);
  await prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId
      }
    }
  });
};

export const rolePermissionService = {
  create,
  findAll,
  findByIds,
  delete: remove
};
