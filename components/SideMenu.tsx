
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
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
      await logout();
    } else if (item.id === 'share') {
      handleShareApp();
    } else if (item.id === 'settings') {
      handleSettings();
    } else {
      onNavigate(item.id);
    }
    onClose();
  };

  const handleShareApp = () => {
    Alert.alert(
      'Share App',
      'Share this app with your friends and colleagues!',
      [
        {
          text: 'Share Link',
          onPress: () => {
            // In a real app, you would use React Native's Share API
            Alert.alert('Shared!', 'App link has been shared successfully.');
          }
        },
        {
          text: 'QR Code',
          onPress: () => {
            Alert.alert('QR Code', 'QR code for app download generated.');
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Choose a setting to configure:',
      [
        {
          text: 'Notifications',
          onPress: () => Alert.alert('Notifications', 'Notification settings opened.')
        },
        {
          text: 'Theme',
          onPress: () => Alert.alert('Theme', 'Theme settings opened.')
        },
        {
          text: 'Language',
          onPress: () => Alert.alert('Language', 'Language settings opened.')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
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
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, item.isLogout && styles.logoutItem]}
              onPress={() => handleItemPress(item)}
            >
              <IconSymbol name={item.icon as any} size={20} color={item.isLogout ? '#FF3B30' : '#007AFF'} />
              <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
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
    width: '80%',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutItem: {
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
  },
  closeButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
