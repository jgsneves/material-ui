import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import ContentContainer from '../content';
import service from '../../services/api';
import { useAuthProvider } from '../../contexts/authContext';

interface CreateUserFormData {
  name: string;
  email: string;
  phone: string;
}

const CreateUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthProvider();

  const [formData, setFormData] = useState<CreateUserFormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    if (showErrorAlert === true) setShowErrorAlert(false);
    if (showSuccessAlert === true) setShowSuccessAlert(false);
  };

  const onSubmit = () => {
    setIsLoading(true);
    service
      .createNewUser({
        email: formData.email,
        mobile_phone: formData.phone,
        name: formData.name,
        token,
      })
      .then(() => {
        setShowSuccessAlert(true);
        setIsLoading(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
      })
      .catch(() => {
        setShowErrorAlert(true);
        setIsLoading(false);
      });
  };

  const handleEnterKeyPressDown = (event: React.KeyboardEvent) =>
    event.key === 'Enter' && onSubmit();

  const handleButtonClick = () => onSubmit();

  return (
    <ContentContainer>
      <Typography variant="h2" mb={2}>
        Criar um novo usuário
      </Typography>

      {showSuccessAlert && (
        <Alert severity="success">
          Usuário criado com sucesso!{' '}
          <Button variant="text" onClick={() => navigate(-1)}>
            Volte para a lista de usuários.
          </Button>
        </Alert>
      )}

      {showErrorAlert && (
        <Alert severity="error">Houve algum erro, tente novamente.</Alert>
      )}

      <Stack width={400} spacing={2}>
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isLoading}
          error={showErrorAlert}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
          error={showErrorAlert}
        />
        <TextField
          id="phone"
          label="Celular"
          variant="outlined"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={isLoading}
          onKeyDown={handleEnterKeyPressDown}
          error={showErrorAlert}
        />

        <Stack direction="row" width="100%" justifyContent="space-between">
          <Button
            variant="contained"
            sx={{ width: '47%' }}
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            Criar usuário
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

export default CreateUserContainer;
