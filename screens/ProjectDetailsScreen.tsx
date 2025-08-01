import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ProjectDetailsScreenProps {
  project: any;
  onBack: () => void;
  onDelete: (projectId: string) => void;
  onAddNew: () => void;
  onView: () => void;
  onNavigate?: (screen: string) => void;
  onEnvironmentPress?: () => void;
}

export const ProjectDetailsScreen: React.FC<ProjectDetailsScreenProps> = ({
  project,
  onBack,
  onDelete,
  onAddNew,
  onView,
  onNavigate,
  onEnvironmentPress
}) => {
  const [tokenLength, setTokenLength] = useState('medium');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [randomCode, setRandomCode] = useState('');
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    generateRandomCode();
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          generateRandomCode();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateRandomCode = () => {
    const code = Math.random().toString().slice(2, 12);
    setRandomCode(code);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(project.id)
        }
      ]
    );
  };

  const handleViewDetails = () => {
    setShowTokenDetails(true);
  };

  if (showTokenDetails) {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Token Details"
          onBackPress={() => setShowTokenDetails(false)}
          showBack={true}
          showMenu={false}
        />

        <View style={styles.content}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectEmail}>{project.email}</Text>

          <View style={styles.tokenContainer}>
            <Text style={styles.label}>Token Length:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tokenLength}
                onValueChange={setTokenLength}
                style={styles.picker}
              >
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
              </Picker>
            </View>
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Time remaining: {timeRemaining}s
            </Text>
            <View style={styles.timerBar}>
              <View 
                style={[
                  styles.timerProgress, 
                  { width: `${(timeRemaining / 30) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Generated Code:</Text>
            <Text style={styles.code}>{randomCode}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Project Details"
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

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleViewDetails}
          >
            <IconSymbol name="eye" size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <IconSymbol name="trash" size={24} color="#FF3B30" />
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
        <IconSymbol name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <SideMenu
        visible={showSideMenu}
        onClose={() => setShowSideMenu(false)}
        onNavigate={onNavigate || (() => {})}
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
  projectInfo: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectEmail: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  actionButtonText: {
    marginTop: 5,
    fontSize: 16,
    color: '#007AFF',
  },
  deleteButtonText: {
    color: '#FF3B30',
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
  tokenContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  timerBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  codeContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 2,
  },
});