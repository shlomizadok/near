import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { User } from '../models/User';
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
    users: async (_: any, __: any, { req }: Context) => {
      if (!req.user || req.user.role !== 'admin') {
        throw new AuthenticationError('Not authorized');
      }
      return User.find({ isActive: true });
    },
  },

  Mutation: {
    signup: async (_: any, { email, password, name }: SignupInput) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new UserInputError('Email already exists');
        }

        const user = await User.create({
          email,
          password,
          name,
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

    login: async (_: any, { email, password }: LoginInput) => {
      try {
        const user = await User.findOne({ email, isActive: true });
        if (!user) {
          throw new UserInputError('Invalid email or password');
        }

        const isValidPassword = await user.comparePassword(password);
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