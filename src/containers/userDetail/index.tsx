import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useNavigate, useParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import ContentContainer from '../content';
import service from '../../services/api';
import { useAuthProvider } from '../../contexts/authContext';

const UserDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthProvider();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      service
        .getUser(id, token)
        .then(res => {
          setUser(res.data.result);
          setIsLoading(false);
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }
  }, [id, token]);

  if (id === undefined) {
    return (
      <ContentContainer>
        <Typography variant="h2" mb={2}>
          Detalhes de usuário
        </Typography>
        <Alert severity="error">
          Não encontramos nenhum usuário com o ID fornecido!
        </Alert>
      </ContentContainer>
    );
  }

  if (isLoading) {
    return (
      <ContentContainer>
        <Typography variant="h2" mb={2}>
          Carregando...
        </Typography>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Typography variant="h2" mb={2}>
        {user?.name ?? 'Detalhe do usuário'}
      </Typography>

      {errorMessage && (
        <Alert severity="error">{`Houve algum erro: ${errorMessage}`}</Alert>
      )}

      {user && user.photo ? (
        <Avatar
          alt={user.name}
          src={user.photo.photo}
          sx={{ width: 200, height: 200 }}
        />
      ) : (
        <Avatar sx={{ width: 200, height: 200 }}>{user?.name[0] ?? 'U'}</Avatar>
      )}

      <Typography variant="body1" mb={2}>
        {`ID: ${user?.id}`}
      </Typography>

      <Typography variant="body1" mb={2}>
        {`Email: ${user?.email}`}
      </Typography>

      <Typography variant="body1" mb={5}>
        {`Telefone celular: ${user?.mobile_phone}`}
      </Typography>

      <Stack
        width={500}
        direction="row"
        justifyContent="space-between"
        sx={{ marginTop: 3 }}
      >
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={() => navigate(`/usuarios/editar/${id}`)}
          sx={{ width: '60%' }}
        >
          editar informações do usuário
        </Button>
        <Button
          disabled={isLoading}
          variant="outlined"
          onClick={() => navigate(`/usuarios`)}
          sx={{ width: '37%' }}
        >
          voltar
        </Button>
      </Stack>
    </ContentContainer>
  );
};

export default UserDetailContainer;
