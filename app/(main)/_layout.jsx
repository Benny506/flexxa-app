import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="event-details" />
    </Stack>
  );
}