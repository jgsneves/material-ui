import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { AxiosError } from 'axios';
import service from '../../services/api';
import { useAuthProvider } from '../../contexts/authContext';
import UserComponent from '../../components/user';
import ContentContainer from '../content';

const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseErrorMessage, setResponseErrorMessage] = useState<string>('');
  const { token } = useAuthProvider();

  useEffect(() => {
    setIsLoading(true);
    service
      .getUsersList(token)
      .then(res => {
        setUsers(res.data.result);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setResponseErrorMessage(error.message);
        setIsLoading(false);
      });
  }, [token]);
  return (
    <ContentContainer>
      <Typography variant="h2" mb={2}>
        Usuários
      </Typography>
      <Link to="/usuarios/novo-usuario">
        <Button variant="contained">criar novo usuário</Button>
      </Link>
      {isLoading && (
        <Typography variant="h4" my={2}>
          Carregando...
        </Typography>
      )}
      {responseErrorMessage && (
        <Typography variant="h4" my={2}>
          {responseErrorMessage}
        </Typography>
      )}
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {users.length === 0 ? (
          <Typography variant="h5" my={2}>
            Nenhum usuário encontrado!
          </Typography>
        ) : (
          users.map(userData => (
            <Link to={`usuarios/${userData.id}`} key={userData.id}>
              <UserComponent
                name={userData.name}
                email={userData.email}
                mobilePhone={userData.mobile_phone}
                photoUrl={userData.photo?.photo}
              />
            </Link>
          ))
        )}
      </Stack>
    </ContentContainer>
  );
};

export default UsersContainer;
