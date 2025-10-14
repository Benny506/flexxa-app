import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppAlert from '../components/appAlert/AppAlert';
import AppLoading from '../components/loaders/AppLoading';
import { AppNavigationProvider } from '../hooks/useAppNavigation';
import store from '../redux/store';

export default function RootLayout() {
  return (
    <AppNavigationProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="splash" />
              <Stack.Screen name="onboarding-slider" />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="age-verification/index" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="verification" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(main)" />
            </Stack>
          </GestureHandlerRootView>

          <AppLoading />

          <AppAlert />

        </SafeAreaProvider>
      </Provider>
    </AppNavigationProvider>
  );
}