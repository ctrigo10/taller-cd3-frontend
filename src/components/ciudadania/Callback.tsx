import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../constants/constants';
import { useAuth } from '../../contexts/AuthContext';

const Callback: React.FC = () => {
  const { login } = useAuth(); // Accedemos al contexto
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiUrl = Constants.apiBaseUrl;

  const autorizarCiudadania = async () => {
    const params = Object.fromEntries(searchParams.entries());

    if (!Object.keys(params).length) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/auth/callback`, {
        params,
        withCredentials: true,
      });

      console.log('[Callback] Respuesta recibida:', response.data);
      if (!response.data.accessToken) {
        throw new Error('Credenciales incorrectas');
      }

      login(response.data.accessToken); // Guardamos el token en el contexto
      navigate('/home');
    } catch (error) {
      console.error(
        '[Callback] Error al autorizar la ciudadanía:',
        error
      );
      navigate('/');
    }
  };

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    autorizarCiudadania();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Callback;
