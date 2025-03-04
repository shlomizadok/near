import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.login.token);
      navigate('/dashboard');
    },
    onError: error => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <div className="mt-8 container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
            {error && <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <button type="submit" className="w-full btn-primary">
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <Link to="/signup" className="text-primary-600 hover:text-primary-700">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
