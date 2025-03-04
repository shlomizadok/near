import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

interface ExtendedError extends Error {
  status?: number;
  code?: number;
  keyPattern?: Record<string, any>;
}

const errorHandler = (
  err: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (err instanceof MongooseError.ValidationError) {
    res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(error => error.message),
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token',
    });
    return;
  }

  if (err instanceof MongoError && err.code === 11000) {
    res.status(400).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern || {}).join(', '),
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