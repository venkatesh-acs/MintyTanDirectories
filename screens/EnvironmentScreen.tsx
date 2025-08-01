
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
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

  const handleSelect = () => {
    onEnvironmentSelect(selectedEnvironment);
    onBack();
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleSelect}
          >
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 30,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    gap: 15,
  },
  selectButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
