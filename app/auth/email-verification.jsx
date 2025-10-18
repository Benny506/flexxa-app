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
import TopInsets from '../../components/TopInsets';
import { createOrUpdateOtp } from '../../database/dbInit';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';
import { appLoadStart, appLoadStop } from '../../redux/slices/appLoadingSlice';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';
import { onRequestApi } from '../../utils/apiRequests/requestApi';

const initialTimer = 90

export default function EmailVerification() {
    const dispatch = useDispatch()

    const { goBack, fullNavigateTo } = useAppNavigation()

    const params = useLocalSearchParams()

    const router = useRouter();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(null); // 01:30
    const [timerActive, setTimerActive] = useState(false)
    const [showResendSuccess, setShowResendSuccess] = useState(false);
    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

    useEffect(() => {
        if (!params?.email) {
            goBack()
        }
    }, [])

    useEffect(() => {
        if (!params?.email) return;

        initiateCreateOtp()
    }, [])

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if (isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if (isLoading && data) {
            const { type, requestInfo } = data

            if (type === 'createOtp') {
                createOtp({ requestInfo })
            }

            if (type === 'sendCodeToMail') {
                onRequestApi({
                    requestInfo,
                    successCallBack: sendCodeToMailSuccess,
                    failureCallback: sendCodeToMailFailure
                })
            }

            if(type == 'validateCode'){
                onRequestApi({
                    requestInfo,
                    successCallBack: validateCodeSuccess,
                    failureCallback: validateCodeFailure
                })
            }

            if(type === 'createUser'){
                onRequestApi({
                    requestInfo,
                    successCallBack: createUserSuccess,
                    failureCallback: createUserFailure
                })
            }
        }
    }, [apiReqs])

    // Timer countdown
    // useEffect(() => {
    //     let count = initialTimer

    //     const interval = setInterval(() => {

    //         if(count <= 1) {
    //             setTimer(0);
    //             clearInterval(interval)
    //             return
    //         }

    //         count = count - 1

    //         setTimer(count)
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        if(timer === initialTimer){
            restartTimer()
        }
    }, [timer])

    const createUserSuccess = async ({ result }) => {
        try {

            const { user, profile, session, phoneData } = result?.data

            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            dispatch(setUserDetails({
                user, profile, session, phoneData
            }))

            fullNavigateTo({
                path: '/onboarding/gender-selection',
                params
            })
            
            dispatch(setAppAlert({ msg: 'Accont treated! Next -> Setup your profile', type: 'success' }))

            return;
            
        } catch (error) {
            console.log(error)
            return createUserFailure({ errorMsg: 'Something went wrong! Try again', type: 'error' })
        }
    }
    const createUserFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg: null, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    const validateCodeSuccess = ({}) => {
        try {

            return setApiReqs({
                isLoading: true,
                errorMsg: null,
                data: {
                    type: 'createUser',
                    requestInfo: {
                        url: 'https://nknoqpcyjcxpoirzizgz.supabase.co/functions/v1/create-user',
                        method: 'POST',
                        data: {
                            email: params?.email,
                            password: params?.password,
                            usertype: params?.usertype,
                            full_name: params?.full_name,
                            country_code: params?.country_code,
                            phone_number: params?.phone_number,
                            dob: params?.dob
                        }
                    }
                }
            })            

            
        } catch (error) {
            console.log(error)
            return validateCodeFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const validateCodeFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }    

    const restartTimer = () => {
        let count = initialTimer

        const interval = setInterval(() => {

            if(count <= 1) {
                setTimer(0);
                clearInterval(interval)
                return
            }

            count = count - 1

            setTimer(count)
        }, 1000);
    }

    const initiateCreateOtp = () => {
        setShowResendSuccess(false)

        setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                type: 'createOtp',
                requestInfo: {
                    email: params?.email
                }
            }
        })
    }

    const sendCodeToMailSuccess = async ({ }) => {
        try {

            setTimer(initialTimer)
            setShowResendSuccess(true)
            handleResendOtp()
            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            dispatch(setAppAlert({ msg: 'Code sent!', type: 'success' }))

            return;

        } catch (error) {
            console.log(error)
            return sendCodeToMailFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const sendCodeToMailFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    const createOtp = async ({ requestInfo }) => {
        try {

            const { email } = requestInfo

            const { token } = await createOrUpdateOtp({ email })

            const code = token

            if (code) {
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
            }

            throw new Error()

        } catch (error) {
            console.log(error)
            return createOtpFailure({ errorMsg: 'Something went wrong! Try again.' })
        }
    }
    const createOtpFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    if (!params?.email) return <></>

    // Format timer display
    const formatTimer = (seconds) => {
        console.log(seconds, timer)
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
                            email: params?.email
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
        setOtp(['', '', '', '', '', '']);
        initiateCreateOtp()
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    const canResend = timer === 0 ? true : false

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <TopInsets />

            {/* Back Button */}
            <View style={{ paddingHorizontal: 24 }}>
                <BackButton onPress={() => router.back()} />
            </View>

            <View style={styles.flex}>
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
                    {
                        canResend
                        ?
                            <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
                                <Text style={[styles.resendText, canResend && styles.resendTextActive]}>
                                    Send again
                                </Text>
                            </TouchableOpacity>
                        :
                            <Text style={styles.timerText}>{formatTimer(timer)}</Text>                        
                    }
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
        paddingTop: 70,
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
        borderColor: '#484ED4',
        backgroundColor: '#F5F7FF',
    },
    otpDigit: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    continueButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    continueButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
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
        color: '#484ED4',
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