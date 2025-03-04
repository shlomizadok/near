import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to NEAR Framework
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              A modern full-stack framework built with Node.js, Express, Apollo GraphQL, and React
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{ mr: 2 }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 