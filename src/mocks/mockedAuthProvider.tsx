import { useState } from 'react';
import { AuthContext } from '../contexts/authContext';

interface MockedAuthProviderProps {
  children: React.ReactNode;
  hash: string;
}

const MockedAuthProvider: React.FC<MockedAuthProviderProps> = ({
  children,
  hash,
}: MockedAuthProviderProps) => {
  const [token, setToken] = useState<string>(hash);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default MockedAuthProvider;
