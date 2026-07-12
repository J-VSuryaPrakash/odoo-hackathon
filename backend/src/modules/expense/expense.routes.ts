import { Router } from 'express';
import { expenseController } from './expense.controllers.js';

const expenseRouter = Router();

expenseRouter.get('/', expenseController.findAll);
expenseRouter.get('/:id', expenseController.findById);
expenseRouter.post('/', expenseController.create);
expenseRouter.patch('/:id', expenseController.update);
expenseRouter.delete('/:id', expenseController.delete);

export { expenseRouter };
