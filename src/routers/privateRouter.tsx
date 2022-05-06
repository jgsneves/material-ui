import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Users from '../containers/users';

const PrivateRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRouter;
