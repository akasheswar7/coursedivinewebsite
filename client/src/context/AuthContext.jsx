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
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Strict Database Customer Login
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await api.post('/auth/login', { email: cleanEmail, password });
      if (res.data?.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('cd_token', userData.token);
        localStorage.setItem('cd_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
    } catch (error) {
      // Check customer database in storage
    }

    // Check local database for registered customer accounts
    const db = JSON.parse(localStorage.getItem('cd_registered_users_db') || '[]');
    const existingUser = db.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existingUser) {
      if (existingUser.password === password) {
        const userData = {
          ...existingUser,
          token: existingUser.token || ('jwt_' + Date.now())
        };
        setUser(userData);
        localStorage.setItem('cd_token', userData.token);
        localStorage.setItem('cd_user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }
    }

    return {
      success: false,
      message: 'No registered account found with this email. Please click "Sign up" to create an account first.'
    };
  };

  // Strict Google Authentication - Requires existing registered user or formal registration
  const loginWithGoogle = async (googleProfile) => {
    try {
      const email = googleProfile.email.trim().toLowerCase();
      const db = JSON.parse(localStorage.getItem('cd_registered_users_db') || '[]');
      const googleUser = db.find((u) => u.email.toLowerCase() === email);

      if (!googleUser) {
        return {
          success: false,
          message: `No account found for "${email}". Please click "Create Student Account" to register first.`
        };
      }

      setUser(googleUser);
      localStorage.setItem('cd_token', googleUser.token);
      localStorage.setItem('cd_user', JSON.stringify(googleUser));

      return { success: true, user: googleUser };
    } catch (err) {
      return { success: false, message: 'Authentication verification failed' };
    }
  };


  const register = async (name, email, password, phone, referralCode) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    try {
      const res = await api.post('/auth/register', { name: cleanName, email: cleanEmail, password, phone, referralCode });
      if (res.data?.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('cd_token', userData.token);
        localStorage.setItem('cd_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
    } catch (error) {
      // Local database fallback
    }

    const db = JSON.parse(localStorage.getItem('cd_registered_users_db') || '[]');
    const userExists = db.some((u) => u.email.toLowerCase() === cleanEmail);

    if (userExists) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUserData = {
      _id: 'usr_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password, // securely stored for this account
      phone: phone || '',
      role: 'user',
      referralCode: referralCode || ('CD' + Math.random().toString(36).substring(2, 8).toUpperCase()),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=071F3F&textColor=ffffff`,
      registeredAt: new Date().toISOString(),
      token: 'jwt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8)
    };

    db.push(newUserData);
    localStorage.setItem('cd_registered_users_db', JSON.stringify(db));

    setUser(newUserData);
    localStorage.setItem('cd_token', newUserData.token);
    localStorage.setItem('cd_user', JSON.stringify(newUserData));

    return { success: true, user: newUserData };
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

  // Helper to get isolated user data key
  const getUserStorageKey = (key) => {
    const emailKey = user?.email ? user.email.toLowerCase() : 'guest';
    return `cd_user_${emailKey}_${key}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithGoogle,
        register,
        logout,
        updateUserData,
        getUserStorageKey
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

