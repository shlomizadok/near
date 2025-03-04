import { Request } from 'express';
import { Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: UserDocument;
  token?: string;
}

export interface Context {
  req: AuthRequest;
  user?: UserDocument;
}

export interface AuthPayload {
  token: string;
  user: UserDocument;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  name: string;
} 