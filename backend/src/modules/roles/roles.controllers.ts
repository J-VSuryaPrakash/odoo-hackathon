import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { roleService } from './roles.services.js';
import { createRoleSchema, updateRoleSchema } from './roles.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createRoleSchema.parse(req.body);
    const role = await roleService.create(payload);

    return res.status(201).json(new ApiResponse(201, role, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await roleService.findAll();

    return res.status(200).json(new ApiResponse(200, roles, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'role');
    const role = await roleService.findById(id);

    return res.status(200).json(new ApiResponse(200, role, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'role');
    const payload = updateRoleSchema.parse(req.body);
    const role = await roleService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, role, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'role');
    await roleService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const roleController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
