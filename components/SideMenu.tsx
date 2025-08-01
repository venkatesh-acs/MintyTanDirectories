
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert, Share } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onNavigate }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'about', title: 'About Us', icon: 'info.circle' },
    { id: 'contact', title: 'Contact Us', icon: 'envelope' },
    { id: 'share', title: 'Share App', icon: 'square.and.arrow.up' },
    { id: 'changePassword', title: 'Change Password', icon: 'key' },
    { id: 'settings', title: 'Settings', icon: 'gear' },
    { id: 'logout', title: 'Logout', icon: 'arrow.right.square', isLogout: true },
  ];

  const handleItemPress = async (item: any) => {
    if (item.isLogout) {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await logout();
              onClose();
            }
          }
        ]
      );
    } else if (item.id === 'share') {
      handleShareApp();
    } else if (item.id === 'settings') {
      handleSettings();
    } else {
      onNavigate(item.id);
      onClose();
    }
  };

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing Mobile Scanner App! Download it now and experience seamless QR code scanning and project management.',
        title: 'Mobile Scanner App',
        url: 'https://your-app-store-link.com', // Replace with actual app store link
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('Shared!', `App shared via ${result.activityType}`);
        } else {
          Alert.alert('Shared!', 'App shared successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the app. Please try again.');
    }
    onClose();
  };

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Choose a setting to configure:',
      [
        {
          text: 'Notifications',
          onPress: () => {
            Alert.alert('Notifications', 'Notification settings:\n\n• Push Notifications: Enabled\n• Email Notifications: Enabled\n• Sound: Enabled');
          }
        },
        {
          text: 'Theme',
          onPress: () => {
            Alert.alert('Theme', 'Theme settings:\n\n• Current Theme: Light\n• Auto Dark Mode: Disabled\n• Font Size: Medium');
          }
        },
        {
          text: 'Language',
          onPress: () => {
            Alert.alert('Language', 'Language settings:\n\n• Current Language: English\n• Available Languages: English, Spanish, French');
          }
        },
        {
          text: 'Privacy',
          onPress: () => {
            Alert.alert('Privacy', 'Privacy settings:\n\n• Data Collection: Minimal\n• Analytics: Enabled\n• Location Services: Disabled');
          }
        },
        {
          text: 'About App',
          onPress: () => {
            Alert.alert('App Information', 'Mobile Scanner App v1.0.0\n\nDeveloped with React Native\nBuild: 2024.01.15');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menu}>
          {/* Top App Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Mobile Scanner</Text>
          </View>
          
          {/* Menu Options */}
          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, item.isLogout && styles.logoutItem]}
                onPress={() => handleItemPress(item)}
              >
                <IconSymbol 
                  name={item.icon as any} 
                  size={22} 
                  color={item.isLogout ? '#FF3B30' : '#007AFF'} 
                />
                <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>
                  {item.title}
                </Text>
                <IconSymbol 
                  name="chevron.right" 
                  size={16} 
                  color={item.isLogout ? '#FF3B30' : '#C7C7CC'} 
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconSymbol name="xmark.circle.fill" size={20} color="#fff" />
            <Text style={styles.closeText}>Close Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menu: {
    backgroundColor: '#fff',
    width: '85%',
    height: '100%',
    paddingTop: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  menuItems: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
    fontWeight: '500',
  },
  logoutItem: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff5f5',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
