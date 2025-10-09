import React, { useState, useEffect } from 'react';
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
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NumericKeyboard from '../../components/keyboard';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [step, setStep] = useState('email'); // 'email', 'phone', 'otp'
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [timer, setTimer] = useState(90); // 01:30
    const [canResend, setCanResend] = useState(false);
    const [showResendSuccess, setShowResendSuccess] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (step === 'otp' && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    // Format timer display
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle back navigation
    const handleBack = () => {
        if (step === 'otp') {
            setStep('email');
            setOtp(['', '', '', '', '', '']);
            setOtpError('');
            setTimer(90);
            setCanResend(false);
        } else {
            router.back();
        }
    };

    // Toggle between email and phone
    const toggleInputMethod = () => {
        if (step === 'email') {
            setStep('phone');
            setEmail('');
        } else if (step === 'phone') {
            setStep('email');
            setPhone('');
        }
    };

    // Handle send code
    const handleSendCode = async () => {
        const identifier = step === 'email' ? email : phone;

        if (!identifier) return;

        try {
            setStep('otp');
            setTimer(90);
            setCanResend(false);
            setShowResendSuccess(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to send code. Please try again.');
        }
    };

    // Handle OTP input from keyboard
    const handleOtpPress = (digit) => {
        const emptyIndex = otp.findIndex(val => val === '');
        if (emptyIndex !== -1) {
            const newOtp = [...otp];
            newOtp[emptyIndex] = digit;
            setOtp(newOtp);
            setOtpError('');
            setShowResendSuccess(false);
        }
    };

    // Handle OTP delete
    const handleOtpDelete = () => {
        const lastFilledIndex = otp.map((val, idx) => val !== '' ? idx : -1)
            .filter(idx => idx !== -1)
            .pop();

        if (lastFilledIndex !== undefined && lastFilledIndex >= 0) {
            const newOtp = [...otp];
            newOtp[lastFilledIndex] = '';
            setOtp(newOtp);
            setOtpError('');
            setShowResendSuccess(false);
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) return;

        try {
            router.push('/auth/new-password');
        } catch (error) {
            setOtpError('Invalid OTP! Please re-enter correctly');
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            setTimer(90);
            setCanResend(false);
            setShowResendSuccess(true);
            setOtp(['', '', '', '', '', '']);
            setOtpError('');

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowResendSuccess(false);
            }, 3000);
        } catch (error) {
            Alert.alert('Error', 'Failed to resend code. Please try again.');
        }
    };

    // Check if form is valid
    const isFormValid = step === 'email' ? email.length > 0 : phone.length > 0;
    const isOtpComplete = otp.every(digit => digit !== '');

    // Render email/phone input step
    if (step === 'email' || step === 'phone') {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.flex}>
                    {/* Header */}
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>
                        Enter the email address you registered with for instructions.
                    </Text>

                    {/* Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            {step === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={step === 'email' ? email : phone}
                            onChangeText={step === 'email' ? setEmail : setPhone}
                            placeholder={step === 'email' ? 'johndoe@email.com' : '00000000000'}
                            keyboardType={step === 'email' ? 'email-address' : 'phone-pad'}
                            autoCapitalize="none"
                            autoComplete={step === 'email' ? 'email' : 'tel'}
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
                                {step === 'email' ? 'Use phone number instead' : 'Use email address instead'}
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

    // Render OTP verification step
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.flex}>
                {/* Header */}
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.otpSubtitle}>
                    We've sent a code to{' '}
                    <Text style={styles.identifier}>{email || phone}</Text>
                </Text>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <View
                            key={index}
                            style={[
                                styles.otpBox,
                                digit !== '' && styles.otpBoxFilled,
                                otpError && styles.otpBoxError
                            ]}
                        >
                            <Text style={styles.otpDigit}>{digit}</Text>
                        </View>
                    ))}
                </View>

                {/* Error Message */}
                {otpError && (
                    <Text style={styles.otpErrorText}>{otpError}</Text>
                )}

                {/* Success Message */}
                {showResendSuccess && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successText}>
                            A new OTP has been sent to your email
                        </Text>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    </View>
                )}

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.continueButton, !isOtpComplete && styles.continueButtonDisabled]}
                    onPress={handleVerifyOtp}
                    disabled={!isOtpComplete}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                {/* Timer and Resend */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatTimer(timer)}</Text>
                    <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
                        <Text style={[styles.resendText, canResend && styles.resendTextActive]}>
                            Send again
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.keyboardSpacer} />

                {/* Custom Numeric Keyboard */}
                <NumericKeyboard onPress={handleOtpPress} onDelete={handleOtpDelete} />
            </View>
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
    otpSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
        lineHeight: 20,
    },
    identifier: {
        color: '#1a1a1a',
        fontWeight: '600',
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 16,
    },
    otpBox: {
        width: 48,
        height: 56,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    otpBoxFilled: {
        borderColor: '#5B7FFF',
        backgroundColor: '#F5F7FF',
    },
    otpBoxError: {
        borderColor: '#FF6B6B',
        backgroundColor: '#FFF5F5',
    },
    otpDigit: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    otpErrorText: {
        color: '#FF6B6B',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 16,
    },
    successMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F5E9',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
        gap: 8,
    },
    successText: {
        color: '#4CAF50',
        fontSize: 13,
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    continueButtonDisabled: {
        backgroundColor: '#D9DFFE',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    timerText: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '600',
        marginBottom: 8,
    },
    resendText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
    },
    resendTextActive: {
        color: '#5B7FFF',
    },
    keyboardSpacer: {
        flex: 1,
    },
});