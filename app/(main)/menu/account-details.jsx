import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button';
import ReusableModal from '../../../components/ReusableModal';
import AppLoading from '../../../components/loaders/AppLoading';

export default function AccountDetailsScreen() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    emergencyEmail: '',
    emergencyPhone: '',
    state: '',
    homeAddress: '',
    bankName: '',
    accountNumber: '',
    accountName: 'John Doe',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const requiredFields = [
      'emergencyEmail',
      'emergencyPhone',
      'state',
      'homeAddress',
      'bankName',
      'accountNumber',
    ];

    const allFilled = requiredFields.every(
      field => formData[field] && formData[field].trim() !== ''
    );

    setIsFormValid(allFilled);
  }, [formData]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }

    if (field === 'accountNumber' && value.length === 10) {
      setTimeout(() => {
        setFormData(prev => ({ ...prev, accountName: 'John Doe' }));
      }, 500);
    } else if (field === 'accountNumber' && value.length < 10) {
      setFormData(prev => ({ ...prev, accountName: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emergencyEmail.includes('@')) {
      newErrors.emergencyEmail = 'Invalid email address';
    }

    if (formData.emergencyPhone.length < 10) {
      newErrors.emergencyPhone = 'Invalid phone number';
    }

    if (!formData.accountNumber || formData.accountNumber.length !== 10) {
      newErrors.accountNumber = 'Invalid account details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm() || !isFormValid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
      setFormData({
        emergencyEmail: "",
        emergencyPhone: "",
        state: "",
        homeAddress: "",
        bankName: "",
        accountNumber: ""
      });
    }, 2000);
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Account details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={20} color="#484ED4" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Emergency Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>

              <TextInput
                style={[
                  styles.input,
                  errors.emergencyEmail && styles.inputError,
                ]}
                placeholder="email address"
                placeholderTextColor="#999"
                value={formData.emergencyEmail}
                onChangeText={(text) =>
                  handleInputChange('emergencyEmail', text)
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.emergencyEmail && (
                <Text style={styles.errorText}>{errors.emergencyEmail}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  errors.emergencyPhone && styles.inputError,
                ]}
                placeholder="phone number"
                placeholderTextColor="#999"
                value={formData.emergencyPhone}
                onChangeText={(text) =>
                  handleInputChange('emergencyPhone', text)
                }
                keyboardType="phone-pad"
              />
              {errors.emergencyPhone && (
                <Text style={styles.errorText}>{errors.emergencyPhone}</Text>
              )}
            </View>

            {/* Residential Address */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Residential Address</Text>

              <TextInput
                style={styles.input}
                placeholder="state"
                placeholderTextColor="#999"
                value={formData.state}
                onChangeText={(text) => handleInputChange('state', text)}
              />

              <TextInput
                style={styles.input}
                placeholder="home address"
                placeholderTextColor="#999"
                value={formData.homeAddress}
                onChangeText={(text) =>
                  handleInputChange('homeAddress', text)
                }
              />
            </View>

            {/* Withdrawal Bank */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Withdrawal Bank</Text>

              <TextInput
                style={styles.input}
                placeholder="bank name"
                placeholderTextColor="#999"
                value={formData.bankName}
                onChangeText={(text) => handleInputChange('bankName', text)}
              />

              <TextInput
                style={[
                  styles.input,
                  errors.accountNumber && styles.inputError,
                ]}
                placeholder="account number"
                placeholderTextColor="#999"
                value={formData.accountNumber}
                onChangeText={(text) =>
                  handleInputChange('accountNumber', text)
                }
                keyboardType="number-pad"
                maxLength={10}
              />

              {errors.accountNumber && (
                <Text style={styles.errorText}>{errors.accountNumber}</Text>
              )}

              {formData.accountName && !errors.accountNumber && (
                <Text style={styles.accountName}>
                  Account name: {formData.accountName}
                </Text>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!isFormValid || loading) && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!isFormValid || loading}
              activeOpacity={isFormValid && !loading ? 0.7 : 1}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  (!isFormValid || loading) && styles.saveButtonTextDisabled,
                ]}
              >
                Save Details
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <ReusableModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Account details Saved!"
        hideFooter={true}
        styles={{
          modalContainer: {
            paddingVertical: 18,
            paddingHorizontal: 40,
            borderRadius: 12,
          },
          title: {
            fontSize: 16,
            marginBottom: 0,
            fontWeight: '500',
          },
        }}
      />

      {/* Loading */}
      <AppLoading tempLoading={loading} loadingText="Saving details..." />
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
    fontWeight: '600',
    color: '#000',
  },
  editButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 13,
    marginTop: -8,
    marginBottom: 12,
  },
  accountName: {
    fontSize: 14,
    color: '#666',
    marginTop: -8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#484ED4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#C7C7E8',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#E8E9F5',
  },
});