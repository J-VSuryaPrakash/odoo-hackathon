import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { expenseService } from './expense.services.js';
import { createExpenseSchema, updateExpenseSchema } from './expense.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createExpenseSchema.parse(req.body);
    const expense = await expenseService.create(payload);

    return res.status(201).json(new ApiResponse(201, expense, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await expenseService.findAll();

    return res.status(200).json(new ApiResponse(200, expenses, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'expense');
    const expense = await expenseService.findById(id);

    return res.status(200).json(new ApiResponse(200, expense, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'expense');
    const payload = updateExpenseSchema.parse(req.body);
    const expense = await expenseService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, expense, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'expense');
    await expenseService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const expenseController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
