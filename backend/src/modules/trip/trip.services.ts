import { prisma } from '../../DB/prisma.js';
import { ApiError } from '../../utils/apiError.js';
import type { CreateTripInput, UpdateTripInput } from './trip.validation.js';

const validateTripAssignments = async (
  vehicleId?: number,
  driverId?: number,
  cargoWeight?: number
) => {
  let vehicle: Awaited<ReturnType<typeof prisma.vehicle.findUnique>> = null;
  let driver: Awaited<ReturnType<typeof prisma.driver.findUnique>> = null;

  if (vehicleId) {
    vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });

    if (!vehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }

    if (vehicle.status !== 'AVAILABLE') {
      throw new ApiError(400, 'Vehicle is not available');
    }
  }

  if (driverId) {
    driver = await prisma.driver.findUnique({ where: { id: driverId } });

    if (!driver) {
      throw new ApiError(404, 'Driver not found');
    }

    if (driver.status !== 'AVAILABLE') {
      throw new ApiError(400, 'Driver is not available');
    }

    if (driver.licenseExpiry && driver.licenseExpiry < new Date()) {
      throw new ApiError(400, 'Driver license has expired');
    }
  }

  if (vehicle && cargoWeight && vehicle.capacityKg !== null && cargoWeight > Number(vehicle.capacityKg)) {
    throw new ApiError(400, 'Cargo weight exceeds vehicle capacity');
  }
};

const findById = async (id: number) => {
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    throw new ApiError(404, 'Trip not found');
  }

  return trip;
};

const create = async (payload: CreateTripInput) => {
  await validateTripAssignments(payload.vehicleId, payload.driverId, payload.cargoWeight);
  return prisma.trip.create({ data: payload });
};

const findAll = async () => {
  return prisma.trip.findMany({ orderBy: { id: 'asc' } });
};

const update = async (id: number, payload: UpdateTripInput) => {
  const existingTrip = await findById(id);
  const vehicleId = payload.vehicleId ?? existingTrip.vehicleId ?? undefined;
  const driverId = payload.driverId ?? existingTrip.driverId ?? undefined;
  const cargoWeight = payload.cargoWeight ?? (existingTrip.cargoWeight ? Number(existingTrip.cargoWeight) : undefined);

  await validateTripAssignments(vehicleId, driverId, cargoWeight);

  return prisma.trip.update({
    where: { id },
    data: payload
  });
};

const dispatch = async (id: number) => {
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    throw new ApiError(404, 'Trip not found');
  }

  if (trip.status !== 'DRAFT') {
    throw new ApiError(400, 'Only draft trips can be dispatched');
  }

  if (!trip.vehicleId || !trip.driverId) {
    throw new ApiError(400, 'Vehicle and driver are required for dispatch');
  }

  await validateTripAssignments(
    trip.vehicleId,
    trip.driverId,
    trip.cargoWeight !== null ? Number(trip.cargoWeight) : undefined
  );

  const [dispatchedTrip] = await prisma.$transaction([
    prisma.trip.update({
      where: { id },
      data: {
        status: 'DISPATCHED',
        dispatchTime: new Date()
      }
    }),
    prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: 'ON_TRIP' }
    }),
    prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: 'ON_TRIP' }
    })
  ]);

  return dispatchedTrip;
};

const complete = async (id: number) => {
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    throw new ApiError(404, 'Trip not found');
  }

  if (trip.status !== 'DISPATCHED') {
    throw new ApiError(400, 'Only dispatched trips can be completed');
  }

  if (!trip.vehicleId || !trip.driverId) {
    throw new ApiError(400, 'Vehicle and driver are required for completion');
  }

  const [completedTrip] = await prisma.$transaction([
    prisma.trip.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        arrivalTime: new Date()
      }
    }),
    prisma.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: 'AVAILABLE' }
    }),
    prisma.driver.update({
      where: { id: trip.driverId },
      data: { status: 'AVAILABLE' }
    })
  ]);

  return completedTrip;
};

const remove = async (id: number) => {
  await findById(id);
  await prisma.trip.delete({ where: { id } });
};

export const tripService = {
  create,
  findAll,
  findById,
  update,
  dispatch,
  complete,
  delete: remove
};
