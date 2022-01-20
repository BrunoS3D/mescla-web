import router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

import { User } from '@/types';
import { api } from '@/services/api';
import { CookieNames } from '@/enums';

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
};

export type AuthProviderPropsType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderPropsType) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { [CookieNames.token]: token } = parseCookies();

    if (token) {
      api
        .get(`/users/@me`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          destroyCookie(undefined, CookieNames.token);
          router.push(`/login`);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
