import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BackButton from '../../components/back-button';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [inputMethod, setInputMethod] = useState('email'); // 'email' or 'phone'
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Toggle between email and phone
    const toggleInputMethod = () => {
        if (inputMethod === 'email') {
            setInputMethod('phone');
            setEmail('');
        } else {
            setInputMethod('email');
            setPhone('');
        }
    };

    // Handle send code
    const handleSendCode = async () => {
        const identifier = inputMethod === 'email' ? email : phone;

        if (!identifier) return;

        try {
            // TODO: Make API call to send OTP
            // Navigate to OTP screen with the identifier
            router.push({
                pathname: '/auth/forgot-password-otp',
                params: {
                    identifier: identifier,
                    method: inputMethod
                }
            });
        } catch (error) {
            console.error('Error sending code:', error);
        }
    };

    // Check if form is valid
    const isFormValid = inputMethod === 'email' ? email.length > 0 : phone.length > 0;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            {/* Back Button */}
            <View style={{ marginBottom: 40 }}>
                <BackButton onPress={() => router.back()} />
            </View>

            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    Enter the email address you registered with for instructions.
                </Text>

                {/* Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {inputMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={inputMethod === 'email' ? email : phone}
                        onChangeText={inputMethod === 'email' ? setEmail : setPhone}
                        placeholder={inputMethod === 'email' ? 'johndoe@email.com' : '00000000000'}
                        keyboardType={inputMethod === 'email' ? 'email-address' : 'phone-pad'}
                        autoCapitalize="none"
                        autoComplete={inputMethod === 'email' ? 'email' : 'tel'}
                    />
                </View>

                <View style={styles.spacer} />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.bottomSection}
                >
                    {/* Toggle method */}
                    <TouchableOpacity onPress={toggleInputMethod} style={styles.toggleButton}>
                        <Text style={styles.toggleText}>
                            {inputMethod === 'email' ? 'Use phone number instead' : 'Use email address instead'}
                        </Text>
                    </TouchableOpacity>

                    {/* Send Code Button */}
                    <TouchableOpacity
                        style={[styles.sendButton, !isFormValid && styles.sendButtonDisabled]}
                        onPress={handleSendCode}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.sendButtonText}>Send Code</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
        paddingHorizontal: 24,
        paddingTop: 70,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1a1a1a',
    },
    spacer: {
        flex: 1,
    },
    bottomSection: {
        paddingBottom: 24,
    },
    toggleButton: {
        alignSelf: 'center',
        marginBottom: 20,
        paddingVertical: 8,
    },
    toggleText: {
        color: '#5B7FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    sendButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#D9DFFE',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});