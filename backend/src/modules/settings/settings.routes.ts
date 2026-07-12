import { Router } from 'express';
import { settingsController } from './settings.controllers.js';

const settingsRouter = Router();

settingsRouter.get('/', settingsController.findAll);
settingsRouter.get('/:id', settingsController.findById);
settingsRouter.post('/', settingsController.create);
settingsRouter.patch('/:id', settingsController.update);
settingsRouter.delete('/:id', settingsController.delete);

export { settingsRouter };
