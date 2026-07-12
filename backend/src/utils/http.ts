import { ApiError } from './apiError.js';

const parseEntityId = (value: string, entityName: string): number => {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, `Invalid ${entityName} id`);
  }

  return id;
};

export { parseEntityId };
