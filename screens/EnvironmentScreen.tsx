
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CustomHeader } from '@/components/CustomHeader';
import { ENV, validateEnvPassword } from '@/constants/Environment';

interface EnvironmentScreenProps {
  onEnvironmentSelected: (env: string) => void;
  onBack: () => void;
}

export const EnvironmentScreen: React.FC<EnvironmentScreenProps> = ({
  onEnvironmentSelected,
  onBack
}) => {
  const [password, setPassword] = useState('');
  const [selectedEnv, setSelectedEnv] = useState(ENV.environment);

  const environments = [
    { key: 'dev', label: 'Development', color: '#28a745' },
    { key: 'val', label: 'Validation', color: '#ffc107' },
    { key: 'prod', label: 'Production', color: '#dc3545' }
  ];

  const handleConfirm = () => {
    if (!validateEnvPassword(password)) {
      Alert.alert('Error', 'Invalid password. Use format: jaMMYY');
      return;
    }

    onEnvironmentSelected(selectedEnv);
    onBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Environment"
        onBackPress={onBack}
        showBack={true}
        showMenu={false}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Select Environment</Text>
        <Text style={styles.currentEnv}>Current: {ENV.environment.toUpperCase()}</Text>
        
        <View style={styles.envContainer}>
          {environments.map((env) => (
            <TouchableOpacity
              key={env.key}
              style={[
                styles.envButton,
                { borderColor: env.color },
                selectedEnv === env.key && { backgroundColor: env.color }
              ]}
              onPress={() => setSelectedEnv(env.key)}
            >
              <Text style={[
                styles.envText,
                selectedEnv === env.key && styles.selectedEnvText
              ]}>
                {env.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password (jaMMYY format)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentEnv: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  envContainer: {
    marginBottom: 30,
  },
  envButton: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  envText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedEnvText: {
    color: '#fff',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CustomHeader } from '@/components/CustomHeader';

interface EnvironmentScreenProps {
  onEnvironmentSelected: (env: string) => void;
  onBack: () => void;
}

export const EnvironmentScreen: React.FC<EnvironmentScreenProps> = ({
  onEnvironmentSelected,
  onBack
}) => {
  const [password, setPassword] = useState('');
  const [showEnvironments, setShowEnvironments] = useState(false);

  const handlePasswordSubmit = () => {
    // Check for correct password format (ja0825 for August 2025)
    if (password === 'ja0825') {
      setShowEnvironments(true);
    } else {
      Alert.alert('Invalid Password', 'Please enter the correct password.');
      setPassword('');
    }
  };

  const handleEnvironmentSelect = (env: string) => {
    onEnvironmentSelected(env);
    Alert.alert('Environment Selected', `Switched to ${env.toUpperCase()} environment`);
    onBack();
  };

  if (showEnvironments) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Environment Selection"
          onBackPress={onBack}
          showBack={true}
          showMenu={false}
        />

        <View style={styles.content}>
          <Text style={styles.title}>Select Environment</Text>
          
          <TouchableOpacity 
            style={[styles.envButton, styles.devButton]}
            onPress={() => handleEnvironmentSelect('dev')}
          >
            <Text style={styles.envButtonText}>Development</Text>
            <Text style={styles.envDescription}>For testing and development</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.envButton, styles.valButton]}
            onPress={() => handleEnvironmentSelect('val')}
          >
            <Text style={styles.envButtonText}>Validation</Text>
            <Text style={styles.envDescription}>For staging and validation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.envButton, styles.prodButton]}
            onPress={() => handleEnvironmentSelect('prod')}
          >
            <Text style={styles.envButtonText}>Production</Text>
            <Text style={styles.envDescription}>Live production environment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Access Environment"
        onBackPress={onBack}
        showBack={true}
        showMenu={false}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Enter Password</Text>
        <Text style={styles.subtitle}>Enter the access password to view environment options</Text>

        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handlePasswordSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  envButton: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  devButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    borderWidth: 1,
  },
  valButton: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
    borderWidth: 1,
  },
  prodButton: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  envButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  envDescription: {
    fontSize: 14,
    color: '#666',
  },
});
