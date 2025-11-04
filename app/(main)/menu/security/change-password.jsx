import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../../components/back-button';
import ReusableModal from '../../../../components/ReusableModal';

export default function ChangePasswordScreen() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isFormValid = () => {
    return (
      passwordData.oldPassword.length > 0 &&
      passwordData.newPassword.length > 0 &&
      passwordData.confirmPassword.length > 0
    );
  };

  const handleSavePassword = () => {
    if (passwordData.oldPassword !== 'Kdieu2') {
      setPasswordError('Incorrect password');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    setShowSuccessModal(true);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Change Password</Text>

          <Text style={styles.label}>Enter old password</Text>
          <View style={[
            styles.inputContainer,
            passwordError ? styles.inputError : null
          ]}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#D1D5DB"
              value={passwordData.oldPassword}
              onChangeText={(text) => {
                setPasswordData({ ...passwordData, oldPassword: text });
                setPasswordError('');
              }}
              secureTextEntry={!showPasswords.old}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPasswords({ ...showPasswords, old: !showPasswords.old })
              }
            >
              <Feather
                name={showPasswords.old ? 'eye' : 'eye-off'}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}

          <Text style={styles.label}>Enter new password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#D1D5DB"
              value={passwordData.newPassword}
              onChangeText={(text) =>
                setPasswordData({ ...passwordData, newPassword: text })
              }
              secureTextEntry={!showPasswords.new}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPasswords({ ...showPasswords, new: !showPasswords.new })
              }
            >
              <Feather
                name={showPasswords.new ? 'eye' : 'eye-off'}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm new password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#D1D5DB"
              value={passwordData.confirmPassword}
              onChangeText={(text) =>
                setPasswordData({ ...passwordData, confirmPassword: text })
              }
              secureTextEntry={!showPasswords.confirm}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPasswords({
                  ...showPasswords,
                  confirm: !showPasswords.confirm,
                })
              }
            >
              <Feather
                name={showPasswords.confirm ? 'eye' : 'eye-off'}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            isFormValid() ? styles.saveButtonActive : styles.saveButtonInactive
          ]}
          onPress={handleSavePassword}
          disabled={!isFormValid()}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <ReusableModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.back();
        }}
        title="Success!"
        message="Your password has been changed successfully."
        icon="check-circle"
        iconColor="#4CAF50"
        iconBgColor="#E8F5E9"
        primaryButton={{
          text: 'Done',
          onPress: () => {
            setShowSuccessModal(false);
            router.back();
          },
          backgroundColor: '#4CAF50',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 10,
    marginTop: 20,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    height: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 6,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  forgotText: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  saveButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: '#484ED4',
  },
  saveButtonInactive: {
    backgroundColor: '#C7D2FE',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});