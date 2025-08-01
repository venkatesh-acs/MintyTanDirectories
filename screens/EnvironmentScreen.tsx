
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
