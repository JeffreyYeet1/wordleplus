// middleware/logging.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Logs requests
export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Logging middleware hit");
  next(); // Proceed to the next middleware or route handler
};
