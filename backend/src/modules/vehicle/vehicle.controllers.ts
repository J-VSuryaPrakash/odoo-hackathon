import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { vehicleService } from './vehicle.services.js';
import { createVehicleSchema, updateVehicleSchema } from './vehicle.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createVehicleSchema.parse(req.body);
    const vehicle = await vehicleService.create(payload);

    return res.status(201).json(new ApiResponse(201, vehicle, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await vehicleService.findAll();

    return res.status(200).json(new ApiResponse(200, vehicles, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'vehicle');
    const vehicle = await vehicleService.findById(id);

    return res.status(200).json(new ApiResponse(200, vehicle, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'vehicle');
    const payload = updateVehicleSchema.parse(req.body);
    const vehicle = await vehicleService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, vehicle, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'vehicle');
    await vehicleService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const vehicleController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
