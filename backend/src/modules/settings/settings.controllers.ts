import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { settingsService } from './settings.services.js';
import { createSettingsSchema, updateSettingsSchema } from './settings.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createSettingsSchema.parse(req.body);
    const settings = await settingsService.create(payload);

    return res.status(201).json(new ApiResponse(201, settings, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await settingsService.findAll();

    return res.status(200).json(new ApiResponse(200, settings, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'setting');
    const setting = await settingsService.findById(id);

    return res.status(200).json(new ApiResponse(200, setting, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'setting');
    const payload = updateSettingsSchema.parse(req.body);
    const setting = await settingsService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, setting, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'setting');
    await settingsService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const settingsController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
