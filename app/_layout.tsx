
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CameraPermissionProvider } from '@/contexts/CameraPermissionContext';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { CameraScannerScreen } from '@/screens/CameraScannerScreen';
import { ProjectDetailsScreen } from '@/screens/ProjectDetailsScreen';
import { EnvironmentScreen } from '@/screens/EnvironmentScreen';
import { ProjectViewScreen } from '@/screens/ProjectViewScreen';
import { AboutUsScreen } from '@/screens/AboutUsScreen';
import { ContactUsScreen } from '@/screens/ContactUsScreen';
import { ChangePasswordScreen } from '@/screens/ChangePasswordScreen';
import { ForgotPasswordScreen } from '@/screens/ForgotPasswordScreen';

function AppContent() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('login');
  const [scannedProject, setScannedProject] = useState<any>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [showEnvironment, setShowEnvironment] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded || isLoading) {
    return null;
  }

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleProjectScanned = (projectData: any) => {
    setCurrentProject(projectData);
    setCurrentScreen('projectDetails');
  };

  const handleDeleteProject = (projectId: string) => {
    // Simulate project deletion
    setCurrentScreen('scanner');
  };

  const renderScreen = () => {
    if (user) {
      // Post-login screens
      switch (currentScreen) {
        case 'scanner':
          return (
            <CameraScannerScreen
              onProjectScanned={handleProjectScanned}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
        case 'projectDetails':
          return (
            <ProjectDetailsScreen
              project={currentProject}
              onBack={() => setCurrentScreen('scanner')}
              onDelete={handleDeleteProject}
              onAddNew={() => setCurrentScreen('scanner')}
              onView={() => setCurrentScreen('projectView')}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
        case 'projectView':
          return (
            <ProjectViewScreen
              project={currentProject}
              onBack={() => setCurrentScreen('projectDetails')}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
        case 'about':
          return (
            <AboutUsScreen
              onBack={() => setCurrentScreen('scanner')}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
        case 'contact':
          return (
            <ContactUsScreen
              onBack={() => setCurrentScreen('scanner')}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
              isPostLogin={true}
            />
          );
        case 'changePassword':
          return (
            <ChangePasswordScreen
              onBack={() => setCurrentScreen('scanner')}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
        case 'environment':
          return (
            <EnvironmentScreen
              onBack={() => setCurrentScreen('scanner')}
              onEnvironmentSelect={setSelectedEnvironment}
            />
          );
        default:
          return (
            <CameraScannerScreen
              onProjectScanned={handleProjectScanned}
              onNavigate={handleNavigate}
              onEnvironmentPress={() => setShowEnvironment(true)}
            />
          );
      }
    } else {
      // Pre-login screens
      switch (currentScreen) {
        case 'register':
          return (
            <RegisterScreen
              onNavigate={handleNavigate}
            />
          );
        case 'forgotPassword':
          return (
            <ForgotPasswordScreen
              onNavigate={handleNavigate}
            />
          );
        case 'contact':
          return (
            <ContactUsScreen
              onNavigate={handleNavigate}
              isPostLogin={false}
            />
          );
        case 'environment':
          return (
            <EnvironmentScreen
              onBack={() => setCurrentScreen('login')}
              onEnvironmentSelect={setSelectedEnvironment}
            />
          );
        default:
          return (
            <LoginScreen
              onNavigate={handleNavigate}
            />
          );
      }
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      {renderScreen()}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// This is the required default export for Expo Router
export default function RootLayout() {
  return (
    <CameraPermissionProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CameraPermissionProvider>
  );
}
