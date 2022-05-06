import React from 'react';
import { useAuthProvider } from '../contexts/authContext';
import PrivateRouter from './privateRouter';
import PublicRouter from './publicRouter';

const MainRouter: React.FC = () => {
  const { token } = useAuthProvider();

  if (token) {
    return <PrivateRouter />;
  }
  return <PublicRouter />;
};

export default MainRouter;
