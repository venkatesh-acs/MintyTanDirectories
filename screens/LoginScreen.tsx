import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { validateEnvironmentPassword } from '@/constants/Environment';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEnvDialog, setShowEnvDialog] = useState(false);
  const [envPassword, setEnvPassword] = useState('');
  const [showEnvPassword, setShowEnvPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnvPasswordCheck = () => {
    if (validateEnvironmentPassword(envPassword)) {
      setShowEnvDialog(false);
      setEnvPassword('');
      onNavigate('environment');
    } else {
      Alert.alert('Error', 'Invalid password');
    }
  };

  const handleEnvDialogCancel = () => {
    setShowEnvDialog(false);
    setEnvPassword('');
    setShowEnvPassword(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.hiddenEnvButton}
        onPress={() => setShowEnvDialog(true)}
      >
        <Text style={styles.hiddenEnvButtonText}>•</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <IconSymbol
              name={showPassword ? 'eye.slash' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => onNavigate('forgotPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate('register')}>
            <Text style={styles.linkText}>Not a member? Signup now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNavigate('contact')}>
            <Text style={styles.linkText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showEnvDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={handleEnvDialogCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.envDialog}>
            <Text style={styles.envDialogTitle}>Environment Access</Text>

            <View style={styles.envPasswordContainer}>
              <TextInput
                style={styles.envPasswordInput}
                placeholder="Enter password"
                value={envPassword}
                onChangeText={setEnvPassword}
                secureTextEntry={!showEnvPassword}
              />
              <TouchableOpacity
                style={styles.envEyeIcon}
                onPress={() => setShowEnvPassword(!showEnvPassword)}
              >
                <IconSymbol
                  name={showEnvPassword ? 'eye.slash' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.envDialogButtons}>
              <TouchableOpacity
                style={styles.envCancelButton}
                onPress={handleEnvDialogCancel}
              >
                <Text style={styles.envCancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.envOkButton}
                onPress={handleEnvPasswordCheck}
              >
                <Text style={styles.envOkButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  hiddenEnvButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  hiddenEnvButtonText: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  envDialog: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  envDialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  envPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  envPasswordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  envEyeIcon: {
    paddingHorizontal: 15,
  },
  envDialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  envCancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  envCancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  envOkButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  envOkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});