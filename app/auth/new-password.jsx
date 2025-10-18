import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ErrorMessage, Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import BackButton from '../../components/back-button';
import ErrorMsg1 from '../../components/ErrorMsg1';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';
import { appLoadStart, appLoadStop } from '../../redux/slices/appLoadingSlice';
import { onRequestApi } from '../../utils/apiRequests/requestApi';
import { passwordSchema } from '../../utils/yupSchemas/yupSchemas';



export default function SetNewPasswordScreen() {
    const dispatch = useDispatch()

    const { goBack, fullNavigateTo } = useAppNavigation()

    const router = useRouter();
    const params = useLocalSearchParams()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

    useEffect(() => {
        if (!params?.email) {
            goBack()
        }
    }, [])

    useEffect(() => {
        const { isLoading, data } = apiReqs

        if (isLoading) dispatch(appLoadStart());
        else dispatch(appLoadStop());

        if (isLoading && data) {
            const { type, requestInfo } = data

            if (type === 'resetPassword') {
                onRequestApi({
                    requestInfo,
                    successCallBack: resetPasswordSuccess,
                    failureCallback: resetPasswordFailure
                })
            }
        }
    }, [apiReqs])

    const resetPasswordSuccess = ({ }) => {
        try {

            setApiReqs({ isLoading: false, errorMsg: null, data: null })

            setShowSuccessModal(true)

            dispatch(setAppAlert({ msg: 'Password reset successful', type: 'success' }))

            return;

        } catch (error) {
            console.log(error)
            return resetPasswordFailure({ errorMsg: "Something went wrong! Try again." })
        }
    }
    const resetPasswordFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))

        return;
    }

    if (!params?.email) return <></>

    // Handle sign in from modal
    const handleSignIn = () => {
        setShowSuccessModal(false);
        fullNavigateTo({
            path: '/auth/signin'
        })
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            <Formik
                validationSchema={yup.object().shape({
                    password: passwordSchema,
                    confirmPassword: yup.string()
                        .oneOf([yup.ref("password"), null], "Passwords must match")
                        .required("Please confirm your password"),
                })}
                initialValues={{
                    password: '', confirmPassword: ''
                }}
                onSubmit={values => {
                    setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            type: 'resetPassword',
                            requestInfo: {
                                url: 'https://nknoqpcyjcxpoirzizgz.supabase.co/functions/v1/reset-password',
                                method: 'POST',
                                data: {
                                    email: params?.email,
                                    new_password: values?.password
                                }
                            }
                        }
                    })
                }}
            >
                {({ isValid, handleBlur, handleSubmit, handleChange, values, dirty }) => (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.flex}
                    >
                        {/* Back Button */}
                        <View style={{ marginBottom: 100, paddingHorizontal: 24 }}>
                            <BackButton onPress={() => router.back()} />
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Title */}
                            <Text style={styles.title}>Set New Password</Text>
                            <Text style={styles.subtitle}>Must be at least 8 characters, have at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol</Text>

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Enter your password</Text>
                                <View style={styles.passwordContainer}>
                                    <Field name="password">
                                        {({
                                            field,
                                            meta: { touched, error }
                                        }) =>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    (touched && error) && styles.inputError,
                                                    styles.passwordInput
                                                ]}
                                                placeholder="••••••••"
                                                placeholderTextColor="#CCCCCC"
                                                secureTextEntry={!showPassword}
                                                autoCapitalize="none"
                                                value={values.password}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur("password")}
                                            />
                                        }
                                    </Field>
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
                                <ErrorMessage name='password'>
                                    {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                </ErrorMessage>
                            </View>

                            {/* Confirm Password Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Confirm your password</Text>
                                <View style={styles.passwordContainer}>
                                    <Field name="confirmPassword">
                                        {({
                                            field,
                                            meta: { touched, error }
                                        }) =>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                    (touched && error) && styles.inputError,
                                                    styles.passwordInput
                                                ]}
                                                placeholder="••••••••"
                                                placeholderTextColor="#CCCCCC"
                                                secureTextEntry={!showConfirmPassword}
                                                autoCapitalize="none"
                                                value={values.confirmPassword}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur("confirmPassword")}
                                            />
                                        }
                                    </Field>
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
                                <ErrorMessage name='confirmPassword'>
                                    {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                </ErrorMessage>
                            </View>

                            <View style={styles.spacer} />

                            {/* Reset Button */}
                            <TouchableOpacity
                                style={[styles.resetButton, !(isValid && dirty) && styles.resetButtonDisabled]}
                                onPress={handleSubmit}
                                disabled={!(isValid && dirty)}
                            >
                                <Text style={styles.resetButtonText}>Reset Password</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                )}
            </Formik>

            {/* Success Modal */}
            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleSignIn}
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
        backgroundColor: '#484ED4',
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
        borderRadius: 12,
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
        backgroundColor: '#484ED4',
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