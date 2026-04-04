import { createContext, createElement, useContext, useState } from 'react';

const AUTH_STORAGE_KEY = 'inkpress-auth';

const AuthContext = createContext(undefined);

const readStoredAuth = () => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  }

  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedValue) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    }

    const parsedValue = JSON.parse(storedValue);

    return {
      user: parsedValue?.user ?? null,
      accessToken: parsedValue?.accessToken ?? null,
      refreshToken: parsedValue?.refreshToken ?? null,
    };
  } catch (error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);

    return {
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  }
};

const normalizeAuthPayload = (payload) => {
  const authData =
    payload?.data && typeof payload.data === 'object'
      ? payload.data
      : payload?.message && typeof payload.message === 'object'
        ? payload.message
        : payload ?? {};

  return {
    user: authData?.user ?? null,
    accessToken: authData?.accessToken ?? null,
    refreshToken: authData?.refreshToken ?? null,
  };
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readStoredAuth);

  const persistAuthState = (nextState) => {
    setAuthState(nextState);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
    }
  };

  const login = (payload) => {
    const nextState = normalizeAuthPayload(payload);
    persistAuthState(nextState);
  };

  const logout = () => {
    const emptyState = {
      user: null,
      accessToken: null,
      refreshToken: null,
    };

    setAuthState(emptyState);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const setUser = (user) => {
    const nextState = {
      ...authState,
      user,
    };

    persistAuthState(nextState);
  };

  return createElement(
    AuthContext.Provider,
    {
      value: {
        ...authState,
        isAuthenticated: Boolean(authState.user),
        login,
        logout,
        setUser,
      },
    },
    children
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
