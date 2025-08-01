import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface EnvironmentScreenProps {
  onBack: () => void;
  onEnvironmentSelect: (env: string) => void;
}

export const EnvironmentScreen: React.FC<EnvironmentScreenProps> = ({
  onBack,
  onEnvironmentSelect
}) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('dev');

  const handleEnvironmentSelect = () => {
    onEnvironmentSelect(selectedEnvironment);
    Alert.alert(
      'Environment Selected',
      `You have selected ${selectedEnvironment.toUpperCase()} environment`,
      [
        {
          text: 'OK',
          onPress: onBack
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Select Environment</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedEnvironment}
            onValueChange={setSelectedEnvironment}
            style={styles.picker}
          >
            <Picker.Item label="Development" value="dev" />
            <Picker.Item label="Validation" value="val" />
            <Picker.Item label="Production" value="prod" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.selectButton} onPress={handleEnvironmentSelect}>
          <Text style={styles.selectButtonText}>Select Environment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingTop: 80,
  },
  logo: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});