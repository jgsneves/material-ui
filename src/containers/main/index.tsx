import React from 'react';

import Typography from '@mui/material/Typography';

import ContentContainer from '../content';

const MainContainer: React.FC = () => {
  return (
    <ContentContainer>
      <Typography variant="h2" mb={2}>
        Seja bem vindo!
      </Typography>
      <Typography>Bem vindo ao software de gestão de usuários.</Typography>
      <Typography>
        Utilize o menu lateral para usar as suas funcionalidades
      </Typography>
      <ul>
        <li>
          <Typography>
            Usuários: crie novos usuários ou modifique os já existentes
          </Typography>
        </li>
        <li>
          <Typography>
            Fotos: crie novas fotos ou modifique as já existentes
          </Typography>
        </li>
      </ul>
    </ContentContainer>
  );
};

export default MainContainer;
