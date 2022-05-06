import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface UserProps {
  name: string;
  email: string;
  mobilePhone: string;
  photoUrl?: string;
}

const User: React.FC<UserProps> = ({
  name,
  email,
  mobilePhone,
  photoUrl,
}: UserProps) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardContent>
        {photoUrl ? (
          <Avatar alt={name} src={photoUrl} sx={{ width: 56, height: 56 }} />
        ) : (
          <Avatar>{name[0]}</Avatar>
        )}
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mobilePhone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">editar</Button>
      </CardActions>
    </Card>
  );
};

User.defaultProps = {
  photoUrl: undefined,
};

export default User;
