import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../constants/constants';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiUrl = Constants.apiBaseUrl;

  const autorizarCiudadania = async () => {
    const params = Object.fromEntries(searchParams.entries());

    console.log('Parametros de la URL:', params);
    if (Object.keys(params).length === 0) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/auth/callback`, {
        params,
        withCredentials: true,
      });
      console.log('Respuesta del callback:', response);

      if (response?.data?.url) {
        navigate(response.data.url);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log('Error al autorizar la ciudadanía:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    autorizarCiudadania();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Callback;
