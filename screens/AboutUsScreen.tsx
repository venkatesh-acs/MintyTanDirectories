
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';

interface AboutUsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onEnvironmentPress?: () => void;
}

export const AboutUsScreen: React.FC<AboutUsScreenProps> = ({
  onBack,
  onNavigate,
  onEnvironmentPress
}) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="About Us"
        onMenuPress={() => setShowSideMenu(true)}
        onBackPress={onBack}
        onEnvironmentPress={onEnvironmentPress}
        showMenu={true}
        showBack={true}
      />

      <ScrollView style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Project Name:</Text>
          <Text style={styles.value}>Mobile Scanner App</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Version:</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>
            A comprehensive React Native mobile application with JWT authentication flow, 
            camera scanning capabilities, and project management features. The app supports 
            both Android and iOS platforms with a clean, intuitive user interface.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Features:</Text>
          <Text style={styles.feature}>• JWT Authentication System</Text>
          <Text style={styles.feature}>• Camera QR Code Scanning</Text>
          <Text style={styles.feature}>• Project Management</Text>
          <Text style={styles.feature}>• Token Generation</Text>
          <Text style={styles.feature}>• Environment Configuration</Text>
          <Text style={styles.feature}>• User Settings & Profile</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Developed By:</Text>
          <Text style={styles.value}>Development Team</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>support@example.com</Text>
        </View>
      </ScrollView>

      <SideMenu
        visible={showSideMenu}
        onClose={() => setShowSideMenu(false)}
        onNavigate={onNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoSection: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
    paddingLeft: 10,
  },
});
