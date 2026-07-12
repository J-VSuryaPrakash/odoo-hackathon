import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { maintenanceLogService } from './maintenancelog.services.js';
import {
  createMaintenanceLogSchema,
  updateMaintenanceLogSchema
} from './maintenancelog.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createMaintenanceLogSchema.parse(req.body);
    const maintenanceLog = await maintenanceLogService.create(payload);

    return res
      .status(201)
      .json(new ApiResponse(201, maintenanceLog, 'Maintenance log created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const maintenanceLogs = await maintenanceLogService.findAll();

    return res.status(200).json(new ApiResponse(200, maintenanceLogs, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'maintenance log');
    const maintenanceLog = await maintenanceLogService.findById(id);

    return res.status(200).json(new ApiResponse(200, maintenanceLog, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'maintenance log');
    const payload = updateMaintenanceLogSchema.parse(req.body);
    const maintenanceLog = await maintenanceLogService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, maintenanceLog, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const close = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'maintenance log');
    const maintenanceLog = await maintenanceLogService.close(id);

    return res
      .status(200)
      .json(new ApiResponse(200, maintenanceLog, 'Maintenance log closed successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'maintenance log');
    await maintenanceLogService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const maintenanceLogController = {
  create,
  findAll,
  findById,
  update,
  close,
  delete: remove
};
