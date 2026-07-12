import { Router } from 'express';
import { roleController } from './roles.controllers.js';

const roleRouter = Router();

roleRouter.get('/', roleController.findAll);
roleRouter.get('/:id', roleController.findById);
roleRouter.post('/', roleController.create);
roleRouter.patch('/:id', roleController.update);
roleRouter.delete('/:id', roleController.delete);

export { roleRouter };
