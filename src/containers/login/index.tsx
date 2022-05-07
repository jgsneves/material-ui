import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { AxiosError } from 'axios';

import { useAuthProvider } from '../../contexts/authContext';
import service from '../../services/api';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setToken } = useAuthProvider();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setRequestErrorMessage('');
  };

  const onSubmit = () => {
    setIsLoading(true);
    service
      .authenticateUser(formData)
      .then(res => {
        setToken(res.data.token);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setRequestErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  const handleEnterKeyPressDown = (event: React.KeyboardEvent) =>
    event.key === 'Enter' && onSubmit();

  const handleButtonClick = () => onSubmit();

  return (
    <Stack
      spacing={4}
      width={300}
      mx="auto"
      height="100vh"
      justifyContent="center"
    >
      <Typography variant="h4">Seja bem vindo!</Typography>
      {requestErrorMessage && (
        <Alert severity="error">{`Houve algum erro. Mensagem: ${requestErrorMessage}`}</Alert>
      )}
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={Boolean(requestErrorMessage)}
        disabled={isLoading}
      />
      <TextField
        id="password"
        label="Senha"
        variant="outlined"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        error={Boolean(requestErrorMessage)}
        disabled={isLoading}
        onKeyDown={handleEnterKeyPressDown}
      />
      <Button
        disabled={isLoading}
        variant="contained"
        onClick={handleButtonClick}
      >
        Entrar
      </Button>
    </Stack>
  );
};

export default Login;
