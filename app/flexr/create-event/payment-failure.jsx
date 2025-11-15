import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentFailure() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    flexReward = '5000',
    numberOfFlexes = '20',
    totalFlexReward = '100000',
    platformFee = '10000',
    total = '110000',
  } = params;

  const handleTryAgain = () => {
    // Go back to checkout
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Failure Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.failureIcon}>
            <Ionicons name="close" size={48} color="#FFF" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Payment Failed!</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {"We can't process your payment. Check your card details and try again."}
        </Text>

        {/* Payment Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Flex Reward:</Text>
            <Text style={styles.summaryValue}>
              ₦{parseInt(flexReward).toLocaleString()} per Flex x {numberOfFlexes} Flexes = ₦{parseInt(totalFlexReward).toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee:</Text>
            <Text style={styles.summaryValue}>₦{parseInt(platformFee).toLocaleString()}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payment Amount</Text>
            <Text style={styles.totalValue}>₦{parseInt(total).toLocaleString()}</Text>
          </View>
        </View>

        {/* Try Again Button */}
        <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  failureIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  summaryContainer: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#484ED4',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});