import { Router } from 'express';
import { driverDocumentController } from './driverdocument.controllers.js';

const driverDocumentRouter = Router();

driverDocumentRouter.get('/', driverDocumentController.findAll);
driverDocumentRouter.get('/:id', driverDocumentController.findById);
driverDocumentRouter.post('/', driverDocumentController.create);
driverDocumentRouter.patch('/:id', driverDocumentController.update);
driverDocumentRouter.delete('/:id', driverDocumentController.delete);

export { driverDocumentRouter };
