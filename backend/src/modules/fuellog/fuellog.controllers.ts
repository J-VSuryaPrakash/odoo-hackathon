import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { fuelLogService } from './fuellog.services.js';
import { createFuelLogSchema, updateFuelLogSchema } from './fuellog.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createFuelLogSchema.parse(req.body);
    const fuelLog = await fuelLogService.create(payload);

    return res.status(201).json(new ApiResponse(201, fuelLog, 'Fuel log created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const fuelLogs = await fuelLogService.findAll();

    return res.status(200).json(new ApiResponse(200, fuelLogs, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'fuel log');
    const fuelLog = await fuelLogService.findById(id);

    return res.status(200).json(new ApiResponse(200, fuelLog, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'fuel log');
    const payload = updateFuelLogSchema.parse(req.body);
    const fuelLog = await fuelLogService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, fuelLog, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'fuel log');
    await fuelLogService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const fuelLogController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
