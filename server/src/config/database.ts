import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Database Connected Successfully');
  } catch (error) {
    logger.error(`Error connecting to database: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { prisma };
export default connectDB;
