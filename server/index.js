require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/database');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add authentication and context here
      return { req };
    },
    formatError: (error) => {
      // Log error for monitoring
      console.error('GraphQL Error:', error);
      
      // Return user-friendly error
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Handle React routing in production
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // Error handling middleware
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer().catch(console.error);
