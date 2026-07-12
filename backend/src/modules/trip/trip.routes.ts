import { Router } from 'express';
import { tripController } from './trip.controllers.js';

const tripRouter = Router();

tripRouter.get('/', tripController.findAll);
tripRouter.get('/:id', tripController.findById);
tripRouter.post('/', tripController.create);
tripRouter.patch('/:id', tripController.update);
tripRouter.patch('/:id/dispatch', tripController.dispatch);
tripRouter.patch('/:id/complete', tripController.complete);
tripRouter.delete('/:id', tripController.delete);

export { tripRouter };
