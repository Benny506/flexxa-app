import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="gender-selection" />
            <Stack.Screen name="lifestyle-preferences" />
            <Stack.Screen name="health-allergies" />
            <Stack.Screen name="interests" />
            <Stack.Screen name="add-photos" />
        </Stack>
    );
}