import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "./axios";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await currentUser();
        setUser(response?.data?.data ?? response?.data ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const login = (response) => {
    const userData = response?.data?.data ?? response?.data ?? null;
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Authcontext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
        loading,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);