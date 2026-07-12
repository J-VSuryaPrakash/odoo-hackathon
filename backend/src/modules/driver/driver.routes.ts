import { Router } from 'express';
import { driverController } from './driver.controllers.js';

const driverRouter = Router();

driverRouter.get('/', driverController.findAll);
driverRouter.get('/:id', driverController.findById);
driverRouter.post('/', driverController.create);
driverRouter.patch('/:id', driverController.update);
driverRouter.delete('/:id', driverController.delete);

export { driverRouter };