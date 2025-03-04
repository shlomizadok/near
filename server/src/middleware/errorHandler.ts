import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

interface ExtendedError extends Error {
  status?: number;
  code?: string | number;
}

const errorHandler = (
  err: ExtendedError,
  req: Request,
  res: Response,
  _next: NextFunction // Prefix with underscore to indicate it's intentionally unused
): void => {
  logger.error(err.stack || err.message);

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Unique constraint violation
        res.status(400).json({
          message: 'Duplicate entry error',
          fields: err.meta?.target,
        });
        return;
      case 'P2025': // Record not found
        res.status(404).json({
          message: 'Record not found',
        });
        return;
      default:
        res.status(400).json({
          message: 'Database error',
          code: err.code,
        });
        return;
    }
  }

  // Handle validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      message: 'Validation Error',
      details: err.message,
    });
    return;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: 'Token expired',
    });
    return;
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
