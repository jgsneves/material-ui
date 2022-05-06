import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

import { useAuthProvider } from '../../contexts/authContext';

const Menu: React.FC = () => {
  const { setToken } = useAuthProvider();
  return (
    <Stack spacing={3} height="100vh" p={3}>
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/3/3d/Twitter_logo_2012.svg/1267px-Twitter_logo_2012.svg.png"
        alt="logo"
        width={150}
      />
      <Link to="/usuarios">
        <Button variant="text" fullWidth>
          usuários
        </Button>
      </Link>
      <Link to="/fotos">
        <Button variant="text" fullWidth>
          fotos
        </Button>
      </Link>
      <Link to="/">
        <Button variant="text" fullWidth onClick={() => setToken('')}>
          sair
        </Button>
      </Link>
    </Stack>
  );
};

export default Menu;
