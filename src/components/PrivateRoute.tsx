// src/components/PrivateRoute.tsx

import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige a la página de login
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
