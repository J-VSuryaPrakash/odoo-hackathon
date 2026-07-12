import { Router } from 'express';
import { usersController } from './users.controllers.js';

const usersRouter = Router();

usersRouter.get('/', usersController.findAll);
usersRouter.get('/:id', usersController.findById);
usersRouter.post('/', usersController.create);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export { usersRouter };
