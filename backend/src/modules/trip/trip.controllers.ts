import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../utils/apiResponse.js';
import { parseEntityId } from '../../utils/http.js';
import { tripService } from './trip.services.js';
import { createTripSchema, updateTripSchema } from './trip.validation.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createTripSchema.parse(req.body);
    const trip = await tripService.create(payload);

    return res.status(201).json(new ApiResponse(201, trip, 'Created successfully'));
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const trips = await tripService.findAll();

    return res.status(200).json(new ApiResponse(200, trips, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'trip');
    const trip = await tripService.findById(id);

    return res.status(200).json(new ApiResponse(200, trip, 'Retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'trip');
    const payload = updateTripSchema.parse(req.body);
    const trip = await tripService.update(id, payload);

    return res.status(200).json(new ApiResponse(200, trip, 'Updated successfully'));
  } catch (error) {
    next(error);
  }
};

const dispatch = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'trip');
    const trip = await tripService.dispatch(id);

    return res.status(200).json(new ApiResponse(200, trip, 'Trip dispatched successfully'));
  } catch (error) {
    next(error);
  }
};

const complete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'trip');
    const trip = await tripService.complete(id);

    return res.status(200).json(new ApiResponse(200, trip, 'Trip completed successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = parseEntityId(req.params.id, 'trip');
    await tripService.delete(id);

    return res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const tripController = {
  create,
  findAll,
  findById,
  update,
  dispatch,
  complete,
  delete: remove
};
