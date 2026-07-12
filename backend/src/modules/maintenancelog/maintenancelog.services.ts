import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type {
  CreateMaintenanceLogInput,
  UpdateMaintenanceLogInput
} from './maintenancelog.validation.js';

const findById = async (id: number) => {
  const maintenanceLog = await prisma.maintenanceLog.findUnique({ where: { id } });

  if (!maintenanceLog) {
    throw new ApiError(404, 'Maintenance log not found');
  }

  return maintenanceLog;
};

const create = async (payload: CreateMaintenanceLogInput) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: payload.vehicleId } });

  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found');
  }

  const data = {
    ...payload,
    status: 'IN_SHOP' as const
  };

  const [maintenanceLog] = await prisma.$transaction([
    prisma.maintenanceLog.create({ data }),
    prisma.vehicle.update({
      where: { id: payload.vehicleId },
      data: { status: 'IN_SHOP' }
    })
  ]);

  return maintenanceLog;
};

const findAll = async () => {
  return prisma.maintenanceLog.findMany({ orderBy: { id: 'asc' } });
};

const update = async (id: number, payload: UpdateMaintenanceLogInput) => {
  const existingLog = await findById(id);

  if (payload.vehicleId) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: payload.vehicleId } });

    if (!vehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }
  }

  if (payload.status) {
    const vehicleId = payload.vehicleId ?? existingLog.vehicleId;

    if (!vehicleId) {
      throw new ApiError(400, 'Vehicle is required to update maintenance status');
    }

    const vehicleStatus = payload.status === 'IN_SHOP' ? 'IN_SHOP' : 'AVAILABLE';

    const [maintenanceLog] = await prisma.$transaction([
      prisma.maintenanceLog.update({
        where: { id },
        data: payload
      }),
      prisma.vehicle.update({
        where: { id: vehicleId },
        data: { status: vehicleStatus }
      })
    ]);

    return maintenanceLog;
  }

  return prisma.maintenanceLog.update({
    where: { id },
    data: payload
  });
};

const close = async (id: number) => {
  const maintenanceLog = await findById(id);

  if (!maintenanceLog.vehicleId) {
    throw new ApiError(400, 'Vehicle is required to close maintenance log');
  }

  const [updatedLog] = await prisma.$transaction([
    prisma.maintenanceLog.update({
      where: { id },
      data: { status: 'AVAILABLE' }
    }),
    prisma.vehicle.update({
      where: { id: maintenanceLog.vehicleId },
      data: { status: 'AVAILABLE' }
    })
  ]);

  return updatedLog;
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.maintenanceLog.delete({ where: { id } });
};

export const maintenanceLogService = {
  create,
  findAll,
  findById,
  update,
  close,
  delete: remove
};
