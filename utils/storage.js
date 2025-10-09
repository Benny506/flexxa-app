import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'hasSeenOnboarding';

export const setOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error setting onboarding status:', error);
  }
};

export const hasSeenOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

export const clearOnboarding = async () => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.error('Error clearing onboarding:', error);
  }
};
