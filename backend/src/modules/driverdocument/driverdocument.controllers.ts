import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { driverDocumentService } from './driverdocument.services.js';
import {
  createDriverDocumentSchema,
  updateDriverDocumentSchema
} from './driverdocument.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createDriverDocumentSchema.parse(req.body);
    const driverDocument = await driverDocumentService.create(payload);

    return res.status(201).json(new ApiResponse(201, driverDocument, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const driverDocuments = await driverDocumentService.findAll();

    return res.status(200).json(new ApiResponse(200, driverDocuments, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver document');
    const driverDocument = await driverDocumentService.findById(id);

    return res.status(200).json(new ApiResponse(200, driverDocument, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver document');
    const payload = updateDriverDocumentSchema.parse(req.body);
    const driverDocument = await driverDocumentService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, driverDocument, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'driver document');
    await driverDocumentService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const driverDocumentController = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
