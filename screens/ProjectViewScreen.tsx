import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';

interface ProjectViewScreenProps {
  project: any;
  onBack: () => void;
  onNavigate?: (screen: string) => void;
  onEnvironmentPress?: () => void;
}

export const ProjectViewScreen: React.FC<ProjectViewScreenProps> = ({
  project,
  onBack,
  onNavigate,
  onEnvironmentPress
}) => {
  const [tokenLength, setTokenLength] = useState('4');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const generateCode = () => {
    const length = parseInt(tokenLength);
    const newCode = Math.random().toString().slice(2, 2 + length);
    setCode(newCode.padStart(length, '0'));
    setTimeLeft(30);
  };

  useEffect(() => {
    generateCode();
  }, [tokenLength]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateCode();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Project View"
        onMenuPress={() => setShowSideMenu(true)}
        onBackPress={onBack}
        onEnvironmentPress={onEnvironmentPress}
        showMenu={true}
        showBack={true}
      />

      <View style={styles.content}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectEmail}>{project.email}</Text>
        </View>

        <View style={styles.tokenSection}>
          <Text style={styles.sectionTitle}>Token Length</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tokenLength}
              onValueChange={setTokenLength}
              style={styles.picker}
            >
              <Picker.Item label="4 digits" value="4" />
              <Picker.Item label="6 digits" value="6" />
              <Picker.Item label="8 digits" value="8" />
              <Picker.Item label="10 digits" value="10" />
            </Picker>
          </View>
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.sectionTitle}>Generated Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.code}>{code}</Text>
            <Text style={styles.timer}>Regenerates in: {timeLeft}s</Text>
          </View>

          <TouchableOpacity style={styles.regenerateButton} onPress={generateCode}>
            <Text style={styles.regenerateButtonText}>Regenerate Now</Text>
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  projectInfo: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectEmail: {
    fontSize: 16,
    color: '#666',
  },
  tokenSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  codeSection: {
    alignItems: 'center',
  },
  codeContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginBottom: 20,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  timer: {
    fontSize: 14,
    color: '#666',
  },
  regenerateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  regenerateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});