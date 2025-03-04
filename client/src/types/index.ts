export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
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

export interface FormError {
  message: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  lastActivity: string;
}

// Apollo GraphQL types
export interface QueryResponse<T> {
  loading: boolean;
  error?: Error;
  data?: T;
}

export interface MutationResponse<T> {
  loading: boolean;
  error?: Error;
  data?: T;
} 