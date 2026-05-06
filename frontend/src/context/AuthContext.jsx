import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('weybee_token'));
  const [loading, setLoading] = useState(true);

  // Set up axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch current user profile
      axios.get(`${API}/auth/me`)
        .then(res => { setUser(res.data.user); setLoading(false); })
        .catch(() => { logout(); setLoading(false); });
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem('weybee_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (name, email, password) => {
    const res = await axios.post(`${API}/auth/register`, { name, email, password });
    localStorage.setItem('weybee_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      if (token) await axios.post(`${API}/auth/logout`);
    } catch (e) { /* ignore */ }
    localStorage.removeItem('weybee_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const logPageVisit = async (page) => {
    if (token) {
      try { await axios.post(`${API}/auth/log-visit`, { page }); } catch (e) { /* ignore */ }
    }
  };

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager' || isAdmin;
  const isDeveloper = user?.role === 'developer' || isManager;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, logPageVisit, isAdmin, isManager, isDeveloper }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
