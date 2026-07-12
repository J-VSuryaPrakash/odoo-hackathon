import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { driverRouter } from './modules/driver/driver.routes.js';
import { driverDocumentRouter } from './modules/driverdocument/driverdocument.routes.js';
import { expenseRouter } from './modules/expense/expense.routes.js';
import { fuelLogRouter } from './modules/fuellog/fuellog.routes.js';
import { maintenanceLogRouter } from './modules/maintenancelog/maintenancelog.routes.js';
import { permissionRouter } from './modules/permission/permission.routes.js';
import { settingsRouter } from './modules/settings/settings.routes.js';
import { tripRouter } from './modules/trip/trip.routes.js';
import { usersRouter } from './modules/users/users.routes.js';
import { vehicleRouter } from './modules/vehicle/vehicle.routes.js';
import { ApiError } from './utils/apiError.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/drivers', driverRouter);
app.use('/api/v1/driver-documents', driverDocumentRouter);
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/maintenance-logs', maintenanceLogRouter);
app.use('/api/v1/fuel-logs', fuelLogRouter);
app.use('/api/v1/expenses', expenseRouter);
app.use('/api/v1/permissions', permissionRouter);
app.use('/api/v1/settings', settingsRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));

    return res.status(400).json(new ApiError(400, 'Validation failed', formattedErrors));
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json(error);
  }

  return res.status(500).json(new ApiError(500, 'Internal server error'));
});

export default app;