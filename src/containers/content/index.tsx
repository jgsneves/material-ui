import React from 'react';

import Stack from '@mui/material/Stack';

interface ContentContainerProps {
  children: React.ReactNode;
}
const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
}: ContentContainerProps) => {
  return (
    <Stack spacing={2} width="100%" ml={2} mt={2}>
      {children}
    </Stack>
  );
};

export default ContentContainer;
