import { Stack, usePathname, useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppAlert from '../components/appAlert/AppAlert';
import AppLoading from '../components/loaders/AppLoading';
import { AppNavigationProvider } from '../hooks/useAppNavigation';
import store from '../redux/store';

const { width, height } = Dimensions.get('window');
const fabSize = 60;
const edgeMargin = 12; // distance from edge

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const toggleSitemap = () =>
    pathname === '/_sitemap' ? router.back() : router.push('/_sitemap');

  // Shared values
  const translateX = useSharedValue(width - fabSize - edgeMargin);
  const translateY = useSharedValue(height / 2);

  const offsetX = useSharedValue(translateX.value);
  const offsetY = useSharedValue(translateY.value);

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Save current position when drag starts
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      // Snap horizontally
      const newX =
        translateX.value + fabSize / 2 < width / 2 ? edgeMargin : width - fabSize - edgeMargin;

      // Clamp vertically within safe area
      const topLimit = insets.top + edgeMargin;
      const bottomLimit = height - fabSize - insets.bottom - edgeMargin;
      const newY = Math.min(Math.max(translateY.value, topLimit), bottomLimit);

      // Animate to snap
      translateX.value = withSpring(newX);
      translateY.value = withSpring(newY);

      // Save snapped position
      offsetX.value = newX;
      offsetY.value = newY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

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

            {/* Draggable Sitemap FAB */}
            {__DEV__ && (
              <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.fab, animatedStyle]}>
                  <TouchableOpacity onPress={toggleSitemap} activeOpacity={0.8}>
                    <Text style={styles.fabText}>🗺️</Text>
                  </TouchableOpacity>
                </Animated.View>
              </GestureDetector>
            )}

            <AppLoading />

            <AppAlert />
            
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </Provider>
    </AppNavigationProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: fabSize,
    height: fabSize,
    borderRadius: fabSize / 2,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.5,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});