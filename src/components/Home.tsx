// src/components/Home.tsx

import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Box,
  Input,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Constants, TOKEN } from '../constants/constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Accedemos al logout del contexto
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = (): void => {
    logout(); // Eliminamos el token y cerramos sesión
    navigate('/');
  };

  // Maneja el cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Maneja el upload del archivo
  const handleFileUpload = async () => {
    if (!file) {
      setMessage('No hay archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage(''); // Limpiar mensaje anterior

    try {
      const apiUrl = Constants.apiBaseUrl;
      const response = await axios.post(
        `${apiUrl}/documents/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
          },
          withCredentials: true,
        }
      );
      console.log('respuesta', response.data);
      setMessage('Archivo subido correctamente.');
    } catch (err) {
      console.error(err);
      setMessage('Error al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido a la Página de Inicio!
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <h2>Subir archivo PDF o JSON</h2>
          <Input
            type="file"
            inputProps={{
              'aria-label': 'Seleccionar archivo',
              accept: '.pdf,.json',
            }} // Aceptar solo .pdf y .json
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            onClick={handleFileUpload}
            disabled={!file || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Subir'}
          </Button>
          {message && <Box mt={2}>{message}</Box>}
        </Box>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
