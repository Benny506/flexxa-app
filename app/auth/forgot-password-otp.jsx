import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import BackButton from '../../components/back-button';
import NumericKeyboard from '../../components/keyboard';
import { createOrUpdateOtp } from '../../database/dbInit';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';
import { appLoadStart, appLoadStop } from '../../redux/slices/appLoadingSlice';
import { onRequestApi } from '../../utils/apiRequests/requestApi';

export default function ForgotPasswordOtpScreen() {
    const dispatch = useDispatch()

    const { goBack } = useAppNavigation()

    const router = useRouter();
    const params = useLocalSearchParams();

    const { identifier, method } = params;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [timer, setTimer] = useState(null); // 01:30
    const [canResend, setCanResend] = useState(true);
    const [showResendSuccess, setShowResendSuccess] = useState(false);
    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

    useEffect(() => {
        if (!identifier || !method) {
            goBack()
            return;
        }

        if (method === 'email') {
            setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'createOtp'
                }
            })
        }
    }, [])

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if (isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if (isLoading && data) {
            const { type, requestInfo } = data

            if (type === 'createOtp') {
                createOtp()
            }

            if (type === 'sendCodeToMail') {
                onRequestApi({
                    requestInfo,
                    successCallBack: sendCodeToMailSuccess,
                    failureCallback: apiReqError
                })
            }

            if (type == 'validateCode') {
                onRequestApi({
                    requestInfo,
                    successCallBack: validateCodeSuccess,
                    failureCallback: apiReqError
                })
            }
        }
    }, [apiReqs])

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

    const validateCodeSuccess = async () => {

        try {

            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            router.push({
                pathname: '/auth/new-password',
                params: {
                    email: identifier
                }
            });

            dispatch(setAppAlert({ msg: 'Code validated!', type: 'success' }))

            return;

        } catch (error) {
            const errorMsg = 'Invalid OTP! Please re-enter correctly'
            setOtpError(errorMsg);
            return apiReqError({ errorMsg })
        }
    };

    const sendCodeToMailSuccess = async ({ }) => {
        try {

            handleResendOtp()
            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            dispatch(setAppAlert({ msg: 'Code sent!', type: 'success' }))

            return;

        } catch (error) {
            console.log(error)
            return apiReqError({ errorMsg: 'Something went wrong! Try again.' })
        }
    }

    const createOtp = async () => {
        try {

            //right now, this will ONLY work with email addresses

            const email = identifier

            const { error, token } = await createOrUpdateOtp({ email })

            if (error || !token) {
                console.log(error)
                throw new Error()
            }

            const code = token

            return setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'sendCodeToMail',
                    requestInfo: {
                        url: 'https://nknoqpcyjcxpoirzizgz.supabase.co/functions/v1/send-email-via-mailsender',
                        method: 'POST',
                        data: {
                            to_email: email,
                            data: {
                                code
                            },
                            template_id: '3zxk54vy3kq4jy6v',
                            subject: "Email verification"
                        }
                    }
                }
            })

        } catch (error) {
            console.log(error)
            return apiReqError({ errorMsg: 'Something went wrong! Try again.' })
        }
    }

    const apiReqError = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return
    }

    const initiateCreateOtp = () => {
        setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'createOtp'
            }
        })
    }

    if (!identifier || !method) return <></>

    // Format timer display
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'validateCode',
                    requestInfo: {
                        url: 'https://nknoqpcyjcxpoirzizgz.supabase.co/functions/v1/verify-code',
                        method: 'POST',
                        data: {
                            code: otpCode,
                            email: identifier
                        }
                    }
                }
            })

        } catch (error) {
            dispatch(setAppAlert({ msg: 'Invalid verification code. Please try again.', type: 'error' }))
            return;
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (!canResend) return;

        // TODO: Make API call to resend OTP
        setTimer(90);
        setCanResend(false);
        setShowResendSuccess(true);
        setOtp(['', '', '', '', '', '']);
        setOtpError('');

        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowResendSuccess(false);
        }, 3000);
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            {/* Back Button */}
            <View style={{ marginBottom: 40, paddingHorizontal: 24 }}>
                <BackButton onPress={() => router.back()} />
            </View>

            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    We've sent a code to{' '}
                    <Text style={styles.identifier}>{identifier}</Text>
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
                    {
                        canResend
                        &&
                        <TouchableOpacity onPress={createOtp} disabled={!canResend}>
                            <Text style={[styles.resendText, canResend && styles.resendTextActive]}>
                                Send again
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                {/* Success Message */}
                {showResendSuccess && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successText}>
                            A new OTP has been sent to your {method === 'email' ? 'email' : 'phone'}
                        </Text>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    </View>
                )}

                <View style={styles.keyboardSpacer} />

                {/* Custom Numeric Keyboard */}
                <View style={{ marginBottom: 30 }}>
                    <NumericKeyboard onPress={handleOtpPress} onDelete={handleOtpDelete} />
                </View>

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
    identifier: {
        color: '#1a1a1a',
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
        borderColor: '#484ED4',
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
        textAlign: 'start',
        marginBottom: 16,
    },
    successMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(49, 159, 67, 0.05)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
        gap: 20,
    },
    successText: {
        color: '#319F43',
        fontSize: 13,
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
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
        color: '#484ED4',
    },
    keyboardSpacer: {
        flex: 1,
    },
});