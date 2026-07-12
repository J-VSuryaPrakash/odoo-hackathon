import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { permissionService } from './permission.services.js';
import { createPermissionSchema, updatePermissionSchema } from './permission.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createPermissionSchema.parse(req.body);
    const permission = await permissionService.create(payload);

    return res.status(201).json(new ApiResponse(201, permission, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await permissionService.findAll();

    return res.status(200).json(new ApiResponse(200, permissions, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'permission');
    const permission = await permissionService.findById(id);

    return res.status(200).json(new ApiResponse(200, permission, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'permission');
    const payload = updatePermissionSchema.parse(req.body);
    const permission = await permissionService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, permission, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'permission');
    await permissionService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const permissionController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
