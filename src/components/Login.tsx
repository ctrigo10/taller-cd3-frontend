import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Constants } from '../constants/constants';
import axios from 'axios';

const Login: React.FC = () => {
  const { login } = useAuth(); // Accedemos al contexto
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const apiUrl = Constants.apiBaseUrl;

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Simulación de la solicitud al backend
    try {
      const response = await axios.post(`${apiUrl}/api/auth/signin`, {
        username,
        password
      });

      if (!response.data) {
        throw new Error('Credenciales incorrectas');
      }

      login(response.data.accessToken); // Guardamos el token en el contexto
      navigate('/home');
    } catch (error) {
      console.log(error);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Usuario"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
