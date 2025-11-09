import { Stack } from 'expo-router';

export default function EventSetupLayout() {
  return (
    <Stack initialRouteName='event-setup' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="event-setup" />
      <Stack.Screen name="event-time-setup" />
      <Stack.Screen name="media-and-summary" />
    </Stack>
  );
}