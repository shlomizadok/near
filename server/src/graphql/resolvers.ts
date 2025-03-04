import { AuthenticationError, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { generateToken } from '../middleware/auth';
import { Context, LoginInput, SignupInput } from '../types';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { req }: Context) => {
      if (!req.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return req.user;
    },
    users: async (_: any, __: any, { req, prisma }: Context) => {
      if (!req.user || req.user.role !== Role.ADMIN) {
        throw new AuthenticationError('Not authorized');
      }
      return prisma.user.findMany();
    },
  },

  Mutation: {
    signup: async (_: any, { email, password, name }: SignupInput, { prisma }: Context) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new UserInputError('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
            role: Role.USER,
          },
        });

        const token = generateToken(user.id);

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    login: async (_: any, { email, password }: LoginInput, { prisma }: Context) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new UserInputError('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new UserInputError('Invalid email or password');
        }

        const token = generateToken(user.id);

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};
