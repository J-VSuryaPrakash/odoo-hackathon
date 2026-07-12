import { Router } from 'express';
import { vehicleController } from './vehicle.controllers.js';

const vehicleRouter = Router();

vehicleRouter.get('/', vehicleController.findAll);
vehicleRouter.get('/:id', vehicleController.findById);
vehicleRouter.post('/', vehicleController.create);
vehicleRouter.patch('/:id', vehicleController.update);
vehicleRouter.delete('/:id', vehicleController.delete);

export { vehicleRouter };
