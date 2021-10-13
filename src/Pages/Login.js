import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { login, useAuthState, useAuthDispatch } from '../Context';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(dispatch, { email, password });
      if (!response.user) return;
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage && (
          <Typography>{errorMessage}</Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
                Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired
};

export default Login;