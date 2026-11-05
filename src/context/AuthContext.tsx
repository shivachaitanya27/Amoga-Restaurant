import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, loginAdmin, logoutAdmin, subscribeToAuthChanges } from '../firebase/auth';

interface AuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<AdminUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  adminUser: null,
  loading: true,
  login: async () => ({ uid: '', email: null, displayName: null }),
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthChanges((user) => {
      setAdminUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    const user = await loginAdmin(email, pass);
    setAdminUser(user);
    return user;
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ adminUser, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

