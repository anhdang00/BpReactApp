// AuthProvider.js
import React from 'react';
import { useProvideAuth, AuthContext } from './useAuth';

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}