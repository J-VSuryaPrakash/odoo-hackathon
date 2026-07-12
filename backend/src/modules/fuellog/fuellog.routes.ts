import { Router } from 'express';
import { fuelLogController } from './fuellog.controllers.js';

const fuelLogRouter = Router();

fuelLogRouter.get('/', fuelLogController.findAll);
fuelLogRouter.get('/:id', fuelLogController.findById);
fuelLogRouter.post('/', fuelLogController.create);
fuelLogRouter.patch('/:id', fuelLogController.update);
fuelLogRouter.delete('/:id', fuelLogController.delete);

export { fuelLogRouter };
