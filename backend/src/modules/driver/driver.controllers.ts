import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { driverService } from './driver.services.js';
import { createDriverSchema, updateDriverSchema } from './driver.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createDriverSchema.parse(req.body);
    const driver = await driverService.create(payload);

    return res.status(201).json(new ApiResponse(201, driver, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await driverService.findAll();

    return res.status(200).json(new ApiResponse(200, drivers, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver');
    const driver = await driverService.findById(id);

    return res.status(200).json(new ApiResponse(200, driver, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver');
    const payload = updateDriverSchema.parse(req.body);
    const driver = await driverService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, driver, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver');
    await driverService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const driverController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};