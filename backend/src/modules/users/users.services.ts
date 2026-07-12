import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateUsersInput, UpdateUsersInput } from './users.validation.js';

const create = async (payload: CreateUsersInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email }
  });

  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  return prisma.user.create({ data: payload });
};

const findAll = async () => {
  return prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      roleId: true,
      status: true,
      failedAttempts: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

const findById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      roleId: true,
      status: true,
      failedAttempts: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

const update = async (id: number, payload: UpdateUsersInput) => {
  await findById(id);

  if (payload.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email }
    });

    if (existingUser && existingUser.id !== id) {
      throw new ApiError(409, 'Email already exists');
    }
  }

  return prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      roleId: true,
      status: true,
      failedAttempts: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.user.delete({ where: { id } });
};

export const usersService = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
