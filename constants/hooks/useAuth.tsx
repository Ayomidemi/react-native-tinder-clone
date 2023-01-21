import React, { createContext, ReactElement, useContext } from 'react';

type Props = {
  children?: ReactElement<any, any>;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  return <AuthContext.Provider value={{ user: null }}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
