
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface CustomHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onBackPress?: () => void;
  onEnvironmentPress?: () => void;
  showMenu?: boolean;
  showBack?: boolean;
  isInitialScreen?: boolean;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onMenuPress,
  onBackPress,
  onEnvironmentPress,
  showMenu = true,
  showBack = false,
  isInitialScreen = false
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showMenu && (
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
            <IconSymbol name="line.horizontal.3" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <IconSymbol name="chevron.left" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onEnvironmentPress} style={styles.hiddenDot}>
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 44,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
  hiddenDot: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 20,
    height: 20,
    padding: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007AFF',
    opacity: 0.3,
  },
});
