import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../../components/back-button';
import ReusableModal from '../../../../components/ReusableModal';

export default function SecurityScreen() {
  const [appLock, setAppLock] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricType, setBiometricType] = useState('fingerprint');

  const handleChangePassword = () => {
    router.push('/menu/security/change-password');
  };

  const handleVerifyIdentity = () => {
    setShowVerifyModal(true);
  };

  const handleBiometricAuth = (type) => {
    setBiometricType(type);
    setShowVerifyModal(false);
    setShowBiometricModal(true);
    
    // Simulate biometric authentication
    setTimeout(() => {
      setShowBiometricModal(false);
    }, 2000);
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
            <Feather name="chevron-right" size={26} color="#1e1e1e" />
          </TouchableOpacity>

          {/* Verify Identity */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleVerifyIdentity}
          >
            <Text style={styles.menuItemText}>Verify Identity</Text>
            <Feather name="chevron-right" size={26} color="#1e1e1e" />
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

      {/* Verify Identity Modal */}
      <Modal
        visible={showVerifyModal}
        transparent
        animationType="fade"
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
      <Modal
        visible={showBiometricModal}
        transparent
        animationType="fade"
      >
        <View style={styles.biometricModalOverlay}>
          <View style={styles.biometricModalContent}>
            {biometricType === 'face' ? (
              <MaterialCommunityIcons
                name="face-recognition"
                size={80}
                color="#1F2937"
              />
            ) : (
              <Ionicons
                name="finger-print"
                size={80}
                color="#1F2937"
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f6fd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
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
  biometricModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricModalContent: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});