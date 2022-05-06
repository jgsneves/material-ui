import React, { createContext, useContext, useState } from 'react';

interface IAuthContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [token, setToken] = useState<string>('');

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const { setToken, token } = useContext(AuthContext);

  return {
    setToken,
    token,
  };
};
