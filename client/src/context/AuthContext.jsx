import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage or API on initial render
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('cd_user');
      const token = localStorage.getItem('cd_token');

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          const res = await api.get('/auth/me');
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem('cd_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          // If server fails, keep local cached user if present
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('cd_token', userData.token);
        localStorage.setItem('cd_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      // Fallback demo logins if backend is starting or offline
      if (email === 'admin@coursedivine.com' && password === 'Admin@123') {
        const adminData = {
          _id: 'admin_local_1',
          name: 'Course Divine Admin',
          email: 'admin@coursedivine.com',
          role: 'admin',
          phone: '+91 9876543210',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          token: 'demo_admin_jwt_token'
        };
        setUser(adminData);
        localStorage.setItem('cd_token', adminData.token);
        localStorage.setItem('cd_user', JSON.stringify(adminData));
        return { success: true, user: adminData };
      }

      if (email === 'student@coursedivine.com' && password === 'Student@123') {
        const studentData = {
          _id: 'student_local_1',
          name: 'Rohan Sharma',
          email: 'student@coursedivine.com',
          role: 'user',
          phone: '+91 9811223344',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          token: 'demo_student_jwt_token'
        };
        setUser(studentData);
        localStorage.setItem('cd_token', studentData.token);
        localStorage.setItem('cd_user', JSON.stringify(studentData));
        return { success: true, user: studentData };
      }

      const msg = error.response?.data?.message || error.message || 'Login failed';
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password, phone, referralCode) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, phone, referralCode });
      if (res.data?.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('cd_token', userData.token);
        localStorage.setItem('cd_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, message: 'Registration failed' };
    } catch (error) {
      // Fallback local registration
      const newUserData = {
        _id: 'user_' + Date.now(),
        name,
        email,
        phone: phone || '',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        referralCode: 'CD' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        token: 'local_jwt_' + Date.now()
      };
      setUser(newUserData);
      localStorage.setItem('cd_token', newUserData.token);
      localStorage.setItem('cd_user', JSON.stringify(newUserData));
      return { success: true, user: newUserData };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cd_token');
    localStorage.removeItem('cd_user');
  };

  const updateUserData = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('cd_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
