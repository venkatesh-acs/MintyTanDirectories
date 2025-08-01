import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';

interface CameraScannerScreenProps {
  onProjectScanned: (projectData: any) => void;
  onNavigate: (screen: string) => void;
  onEnvironmentPress: () => void;
  isInitialScreen?: boolean;
}

export const CameraScannerScreen: React.FC<CameraScannerScreenProps> = ({
  onProjectScanned,
  onNavigate,
  onEnvironmentPress,
  isInitialScreen
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    try {
      // Parse barcode data to extract appid, user_id, unique_id
      // Expected format: "appid:user_id:unique_id" or JSON format
      let appid, user_id, unique_id;
      
      if (data.includes(':')) {
        // Simple colon-separated format
        const parts = data.split(':');
        if (parts.length >= 3) {
          [appid, user_id, unique_id] = parts;
        } else {
          throw new Error('Invalid barcode format');
        }
      } else {
        // Try JSON format
        try {
          const parsed = JSON.parse(data);
          appid = parsed.appid;
          user_id = parsed.user_id;
          unique_id = parsed.unique_id;
        } catch {
          throw new Error('Invalid barcode format');
        }
      }

      if (!appid || !user_id || !unique_id) {
        throw new Error('Missing required barcode values');
      }

      // Create project data from scanned values
      const projectData = {
        id: unique_id,
        name: `Project ${appid.slice(-4)}`,
        email: `${user_id}@example.com`,
        appid,
        user_id,
        unique_id,
        code: data
      };

      Alert.alert(
        'Project Scanned',
        `Project: ${projectData.name}\nEmail: ${projectData.email}\nApp ID: ${appid}\nUser ID: ${user_id}`,
        [
          {
            text: 'View Details',
            onPress: () => onProjectScanned(projectData)
          },
          {
            text: 'Scan Another',
            onPress: () => setScanned(false)
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Invalid Barcode',
        'The scanned barcode does not contain valid project data. Please scan a valid project barcode.',
        [
          {
            text: 'Try Again',
            onPress: () => setScanned(false)
          }
        ]
      );
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>
          Camera permission is required to scan QR codes
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="JWT Authenticator"
        onMenuPress={() => setSideMenuVisible(true)}
        onEnvironmentPress={onEnvironmentPress}
        showMenu={true}
        showBack={false}
        isInitialScreen={isInitialScreen}
      />

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
        />

        <View style={styles.scannerOverlay}>
          <View style={styles.scannerFrame} />
          <Text style={styles.scannerText}>
            {scanned ? 'Tap to scan again' : 'Point camera at QR code'}
          </Text>
        </View>

        {scanned && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>

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
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  scannerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  rescanButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  rescanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noPermissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});