import { Stack } from 'expo-router';

export default function OnboardingLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="upload-id" />
            <Stack.Screen name="selfie-verication" />
            {/* <Stack.Screen name="interests" />
            <Stack.Screen name="add-photos" /> */}
        </Stack>
    );
}