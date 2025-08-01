
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface BarcodeItem {
  id: string;
  appid: string;
  user_id: string;
  unique_id: string;
  projectName: string;
  email: string;
  scannedAt: string;
}

interface BarcodeListScreenProps {
  onNavigate: (screen: string) => void;
  onProjectSelect: (project: any) => void;
  onEnvironmentPress: () => void;
}

export const BarcodeListScreen: React.FC<BarcodeListScreenProps> = ({
  onNavigate,
  onProjectSelect,
  onEnvironmentPress
}) => {
  const [barcodeList, setBarcodeList] = useState<BarcodeItem[]>([]);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  useEffect(() => {
    loadBarcodeData();
  }, []);

  const loadBarcodeData = async () => {
    // Simulate loading barcode data from server/storage
    const mockData: BarcodeItem[] = [
      {
        id: '1',
        appid: 'app123',
        user_id: 'user456',
        unique_id: 'unique789',
        projectName: 'Project Alpha',
        email: 'alpha@example.com',
        scannedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        appid: 'app456',
        user_id: 'user789',
        unique_id: 'unique123',
        projectName: 'Project Beta',
        email: 'beta@example.com',
        scannedAt: '2024-01-14T15:45:00Z'
      }
    ];
    setBarcodeList(mockData);
  };

  const handleProjectPress = (item: BarcodeItem) => {
    const projectData = {
      id: item.id,
      name: item.projectName,
      email: item.email,
      appid: item.appid,
      user_id: item.user_id,
      unique_id: item.unique_id,
      code: `${item.appid}_${item.user_id}_${item.unique_id}`
    };
    onProjectSelect(projectData);
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setBarcodeList(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const renderBarcodeItem = ({ item }: { item: BarcodeItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleProjectPress(item)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.projectName}>{item.projectName}</Text>
        <Text style={styles.projectEmail}>{item.email}</Text>
        <Text style={styles.scannedDate}>
          Scanned: {new Date(item.scannedAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <IconSymbol name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Barcode List"
        onMenuPress={() => setSideMenuVisible(true)}
        onEnvironmentPress={onEnvironmentPress}
        showMenu={true}
        showBack={false}
      />

      <View style={styles.content}>
        <FlatList
          data={barcodeList}
          renderItem={renderBarcodeItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No barcode data found</Text>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => onNavigate('scanner')}
              >
                <Text style={styles.scanButtonText}>Start Scanning</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onNavigate('scanner')}
      >
        <IconSymbol name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <SideMenu
        visible={sideMenuVisible}
        onClose={() => setSideMenuVisible(false)}
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  projectEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  scannedDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
