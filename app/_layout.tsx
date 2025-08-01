
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { CameraScannerScreen } from '@/screens/CameraScannerScreen';
import { ProjectDetailsScreen } from '@/screens/ProjectDetailsScreen';
import { EnvironmentScreen } from '@/screens/EnvironmentScreen';
import { ProjectViewScreen } from '@/screens/ProjectViewScreen';

function AppContent() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentProject, setCurrentProject] = useState(null);
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
    if (showEnvironment) {
      return (
        <EnvironmentScreen
          onEnvironmentSelected={(env) => console.log('Environment selected:', env)}
          onBack={() => setShowEnvironment(false)}
        />
      );
    }

    if (user) {
      // User is logged in
      switch (currentScreen) {
        case 'projectDetails':
          return (
            <ProjectDetailsScreen
              project={currentProject}
              onBack={() => setCurrentScreen('scanner')}
              onDelete={handleDeleteProject}
              onAddNew={() => setCurrentScreen('scanner')}
              onView={() => setCurrentScreen('projectView')}
            />
          );
        case 'projectView':
          return (
            <ProjectViewScreen
              project={currentProject}
              onBack={() => setCurrentScreen('projectDetails')}
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
      // User is not logged in
      switch (currentScreen) {
        case 'register':
          return <RegisterScreen onNavigate={handleNavigate} />;
        case 'forgotPassword':
          // You can implement this screen similarly
          return <LoginScreen onNavigate={handleNavigate} />;
        case 'contact':
          // You can implement this screen similarly
          return <LoginScreen onNavigate={handleNavigate} />;
        default:
          return <LoginScreen onNavigate={handleNavigate} />;
      }
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {renderScreen()}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// This is the required default export for Expo Router
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
