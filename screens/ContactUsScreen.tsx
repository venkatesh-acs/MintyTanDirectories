import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Image 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomHeader } from '@/components/CustomHeader';
import { SideMenu } from '@/components/SideMenu';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ContactUsScreenProps {
  onBack?: () => void;
  onNavigate: (screen: string) => void;
  onEnvironmentPress?: () => void;
  isPostLogin?: boolean;
}

export const ContactUsScreen: React.FC<ContactUsScreenProps> = ({
  onBack,
  onNavigate,
  onEnvironmentPress,
  isPostLogin = false
}) => {
  const [feedbackType, setFeedbackType] = useState('request');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [email, setEmail] = useState('');

  const handleFilePicker = () => {
    // Simulate file picker
    Alert.alert(
      'File Upload',
      'Select file type:',
      [
        { text: 'Camera', onPress: () => setAttachedFile('camera_image.jpg') },
        { text: 'Gallery', onPress: () => setAttachedFile('gallery_image.jpg') },
        { text: 'Document', onPress: () => setAttachedFile('document.pdf') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSend = () => {
    if (!email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Your message has been sent successfully. We will get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSubject('');
            setMessage('');
            setAttachedFile(null);
            setFeedbackType('request');
            setEmail('');
          }
        }
      ]
    );
  };

  const renderContent = () => {
    if (isPostLogin) {
      return (
        <>
          <CustomHeader 
            title="Contact Us"
            onMenuPress={() => setShowSideMenu(true)}
            onBackPress={onBack}
            onEnvironmentPress={onEnvironmentPress}
            showMenu={true}
            showBack={true}
          />
          <ScrollView style={styles.content}>
            <Text style={styles.title}>Send a Message</Text>

            <View style={styles.formSection}>
              <Text style={styles.label}>Feedback Type *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={feedbackType}
                  onValueChange={setFeedbackType}
                  style={styles.picker}
                >
                  <Picker.Item label="Request" value="request" />
                  <Picker.Item label="Suggestions" value="suggestions" />
                </Picker>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Enter subject"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter your message"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Attach File (Optional)</Text>
              <TouchableOpacity style={styles.fileButton} onPress={handleFilePicker}>
                <IconSymbol name="paperclip" size={20} color="#007AFF" />
                <Text style={styles.fileButtonText}>
                  {attachedFile ? attachedFile : 'Choose File'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      );
    } else {
      return (
        <View style={styles.preLoginContainer}>
          <View style={styles.preLoginHeader}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={styles.preLoginContent}>
            <Text style={styles.title}>Send a Message</Text>

            <View style={styles.formSection}>
              <Text style={styles.label}>Feedback Type *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={feedbackType}
                  onValueChange={setFeedbackType}
                  style={styles.picker}
                >
                  <Picker.Item label="Request" value="request" />
                  <Picker.Item label="Suggestions" value="suggestions" />
                </Picker>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Enter subject"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter your message"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Attach File (Optional)</Text>
              <TouchableOpacity style={styles.fileButton} onPress={handleFilePicker}>
                <IconSymbol name="paperclip" size={20} color="#007AFF" />
                <Text style={styles.fileButtonText}>
                  {attachedFile ? attachedFile : 'Choose File'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <TouchableOpacity onPress={() => onNavigate('login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}

      {isPostLogin && (
        <SideMenu
          visible={showSideMenu}
          onClose={() => setShowSideMenu(false)}
          onNavigate={onNavigate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preLoginContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preLoginHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  preLoginContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    paddingTop: 12,
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  fileButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});