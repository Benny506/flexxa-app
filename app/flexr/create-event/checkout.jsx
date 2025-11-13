import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../../components/back-button';
import SetupHeader from '../../(main)/event-setup/auxiliary/SetupHeader';
import ReusableModal from '../../../components/ReusableModal';
import AppLoading from '../../../components/loaders/AppLoading';

export default function Checkout() {
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(90);
  const otpInputs = useRef([]);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    rememberCard: false
  });

  // Mock event data
  const eventSummary = {
    name: 'Bikini Beach Party',
    date: 'Jan 30, 2025, 4:00 PM - 10:00 PM',
    flexesRequested: '15-20 Flexes',
    duration: '5 Hours',
  };

  const costBreakdown = {
    flexReward: 5000,
    numberOfFlexes: 20,
    totalFlexReward: 100000,
    platformFee: 10,
    platformFeeAmount: 10000,
    vat: 7.5,
  };

  const calculateTotal = () => {
    const platformFeeAmount = (costBreakdown.totalFlexReward * costBreakdown.platformFee) / 100;
    const vatAmount = (costBreakdown.totalFlexReward * costBreakdown.vat) / 100;
    return costBreakdown.totalFlexReward + platformFeeAmount + vatAmount;
  };

  // OTP Timer Effect
  useEffect(() => {
    if (showOtpModal && otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showOtpModal, otpTimer]);

  // Reset OTP when modal opens
  useEffect(() => {
    if (showOtpModal) {
      setOtp(['', '', '', '', '', '']);
      setOtpTimer(90);
    }
  }, [showOtpModal]);

  const paymentMethods = [
    {
      id: 'visa',
      label: 'Visa debit',
      number: '********6920',
      expires: '09/26',
      isDefault: true,
      logo: 'VISA',
    },
    {
      id: 'paypal',
      label: 'Paypal',
      icon: 'logo-paypal',
    },
    {
      id: 'debit',
      label: 'Debit Card',
      logos: ['Mastercard', 'VISA'],
    },
    {
      id: 'bank',
      label: 'Bank Transfer',
    },
  ];

  const handlePayment = () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    // Show OTP modal for debit card
    if (selectedPaymentMethod === 'debit') {
      setShowOtpModal(true);
    } else if (selectedPaymentMethod === 'bank') {
      // For bank transfer, show processing then navigate to success
      processPayment(true);
    } else {
      processPayment();
    }
  };

  // OTP Handlers
  const formatOtpTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpConfirm = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setShowOtpModal(false);
      processPayment();
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleOtpResend = () => {
    setOtpTimer(90);
    setOtp(['', '', '', '', '', '']);
  };

  const processPayment = (alwaysSuccess = false) => {
    setShowProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setShowProcessing(false);
      
      const paymentParams = {
        flexReward: costBreakdown.flexReward,
        numberOfFlexes: costBreakdown.numberOfFlexes,
        totalFlexReward: costBreakdown.totalFlexReward,
        platformFee: costBreakdown.platformFeeAmount,
        total: calculateTotal(),
      };
      
      // Navigate to success or failure screen (70% success rate for demo)
      if (alwaysSuccess || Math.random() > 0.3) {
        router.replace({
          pathname: '/flexr/create-event/payment-success',
          params: paymentParams
        });
      } else {
        router.replace({
          pathname: '/flexr/create-event/payment-failure',
          params: paymentParams
        });
      }
    }, 2500);
  };

  const handleCopyAccount = () => {
    alert('Account number 3020202020 copied!');
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <SetupHeader activeIndex={3} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Event Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Event Name:</Text>
            <Text style={styles.summaryValue}>{eventSummary.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Event Date & Time:</Text>
            <Text style={styles.summaryValue}>{eventSummary.date}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Flexes Requested:</Text>
            <Text style={styles.summaryValue}>{eventSummary.flexesRequested}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Event Duration:</Text>
            <Text style={styles.summaryValue}>{eventSummary.duration}</Text>
          </View>
        </View>

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Flex Reward:</Text>
            <Text style={styles.summaryValue}>
              ₦{costBreakdown.flexReward.toLocaleString()} per Flex x {costBreakdown.numberOfFlexes} Flexes = ₦{costBreakdown.totalFlexReward.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee:</Text>
            <Text style={styles.summaryValue}>{costBreakdown.platformFee}%</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT:</Text>
            <Text style={styles.summaryValue}>{costBreakdown.vat}%</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payment Amount</Text>
            <Text style={styles.totalValue}>₦{calculateTotal().toLocaleString()}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {paymentMethods.map((method) => (
            <View key={method.id}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  selectedPaymentMethod === method.id && styles.paymentOptionActive
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <View style={styles.radioButton}>
                  {selectedPaymentMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>{method.label}</Text>
                  {method.number && (
                    <Text style={styles.paymentNumber}>{method.number}</Text>
                  )}
                  {method.expires && (
                    <Text style={styles.paymentExpires}>Expires: {method.expires}</Text>
                  )}
                </View>

                <View style={styles.paymentLogos}>
                  {method.id === 'visa' && (
                    <>
                      <Text style={styles.visaLogo}>VISA</Text>
                      {method.isDefault && (
                        <Text style={styles.defaultBadge}>Default</Text>
                      )}
                    </>
                  )}
                  {method.id === 'paypal' && (
                    <Ionicons name="logo-paypal" size={24} color="#003087" />
                  )}
                  {method.id === 'debit' && (
                    <View style={styles.multiLogo}>
                      <View style={styles.mastercardCircle}>
                        <View style={[styles.circle, styles.circleRed]} />
                        <View style={[styles.circle, styles.circleOrange]} />
                      </View>
                      <Text style={styles.visaLogo}>VISA</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              {/* Expanded Card Details Form */}
              {selectedPaymentMethod === 'debit' && method.id === 'debit' && (
                <View style={styles.cardDetailsContainer}>
                  <Text style={styles.cardDetailsTitle}>Securely add your card details</Text>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Card number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="0000 0000 0000 0000"
                      keyboardType="number-pad"
                      maxLength={19}
                      value={cardDetails.cardNumber}
                      onChangeText={(text) => setCardDetails({
                        ...cardDetails,
                        cardNumber: formatCardNumber(text)
                      })}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Name on card</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      value={cardDetails.nameOnCard}
                      onChangeText={(text) => setCardDetails({
                        ...cardDetails,
                        nameOnCard: text
                      })}
                    />
                  </View>

                  <View style={styles.rowInputs}>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>Expiry date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="10/26"
                        keyboardType="number-pad"
                        maxLength={5}
                        value={cardDetails.expiryDate}
                        onChangeText={(text) => setCardDetails({
                          ...cardDetails,
                          expiryDate: formatExpiryDate(text)
                        })}
                      />
                    </View>

                    <View style={[styles.inputGroup, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="222"
                        keyboardType="number-pad"
                        maxLength={3}
                        secureTextEntry
                        value={cardDetails.cvv}
                        onChangeText={(text) => setCardDetails({
                          ...cardDetails,
                          cvv: text
                        })}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.rememberCardContainer}
                    onPress={() => setCardDetails({
                      ...cardDetails,
                      rememberCard: !cardDetails.rememberCard
                    })}
                  >
                    <View style={[styles.checkbox, cardDetails.rememberCard && styles.checkboxChecked]}>
                      {cardDetails.rememberCard && (
                        <Ionicons name="checkmark" size={14} color="#FFF" />
                      )}
                    </View>
                    <Text style={styles.rememberCardText}>Remember this card</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Bank Transfer Details */}
              {selectedPaymentMethod === 'bank' && method.id === 'bank' && (
                <View style={styles.bankDetailsContainer}>
                  <Text style={styles.bankDetailsTitle}>Transfer to the bank account below</Text>
                  
                  <View style={styles.bankInfoRow}>
                    <Text style={styles.bankInfoLabel}>Bank:</Text>
                    <Text style={styles.bankInfoValue}>Sterling Bank</Text>
                  </View>

                  <View style={styles.bankInfoRow}>
                    <Text style={styles.bankInfoLabel}>Account Number:</Text>
                    <View style={styles.accountNumberRow}>
                      <Text style={styles.bankInfoValue}>3020202020</Text>
                      <TouchableOpacity onPress={handleCopyAccount}>
                        <Ionicons name="copy-outline" size={18} color="#484ED4" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.bankInfoRow}>
                    <Text style={styles.bankInfoLabel}>Account Name:</Text>
                    <Text style={styles.bankInfoValue}>Flexxa-ng</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && (
              <Ionicons name="checkmark" size={14} color="#FFF" />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            {"By completing this payment, you agree to Flexxa's terms and conditions."}
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.payButton,
            !agreeToTerms && styles.payButtonDisabled
          ]}
          onPress={handlePayment}
          disabled={!agreeToTerms}
        >
          <Text style={[styles.payButtonText, !agreeToTerms && styles.payButtonTextDisabled]}>
            {selectedPaymentMethod === 'bank' 
              ? `Pay ₦${calculateTotal().toLocaleString()} - Click here after transfer`
              : `Pay ₦${calculateTotal().toLocaleString()}`
            }
          </Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal using ReusableModal */}
      <ReusableModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        title="Input OTP"
        message="We've sent a 6-digit code to your number"
        hideFooter={true}
      >
        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputs.current[index] = ref)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent: { key } }) => handleOtpKeyPress(index, key)}
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatOtpTime(otpTimer)}</Text>
          <TouchableOpacity onPress={handleOtpResend} disabled={otpTimer > 0}>
            <Text style={[styles.resend, otpTimer > 0 && styles.resendDisabled]}>
              Send again
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.otpButtonRow}>
          <TouchableOpacity 
            style={styles.otpCancelButton} 
            onPress={() => setShowOtpModal(false)}
          >
            <Text style={styles.otpCancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.otpConfirmButton} 
            onPress={handleOtpConfirm}
          >
            <Text style={styles.otpConfirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ReusableModal>

      {/* Processing Loader using AppLoading */}
      <AppLoading 
        tempLoading={showProcessing}
        loadingText={selectedPaymentMethod === 'bank' ? 'Verifying Payment...' : 'Processing Payment...'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#999',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  paymentOptionActive: {
    borderColor: '#484ED4',
    backgroundColor: '#F8F8FE',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#484ED4',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentNumber: {
    fontSize: 13,
    color: '#666',
  },
  paymentExpires: {
    fontSize: 12,
    color: '#999',
  },
  paymentLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visaLogo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F71',
  },
  defaultBadge: {
    fontSize: 11,
    color: '#FF69B4',
    fontWeight: '600',
  },
  multiLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mastercardCircle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  circleRed: {
    backgroundColor: '#EB001B',
  },
  circleOrange: {
    backgroundColor: '#F79E1B',
    marginLeft: -6,
  },
  cardDetailsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 12,
  },
  cardDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  rememberCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rememberCardText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  bankDetailsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 12,
  },
  bankDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  bankInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankInfoLabel: {
    fontSize: 13,
    color: '#666',
  },
  bankInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  accountNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#484ED4',
    borderColor: '#484ED4',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  payButton: {
    backgroundColor: '#484ED4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#E8E9F8',
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  payButtonTextDisabled: {
    color: '#B8BAE8',
  },
  // OTP Modal Styles
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    backgroundColor: '#FFF',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  timer: {
    fontSize: 14,
    color: '#666',
  },
  resend: {
    fontSize: 14,
    color: '#484ED4',
    fontWeight: '600',
  },
  resendDisabled: {
    color: '#CCC',
  },
  otpButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  otpCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#484ED4',
    alignItems: 'center',
  },
  otpCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#484ED4',
  },
  otpConfirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#484ED4',
    alignItems: 'center',
  },
  otpConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});