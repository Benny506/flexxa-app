import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button';
import ReusableModal from '../../../components/ReusableModal';

export default function SecurityScreen() {
  const [appLock, setAppLock] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleVerifyIdentity = () => {
    setShowVerifyModal(true);
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
    setShowPasswordModal(false);
    setShowSuccessModal(true);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleBiometricAuth = (type) => {
    setShowBiometricModal(true);
    // Simulate biometric authentication
    setTimeout(() => {
      setShowBiometricModal(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Change Password */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleChangePassword}
          >
            <Text style={styles.menuItemText}>Change password</Text>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          {/* Verify Identity */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleVerifyIdentity}
          >
            <Text style={styles.menuItemText}>Verify Identity</Text>
            <Feather name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          {/* App Lock */}
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>App Lock</Text>
            <Switch
              value={appLock}
              onValueChange={setAppLock}
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={appLock ? '#484ED4' : '#F3F4F6'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal
        visible={showPasswordModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <BackButton onPress={() => setShowPasswordModal(false)} />
              <Text style={styles.modalTitle}>Change Password</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.formContent}>
              <Text style={styles.label}>Enter old password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={passwordData.oldPassword}
                  onChangeText={(text) =>
                    setPasswordData({ ...passwordData, oldPassword: text })
                  }
                  secureTextEntry={!showPasswords.old}
                />
                <TouchableOpacity
                  onPress={() =>
                    setShowPasswords({ ...showPasswords, old: !showPasswords.old })
                  }
                >
                  <Feather
                    name={showPasswords.old ? 'eye' : 'eye-off'}
                    size={20}
                    color="#999"
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
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirm new password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
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
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSavePassword}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Verify Identity Modal */}
      <Modal
        visible={showVerifyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowVerifyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <BackButton onPress={() => setShowVerifyModal(false)} />
              <Text style={styles.modalTitle}>Verify Identity</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.biometricContent}>
              <TouchableOpacity
                style={styles.biometricButton}
                onPress={() => handleBiometricAuth('face')}
              >
                <View style={styles.biometricIcon}>
                  <MaterialCommunityIcons
                    name="face-recognition"
                    size={56}
                    color="#484ED4"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.biometricButton}
                onPress={() => handleBiometricAuth('fingerprint')}
              >
                <View style={styles.biometricIcon}>
                  <Ionicons name="finger-print" size={56} color="#484ED4" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Biometric Loading Modal */}
      <ReusableModal
        visible={showBiometricModal}
        onClose={() => {}}
        message="Authenticating..."
        icon={<Ionicons name="finger-print" size={48} color="#484ED4" />}
        iconBgColor="#E8E9FF"
      />

      {/* Success Modal */}
      <ReusableModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
        message="Your security settings have been updated successfully."
        icon="check-circle"
        iconColor="#4CAF50"
        iconBgColor="#E8F5E9"
        primaryButton={{
          text: 'Done',
          onPress: () => setShowSuccessModal(false),
          backgroundColor: '#4CAF50',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  formContent: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    color: '#333',
  },
  errorText: {
    color: '#F44336',
    fontSize: 13,
    marginTop: 4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  forgotText: {
    color: '#484ED4',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#484ED4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  biometricContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 40,
  },
  biometricButton: {
    alignItems: 'center',
  },
  biometricIcon: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});