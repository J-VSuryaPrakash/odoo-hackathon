import { Router } from 'express';
import { rolePermissionController } from './rolepermissions.controllers.js';

const rolePermissionRouter = Router();

rolePermissionRouter.get('/', rolePermissionController.findAll);
rolePermissionRouter.post('/', rolePermissionController.create);
rolePermissionRouter.delete('/:roleId/:permissionId', rolePermissionController.delete);

export { rolePermissionRouter };
