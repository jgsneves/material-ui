import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../containers/login';

const PublicRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
