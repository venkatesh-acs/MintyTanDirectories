
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Camera from 'expo-camera';

interface CameraPermissionContextType {
  hasPermission: boolean | null;
  requestPermission: () => Promise<boolean>;
}

const CameraPermissionContext = createContext<CameraPermissionContextType | undefined>(undefined);

export const CameraPermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const response = await Camera.requestCameraPermissionsAsync();
      const granted = response.status === 'granted';
      setHasPermission(granted);
      
      if (!granted) {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to scan QR codes. Please enable camera permission in your device settings.',
          [{ text: 'OK' }]
        );
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
      return false;
    }
  };

  useEffect(() => {
    // Request permission on app load
    requestPermission();
  }, []);

  return (
    <CameraPermissionContext.Provider value={{ hasPermission, requestPermission }}>
      {children}
    </CameraPermissionContext.Provider>
  );
};

export const useCameraPermission = () => {
  const context = useContext(CameraPermissionContext);
  if (context === undefined) {
    throw new Error('useCameraPermission must be used within a CameraPermissionProvider');
  }
  return context;
};
