// src/components/Home.tsx

import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FileUploadForm from './FileUploadForm';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Accedemos al logout del contexto

  const handleLogout = (): void => {
    logout(); // Eliminamos el token y cerramos sesión
    navigate('/');
  };

  const handleFileUpload = (file: File) => {
    console.log('Archivo subido:', file.name);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido a la Página de Inicio!
        </Typography>
        <Box sx={{ m: 5 }}>
          <FileUploadForm onFileUpload={handleFileUpload} />
        </Box>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
