import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { rolePermissionService } from './rolepermissions.services.js';
import { createRolePermissionSchema } from './rolepermissions.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createRolePermissionSchema.parse(req.body);
    const assignment = await rolePermissionService.create(payload);

    return res.status(201).json(new ApiResponse(201, assignment, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await rolePermissionService.findAll();

    return res.status(200).json(new ApiResponse(200, assignments, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ roleId: string; permissionId: string }>, res: Response, next: NextFunction) => {
  try {
    const roleId = parseEntityId(req.params.roleId, 'role');
    const permissionId = parseEntityId(req.params.permissionId, 'permission');
    await rolePermissionService.delete(roleId, permissionId);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const rolePermissionController = {
  create,
  findAll,
  delete: remove
};
