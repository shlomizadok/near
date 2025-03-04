import { Request } from 'express';
import { PrismaClient, User } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: User;
  token?: string;
}

export interface Context {
  req: AuthRequest;
  user?: User;
  prisma: PrismaClient;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  name: string;
}
