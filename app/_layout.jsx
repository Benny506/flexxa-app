import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding-slider" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="age-verification/index" />
          <Stack.Screen name="auth" />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}