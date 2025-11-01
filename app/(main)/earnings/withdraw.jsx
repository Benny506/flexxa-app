import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ReusableModal from '../../../components/ReusableModal';
import AppLoading from '../../../components/loaders/AppLoading';

const WithdrawFundsScreen = () => {
  const router = useRouter();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data
  const availableBalance = 15000;
  const accountDetails = 'Access bank - ****1234';

  const handleGenerateOTP = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (parseFloat(withdrawAmount) > availableBalance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    setIsGeneratingOTP(true);

    // Simulate OTP generation
    setTimeout(() => {
      setIsGeneratingOTP(false);
      setShowOTPModal(true);
    }, 1500);
  };

  const handleConfirmWithdrawal = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    setWithdrawAmount('');
    setOtp('');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Withdraw funds</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="alert-circle" size={20} color="#D946A6" />
          <Text style={styles.infoText}>
            Funds will be sent to the account added to your profile. To add or edit payment method visit account settings.
          </Text>
        </View>

        {/* Amount to Withdraw */}
        <View style={styles.section}>
          <Text style={styles.label}>Amount to Withdraw</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g N3000 maximum withdrawable amount"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
          />
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.label}>Account Details</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={accountDetails}
            editable={false}
          />
        </View>

        {/* Enter OTP */}
        <View style={styles.section}>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <Pressable onPress={handleGenerateOTP}>
            <Text style={styles.generateOTP}>Generate OTP</Text>
          </Pressable>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={[
            styles.confirmButton,
            (!withdrawAmount || !otp) && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmWithdrawal}
          disabled={!withdrawAmount || !otp}
        >
          <Text style={styles.confirmButtonText}>Confirm Withdrawal</Text>
        </Pressable>
      </View>

      {/* Generating OTP Loader */}
      <AppLoading 
        tempLoading={isGeneratingOTP} 
        loadingText="Generating OTP..."
      />

      {/* OTP Modal */}
      <ReusableModal
        visible={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        // icon="mail"
        // iconColor="#5B5BFF"
        // iconBgColor="#E8E8FF"
        title="OTP Sent!"
        message="We've sent you OTP to your number"
        primaryButton={{
          text: 'OK',
          onPress: () => setShowOTPModal(false),
          backgroundColor: 'transparent',
          style: { borderWidth: 1, borderColor: '#484ED4' },
          textColor: '#484ED4',
        }}
      />

      {/* Processing Withdrawal Loader */}
      <AppLoading 
        tempLoading={isProcessing}
        loadingText="Processing Withdrawal..."
      />

      {/* Success Modal */}
      <ReusableModal
        visible={showSuccessModal}
        onClose={handleDone}
        // icon="checkmark-circle"
        // iconColor="#4CAF50"
        // iconBgColor="#E8F5E9"
        title="Withdrawal Successful!"
        message={`Your withdrawal of N${withdrawAmount} has been processed successfully. Funds has been sent to you!`}
        primaryButton={{
          text: 'Done',
          onPress: handleDone,
          backgroundColor: 'transparent',
          style: { borderWidth: 1, borderColor: '#484ED4', paddingVertical: 20 },
          textColor: '#484ED4',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFE8F5',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#D946A6',
    marginLeft: 8,
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  generateOTP: {
    fontSize: 14,
    color: '#5B5BFF',
    fontWeight: '600',
    marginTop: 12,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#5B5BFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#D0D0FF',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default WithdrawFundsScreen;