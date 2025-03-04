import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_USER_DATA = gql`
  query GetUserData {
    me {
      id
      name
      email
      role
    }
  }
`;

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {data.me.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-primary-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-2">Profile Information</h2>
            <div className="space-y-2">
              <p className="text-primary-700">
                <span className="font-medium">Email:</span> {data.me.email}
              </p>
              <p className="text-primary-700">
                <span className="font-medium">Role:</span> {data.me.role}
              </p>
            </div>
          </div>
          {/* Add more dashboard widgets here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
