import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'hasSeenOnboarding';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (seen === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/splash');
      }
    };
    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
