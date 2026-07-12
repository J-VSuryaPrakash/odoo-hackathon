import { Router } from 'express';
import { permissionController } from './permission.controllers.js';

const permissionRouter = Router();

permissionRouter.get('/', permissionController.findAll);
permissionRouter.get('/:id', permissionController.findById);
permissionRouter.post('/', permissionController.create);
permissionRouter.patch('/:id', permissionController.update);
permissionRouter.delete('/:id', permissionController.delete);

export { permissionRouter };
