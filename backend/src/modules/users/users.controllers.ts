import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { usersService } from './users.services.js';
import { createUsersSchema, updateUsersSchema } from './users.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createUsersSchema.parse(req.body);
    const user = await usersService.create(payload);

    return res.status(201).json(new ApiResponse(201, user, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.findAll();

    return res.status(200).json(new ApiResponse(200, users, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'user');
    const user = await usersService.findById(id);

    return res.status(200).json(new ApiResponse(200, user, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'user');
    const payload = updateUsersSchema.parse(req.body);
    const user = await usersService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, user, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'user');
    await usersService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const usersController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
