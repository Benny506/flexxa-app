import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TipFlexScreen() {
  // Get navigation parameters
  const params = useLocalSearchParams();
  const { flexName, flexId, eventId, eventName, suggestedTip } = params;

  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');

  const quickAmounts = [10000, 20000, 50000, 100000];

  const MIN_TIP = 5000;
  const MAX_TIP = 150000;

  const paymentMethods = [
    {
      id: 'visa',
      name: 'Visa debit',
      cardNumber: '••••••6920',
      expiry: '09/26',
      isDefault: true,
      icon: 'VISA',
    },
    {
      id: 'paypal',
      name: 'Paypal',
      icon: 'PAYPAL',
    },
    {
      id: 'debit',
      name: 'Debit Card',
      icon: 'CARD',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'BANK',
    },
  ];

  // Initialize with suggested tip if provided
  useEffect(() => {
    if (suggestedTip) {
      const tipValue = parseInt(suggestedTip);
      setSelectedAmount(tipValue);
      
      // If it's a quick amount, clear custom input
      if (quickAmounts.includes(tipValue)) {
        setCustomAmount('');
      } else {
        // If it's a custom amount, show it in the custom input
        setCustomAmount(suggestedTip);
      }
    }
  }, [suggestedTip]);

  const handleQuickAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    if (numericValue) {
      setSelectedAmount(parseInt(numericValue));
    }
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const handleTip = () => {
    if (selectedAmount < MIN_TIP || selectedAmount > MAX_TIP) {
      alert(`Tip amount must be between ${formatCurrency(MIN_TIP)} and ${formatCurrency(MAX_TIP)}`);
      return;
    }
    
    // Process tip payment
    console.log('Processing tip:', {
      amount: selectedAmount,
      paymentMethod: selectedPaymentMethod,
      flexId,
      flexName,
      eventId,
      eventName,
    });
    
    // Navigate to success screen with context
    router.push({
      pathname: '/flexr/attendance/tip-success',
      params: {
        amount: selectedAmount,
        flexName: flexName,
        flexId: flexId,
      }
    });
  };

  const isAmountValid = selectedAmount >= MIN_TIP && selectedAmount <= MAX_TIP;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {flexName ? `Tip ${flexName}` : 'Tip Your Flex'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Amount Selection */}
        <View style={styles.section}>
          <View style={styles.quickAmountGrid}>
            {quickAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.quickAmountButton,
                  selectedAmount === amount && !customAmount && styles.quickAmountButtonActive,
                ]}
                onPress={() => handleQuickAmount(amount)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    selectedAmount === amount && !customAmount && styles.quickAmountTextActive,
                  ]}
                >
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Amount Input */}
        <View style={styles.section}>
          <TextInput
            style={styles.customInput}
            placeholder="Input amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={handleCustomAmountChange}
          />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>ⓘ</Text>
            <Text style={styles.infoText}>
              Min tip amount is {formatCurrency(MIN_TIP)}. Max tip amount is {formatCurrency(MAX_TIP)}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === method.id && styles.paymentMethodActive,
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.radioOuter}>
                {selectedPaymentMethod === method.id && <View style={styles.radioInner} />}
              </View>

              <View style={styles.paymentMethodContent}>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
                {method.cardNumber && (
                  <Text style={styles.paymentMethodDetails}>
                    {method.cardNumber}  •  Expires: {method.expiry}
                  </Text>
                )}
              </View>

              <View style={styles.paymentMethodRight}>
                {method.icon === 'VISA' && (
                  <View style={styles.visaLogo}>
                    <Text style={styles.visaText}>VISA</Text>
                  </View>
                )}
                {method.icon === 'PAYPAL' && (
                  <View style={styles.paypalLogo}>
                    <Text style={styles.paypalText}>P</Text>
                  </View>
                )}
                {method.icon === 'CARD' && (
                  <View style={styles.cardLogos}>
                    <View style={styles.mastercardCircle} />
                    <View style={[styles.mastercardCircle, styles.mastercardCircle2]} />
                    <View style={styles.visaLogoSmall}>
                      <Text style={styles.visaTextSmall}>VISA</Text>
                    </View>
                  </View>
                )}
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.tipButton, !isAmountValid && styles.tipButtonDisabled]}
          onPress={handleTip}
          disabled={!isAmountValid}
          activeOpacity={0.8}
        >
          <Text style={styles.tipButtonText}>
            Tip {formatCurrency(selectedAmount || 0)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  quickAmountButtonActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  quickAmountText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  quickAmountTextActive: {
    color: '#4F46E5',
  },
  customInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    gap: 8,
  },
  infoIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  paymentMethodActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#FAFAFA',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  paymentMethodDetails: {
    fontSize: 13,
    color: '#6B7280',
  },
  paymentMethodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visaLogo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#1A1F71',
    borderRadius: 4,
  },
  visaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  paypalLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#003087',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paypalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mastercardCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EB001B',
  },
  mastercardCircle2: {
    backgroundColor: '#F79E1B',
    marginLeft: -8,
  },
  visaLogoSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#1A1F71',
    borderRadius: 3,
    marginLeft: 4,
  },
  visaTextSmall: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EEF2FF',
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4F46E5',
  },
  bottomContainer: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#fff',
  },
  tipButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tipButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  tipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});