import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { User } from '../types';

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      role
      createdAt
    }
  }
`;

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery<{ me: User }>(ME_QUERY);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome, {data?.me.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This is your personal dashboard where you can manage your account and see your activity.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="body2" paragraph>
                Email: {data?.me.email}
              </Typography>
              <Typography variant="body2" paragraph>
                Role: {data?.me.role}
              </Typography>
              <Typography variant="body2">
                Member since: {new Date(data?.me.createdAt || '').toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2">
                No recent activity to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 