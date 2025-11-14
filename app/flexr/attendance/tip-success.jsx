import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TipSuccessScreen() {
  const handleGoHome = () => {
    router.push('/flexr/(tab)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Tip Successful!</Text>
        <Text style={styles.message}>
          Your tip was successful. Your rating and review has been recorded.
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Home</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  successIconContainer: {
    marginBottom: 32,
  },
  checkmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  bottomContainer: {
    padding: 24,
    paddingTop: 16,
  },
  homeButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});