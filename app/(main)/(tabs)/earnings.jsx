import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_TRANSACTIONS = [
  {
    id: '1',
    type: 'debit',
    title: 'Flex account debited',
    time: '5 hours ago',
    amount: '-N****',
    status: 'Successful',
  },
  {
    id: '2',
    type: 'credit',
    title: 'Flex account credited',
    time: '20|05|2025',
    amount: 'N****',
    status: 'Successful',
  },
  {
    id: '3',
    type: 'credit',
    title: 'Flex account credited',
    time: '2 mins ago',
    amount: 'N****',
    status: 'Successful',
  },
  {
    id: '4',
    type: 'debit',
    title: 'Flex account debited',
    time: '20|05|2025',
    amount: '-N****',
    status: 'Failed',
  },
];

const EarningsScreen = () => {
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(true);

  // Mock data
  const availableBalance = 15000;
  const totalEarnings = 50000;
  const pendingEarnings = 2000;

  const handleWithdrawPress = () => {
    router.push('/(main)/earnings/withdraw');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>My Earnings</Text>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setBalanceVisible(!balanceVisible)}
          >
            <Ionicons
              name={balanceVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#fff"
            />
          </Pressable>

          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? `N${availableBalance.toLocaleString()}.00` : 'N****'}
          </Text>

          <View style={styles.balanceDetails}>
            <Text style={styles.detailText}>
              Total earnings: {balanceVisible ? `N${totalEarnings.toLocaleString()}` : 'N****'}
            </Text>
            <Text style={styles.detailText}>
              Pending earnings: {balanceVisible ? `N${pendingEarnings.toLocaleString()}` : 'N****'}
            </Text>
          </View>
        </View>

        {/* Withdraw Button */}
        <Pressable style={styles.withdrawButton} onPress={handleWithdrawPress}>
          <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
        </Pressable>

        {/* Payout History */}
        <Text style={styles.sectionTitle}>Payout History</Text>

        {DUMMY_TRANSACTIONS.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.iconCircle,
                  transaction.type === 'credit' ? styles.creditCircle : styles.debitCircle,
                ]}
              >
                <Ionicons
                  name={transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={transaction.type === 'credit' ? '#4CAF50' : '#F44336'}
                />
              </View>
              <View style={styles.transactionInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  {transaction.title.includes('debited') && transaction.time === '5 hours ago' && (
                    <Ionicons name="information-circle" size={18} color="#D946A6" style={{ marginLeft: 4 }} />
                  )}
                </View>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              <Text
                style={[
                  styles.transactionStatus,
                  transaction.status === 'Failed' && styles.failedStatus,
                ]}
              >
                {transaction.status}
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#D946A6',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  balanceLabel: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
    textAlign: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  withdrawButton: {
    backgroundColor: '#5B5BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  creditCircle: {
    backgroundColor: '#E8F5E9',
  },
  debitCircle: {
    backgroundColor: '#FFEBEE',
  },
  transactionInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  transactionTime: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  transactionStatus: {
    fontSize: 13,
    color: '#4CAF50',
    marginTop: 4,
  },
  failedStatus: {
    color: '#F44336',
  },
});

export default EarningsScreen;