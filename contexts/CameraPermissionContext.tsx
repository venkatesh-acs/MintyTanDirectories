
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Alert } from 'react-native';

interface CameraPermissionContextType {
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  isLoading: boolean;
}

const CameraPermissionContext = createContext<CameraPermissionContextType | undefined>(undefined);

export const useCameraPermission = () => {
  const context = useContext(CameraPermissionContext);
  if (!context) {
    throw new Error('useCameraPermission must be used within a CameraPermissionProvider');
  }
  return context;
};

export const CameraPermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      setIsLoading(true);
      if (permission === null) {
        // Permission not determined yet
        await requestPermission();
      }
      setIsLoading(false);
    };

    checkPermission();
  }, []);

  const handleRequestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await requestPermission();
      setIsLoading(false);
      
      if (!result.granted) {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to scan QR codes. Please enable camera permission in your device settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setIsLoading(false);
      return false;
    }
  };

  const value: CameraPermissionContextType = {
    hasPermission: permission?.granted || false,
    requestPermission: handleRequestPermission,
    isLoading
  };

  return (
    <CameraPermissionContext.Provider value={value}>
      {children}
    </CameraPermissionContext.Provider>
  );
};
