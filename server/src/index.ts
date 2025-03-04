import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';

import connectDB, { prisma } from './config/database';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import errorHandler from './middleware/errorHandler';
import { Context } from './types';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  })
);
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

async function startApolloServer(): Promise<void> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }): Context => {
      return { req, prisma };
    },
    formatError: error => {
      // Log error for monitoring
      logger.error('GraphQL Error:', error);

      // Return user-friendly error
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  });

  // Handle React routing in production
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
  }

  // Error handling middleware
  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT}`);
    logger.info(`🚀 GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

startApolloServer().catch(error => logger.error('Server startup error:', error));
