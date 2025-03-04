# NEAR Framework

A modern full-stack TypeScript framework built with React, Node.js, GraphQL, and PostgreSQL.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/near.git
cd near

# Install dependencies
yarn install

# Set up environment variables
cp client/.env.example client/.env
cp server/.env.example server/.env

# Start development environment
docker-compose up
```

## 🏗 Tech Stack

### Frontend

- React with TypeScript
- Apollo Client for GraphQL
- Tailwind CSS for styling
- React Router for navigation
- Jest & React Testing Library

### Backend

- Node.js with TypeScript
- Express
- Apollo Server
- Prisma ORM
- PostgreSQL
- Redis for caching
- Jest for testing

## 📁 Project Structure

```
near/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── graphql/      # GraphQL queries and mutations
│   │   └── types/        # TypeScript type definitions
│   └── ...
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── resolvers/    # GraphQL resolvers
│   │   ├── schemas/      # GraphQL type definitions
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── ...
└── ...
```

## 🛠 Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Yarn

### Available Scripts

#### Root Directory

```bash
yarn start          # Start both client and server
yarn test          # Run all tests
yarn lint          # Lint all files
yarn build         # Build both client and server
```

#### Client

```bash
yarn dev           # Start development server
yarn build         # Build for production
yarn test          # Run tests
yarn lint          # Lint code
```

#### Server

```bash
yarn dev           # Start development server
yarn build         # Build for production
yarn test          # Run tests
yarn lint          # Lint code
yarn db:migrate    # Run database migrations
yarn db:seed       # Seed database
yarn db:studio     # Open Prisma Studio
```

### Development Workflow

1. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit using conventional commits:

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug issue"
   ```

3. Push your changes and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Environment Variables

#### Client (.env)

- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_GRAPHQL_URL`: GraphQL endpoint
- `REACT_APP_WS_URL`: WebSocket URL for subscriptions

#### Server (.env)

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret for JWT tokens
- `PORT`: Server port number

## 🧪 Testing

We use Jest for both frontend and backend testing:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## 📦 Deployment

The project includes GitHub Actions workflows for CI/CD:

- `ci.yml`: Runs on every pull request

  - Linting
  - Type checking
  - Unit tests
  - Build verification

- `cd.yml`: Runs on main branch
  - Builds Docker images
  - Pushes to ECR
  - Deploys to ECS

## 🔍 Code Quality

We maintain code quality through:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Husky for pre-commit hooks
- Jest for testing
- GitHub Actions for CI/CD

## 📚 Additional Documentation

- [Frontend Documentation](./client/README.md)
- [Backend Documentation](./server/README.md)
- [API Documentation](./server/docs/API.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
