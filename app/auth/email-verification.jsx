import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NumericKeyboard from '../../components/keyboard';

export default function EmailVerification() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(90); // 01:30
    const [canResend, setCanResend] = useState(false);
    const [showResendSuccess, setShowResendSuccess] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
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
    }, [timer]);

    // Format timer display
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleBack = () => {
        router.back();
    };

    // Handle OTP input from keyboard
    const handleOtpPress = (digit) => {
        const emptyIndex = otp.findIndex(val => val === '');
        if (emptyIndex !== -1) {
            const newOtp = [...otp];
            newOtp[emptyIndex] = digit;
            setOtp(newOtp);
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
            setShowResendSuccess(false);
        }
    };

    // Handle OTP verification
    const handleContinue = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) return;

        try {
            router.push('/auth/setup-profile');
        } catch (error) {
            Alert.alert('Error', 'Invalid verification code. Please try again.');
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

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowResendSuccess(false);
            }, 3000);
        } catch (error) {
            Alert.alert('Error', 'Failed to resend code. Please try again.');
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.flex}>
                {/* Header */}
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>Email Verification</Text>
                <Text style={styles.subtitle}>
                    We've sent a 6-digit code to your email
                </Text>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <View
                            key={index}
                            style={[
                                styles.otpBox,
                                digit !== '' && styles.otpBoxFilled,
                            ]}
                        >
                            <Text style={styles.otpDigit}>{digit}</Text>
                        </View>
                    ))}
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.continueButton, !isOtpComplete && styles.continueButtonDisabled]}
                    onPress={handleContinue}
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

                {/* Success Message */}
                {showResendSuccess && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successText}>
                            A new OTP has been sent to your email
                        </Text>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    </View>
                )}

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
        fontSize: 24,
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20,
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
    otpDigit: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
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
        marginBottom: 16,
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
    keyboardSpacer: {
        flex: 1,
    },
});