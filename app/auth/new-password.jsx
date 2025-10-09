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
    ScrollView,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SetNewPasswordScreen() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Handle back navigation
    const handleBack = () => {
        router.back();
    };

    // Validate password
    const validatePassword = (text) => {
        setPassword(text);
        setPasswordError('');
        
        if (text && text.length < 8) {
            setPasswordError('Create a password with at least 8 characters');
        }
    };

    // Validate confirm password
    const validateConfirmPassword = (text) => {
        setConfirmPassword(text);
        setConfirmError('');
        
        if (text && text !== password) {
            setConfirmError('Passwords do not match');
        }
    };

    // Handle reset password
    const handleResetPassword = async () => {
        let hasError = false;

        // Reset errors
        setPasswordError('');
        setConfirmError('');

        // Validate password
        if (!password) {
            setPasswordError('Create a password with at least 8 characters');
            hasError = true;
        } else if (password.length < 8) {
            setPasswordError('Create a password with at least 8 characters');
            hasError = true;
        }

        // Validate confirm password
        if (!confirmPassword) {
            setConfirmError('Please confirm your password');
            hasError = true;
        } else if (password !== confirmPassword) {
            setConfirmError('Passwords do not match');
            hasError = true;
        }

        if (hasError) return;

        try {
            setShowSuccessModal(true);
        } catch (error) {
            // Handle error
        }
    };

    // Handle sign in from modal
    const handleSignIn = () => {
        setShowSuccessModal(false);
        router.push('/auth/signin');
    };

    // Check if form is valid
    const isFormValid = password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Set New Password</Text>
                    <Text style={styles.subtitle}>Must be at least 8 characters</Text>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    passwordError && styles.inputError,
                                    styles.passwordInput
                                ]}
                                value={password}
                                onChangeText={validatePassword}
                                placeholder="••••••••"
                                placeholderTextColor="#CCCCCC"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError && (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        )}
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm your password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    confirmError && styles.inputError,
                                    styles.passwordInput
                                ]}
                                value={confirmPassword}
                                onChangeText={validateConfirmPassword}
                                placeholder="••••••••"
                                placeholderTextColor="#CCCCCC"
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {confirmError && (
                            <Text style={styles.errorText}>{confirmError}</Text>
                        )}
                    </View>

                    <View style={styles.spacer} />

                    {/* Reset Button */}
                    <TouchableOpacity
                        style={[styles.resetButton, !isFormValid && styles.resetButtonDisabled]}
                        onPress={handleResetPassword}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.resetButtonText}>Send Code</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Success Modal */}
            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.checkmarkContainer}>
                            <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
                        </View>
                        
                        <Text style={styles.modalTitle}>All done!</Text>
                        <Text style={styles.modalSubtitle}>
                            Your password has been reset. You can proceed to sign into your account.
                        </Text>

                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={handleSignIn}
                        >
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 16,
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
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 8,
        fontWeight: '500',
    },
    passwordContainer: {
        position: 'relative',
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
    inputError: {
        borderColor: '#FF6B6B',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 14,
        padding: 4,
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 13,
        marginTop: 6,
    },
    spacer: {
        flex: 1,
    },
    resetButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    resetButtonDisabled: {
        backgroundColor: '#D9DFFE',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    checkmarkContainer: {
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
        lineHeight: 20,
    },
    signInButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 8,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});