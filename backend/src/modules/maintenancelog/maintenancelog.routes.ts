import { Router } from 'express';
import { maintenanceLogController } from './maintenancelog.controllers.js';

const maintenanceLogRouter = Router();

maintenanceLogRouter.get('/', maintenanceLogController.findAll);
maintenanceLogRouter.get('/:id', maintenanceLogController.findById);
maintenanceLogRouter.post('/', maintenanceLogController.create);
maintenanceLogRouter.patch('/:id', maintenanceLogController.update);
maintenanceLogRouter.patch('/:id/close', maintenanceLogController.close);
maintenanceLogRouter.delete('/:id', maintenanceLogController.delete);

export { maintenanceLogRouter };
