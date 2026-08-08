"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // CHECK AUTH STATE ON LOAD
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('bm_token');
      if (token) {
        try {
          // No need to pass headers, lib/api interceptor handles it
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          handleLogout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    // FastAPI requires Form Data for OAuth2 Password Flow
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', pass);

    try {
      // 1. Exchange credentials for JWT
      const res = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 2. Save token
      localStorage.setItem('bm_token', res.data.access_token);

      // 3. Get full user profile
      const userRes = await api.get('/auth/me');
      setUser(userRes.data);

      // 4. Redirect home
      router.push('/');
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.detail || "Login failed" 
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bm_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login: handleLogin, 
      logout: handleLogout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);