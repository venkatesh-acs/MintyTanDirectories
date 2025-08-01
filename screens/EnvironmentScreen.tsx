import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ENV, getEnvironmentConfig } from '@/constants/Environment';

interface EnvironmentScreenProps {
  onBack: () => void;
  onEnvironmentSelect: (env: ENV) => void;
}

export const EnvironmentScreen: React.FC<EnvironmentScreenProps> = ({
  onBack,
  onEnvironmentSelect
}) => {
  const [selectedEnv, setSelectedEnv] = useState<ENV>(ENV.DEV);

  const handleSelectEnvironment = () => {
    Alert.alert(
      'Environment Selected',
      `You have selected: ${getEnvironmentConfig(selectedEnv).name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            onEnvironmentSelect(selectedEnv);
            onBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select Environment</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedEnv}
            onValueChange={(itemValue) => setSelectedEnv(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Development" value={ENV.DEV} />
            <Picker.Item label="Validation" value={ENV.VAL} />
            <Picker.Item label="Production" value={ENV.PROD} />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={handleSelectEnvironment}
        >
          <Text style={styles.selectButtonText}>Select Environment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selectButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});