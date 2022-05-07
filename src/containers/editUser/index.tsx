import React, { useEffect, useRef, useState } from 'react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

import { AxiosError } from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import { useAuthProvider } from '../../contexts/authContext';
import service from '../../services/api';
import ContentContainer from '../content';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthProvider();
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<User>({
    id: 1,
    email: '',
    name: '',
    updated_at: '',
    created_at: '',
    email_verified_at: null,
    mobile_phone: '',
    parent_id: 1,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id: inputId, value } = event.target;
    setUser({ ...user, [inputId]: value });
    setErrorMessage('');
  };

  const savePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setIsLoading(true);
      const file = files[0];
      service
        .savePhoto({
          file,
          token,
          user_id: Number(id),
        })
        .then(() => {
          if (id) {
            service.getUser(id, token).then(res => {
              setUser(res.data.result);
              setShowSuccessAlert(true);
              setIsLoading(false);
              setTimeout(() => {
                setShowSuccessAlert(false);
              }, 3000);
            });
          }
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }
  };

  const updatePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setIsLoading(true);
      const file = files[0];
      service
        .updatePhoto({
          file,
          token,
          user_id: Number(id),
        })
        .then(() => {
          if (id) {
            service.getUser(id, token).then(res => setUser(res.data.result));
            setShowSuccessAlert(true);
            setIsLoading(false);
            setTimeout(() => {
              setShowSuccessAlert(false);
            }, 3000);
          }
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    service
      .userUpdate({
        token,
        email: user.email,
        user_id: Number(id),
        name: user.name,
        mobile_phone: user.mobile_phone,
      })
      .then(() => {
        setShowSuccessAlert(true);
        setIsLoading(false);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  const handleEnterKeyPressDown = (event: React.KeyboardEvent) =>
    event.key === 'Enter' && onSubmit();

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

  if (user === undefined && isLoading === false) {
    return (
      <ContentContainer>
        <Typography variant="h2" mb={2}>
          Nenhum usuário encontrado com este ID.
        </Typography>
        <Button variant="contained" onClick={() => navigate(`/usuarios`)}>
          voltar
        </Button>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Typography variant="h2" mb={2}>
        {isLoading ? 'Carregando...' : `Editar informações de ${user?.name}`}
      </Typography>

      {showSuccessAlert && (
        <Alert severity="success">
          Usuário editado com sucesso!{' '}
          <Button variant="text" onClick={() => navigate(-1)}>
            volte para os detalhes do usuário.
          </Button>
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error">{`Houve algum erro, tente novamente. Mensagem: ${errorMessage}`}</Alert>
      )}

      <Stack width={400} spacing={2}>
        <input
          type="file"
          accept="image/*"
          id="photo"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={event => {
            if (user.photo) {
              updatePhoto(event);
            } else {
              savePhoto(event);
            }
          }}
        />

        {user.photo ? (
          <Avatar
            alt={user.name}
            src={user.photo.photo}
            sx={{ width: 200, height: 200, alignSelf: 'center' }}
          />
        ) : (
          <Avatar sx={{ width: 200, height: 200, alignSelf: 'center' }}>
            {user?.name[0] ?? 'U'}
          </Avatar>
        )}

        <Button
          variant="text"
          onClick={() =>
            (fileInput.current as unknown as HTMLInputElement).click()
          }
        >
          {user.photo ? 'mudar a foto' : 'adicionar uma foto'}
        </Button>
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          value={user?.name}
          onChange={handleInputChange}
          disabled={isLoading}
          error={Boolean(errorMessage)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={user?.email}
          onChange={handleInputChange}
          disabled={isLoading}
          error={Boolean(errorMessage)}
        />
        <TextField
          id="mobile_phone"
          label="Celular"
          variant="outlined"
          value={user?.mobile_phone}
          onChange={handleInputChange}
          disabled={isLoading}
          onKeyDown={handleEnterKeyPressDown}
          error={Boolean(errorMessage)}
        />
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Button
            variant="contained"
            sx={{ width: '47%' }}
            disabled={isLoading}
            onClick={() => onSubmit()}
          >
            salvar
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '47%' }}
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            voltar
          </Button>
        </Stack>
      </Stack>
    </ContentContainer>
  );
};

export default EditUser;
