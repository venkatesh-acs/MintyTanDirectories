
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  deviceId: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  changePassword: (email: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
  sendGeneratedCode: (code: string) => Promise<boolean>;
  checkSession: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const generateDeviceId = async () => {
    const storedDeviceId = await AsyncStorage.getItem('deviceId');
    if (storedDeviceId) {
      return storedDeviceId;
    }
    
    const newDeviceId = `${Device.modelName || 'unknown'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await AsyncStorage.setItem('deviceId', newDeviceId);
    return newDeviceId;
  };

  const initializeAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      const currentDeviceId = await generateDeviceId();
      
      setDeviceId(currentDeviceId);
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Check session validity with server
        const isValidSession = await checkSessionWithServer(storedToken, currentDeviceId);
        if (!isValidSession) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSessionWithServer = async (token: string, deviceId: string): Promise<boolean> => {
    try {
      // Simulate API call to check session validity
      // In real implementation, this would call your backend
      console.log('Checking session for device:', deviceId);
      return true; // Simulate valid session
    } catch (error) {
      console.error('Session check failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const currentDeviceId = await generateDeviceId();
      
      // Simulate API call with device ID
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe'
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Send device ID to server for authentication and tracking
      console.log('Logging in with device ID:', currentDeviceId);
      
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      setToken(mockToken);
      setUser(mockUser);
      setDeviceId(currentDeviceId);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        firstName,
        lastName
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      setToken(mockToken);
      setUser(mockUser);
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      console.log('Password reset requested for:', email);
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  const changePassword = async (email: string, newPassword: string, confirmPassword: string): Promise<boolean> => {
    try {
      if (newPassword !== confirmPassword) {
        return false;
      }
      // Simulate API call
      console.log('Password changed for:', email);
      return true;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  const sendGeneratedCode = async (code: string): Promise<boolean> => {
    try {
      // Send generated code to API
      console.log('Sending code to API:', code, 'from device:', deviceId);
      
      // Simulate API response - check if already logged in elsewhere
      const isAlreadyLoggedIn = Math.random() < 0.1; // 10% chance to simulate "already logged in"
      
      if (isAlreadyLoggedIn) {
        // Auto logout this device
        await logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error sending code:', error);
      return false;
    }
  };

  const checkSession = async (): Promise<boolean> => {
    if (!token || !deviceId) return false;
    return await checkSessionWithServer(token, deviceId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      deviceId,
      login,
      register,
      logout,
      forgotPassword,
      changePassword,
      sendGeneratedCode,
      checkSession,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
