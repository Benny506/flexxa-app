import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
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
import * as yup from 'yup';
// import React from 'react';
// import { styles } from './signin';

import { useLocalSearchParams } from 'expo-router';
import { ErrorMessage, Field, Formik } from 'formik';
import Logo from '../../assets/images/flexxa-logo-2.png';
import CustomDropDown from '../../components/dropdown/CustomDropDown';
import ErrorMsg1 from '../../components/ErrorMsg1';
import { fontFamilies, textSizes } from '../../components/stylesheets/globalStyleSheet';
import { PHONE_COUNTRY_CODES } from '../../constants/constants';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import colors from '../../utils/colors/colors';
import { passwordSchema } from '../../utils/yupSchemas/yupSchemas';

const initialUsertype = 'Flex'

export default function SignUpScreen() {
    const router = useRouter();

    const { goBack } = useAppNavigation()

    const { dob } = useLocalSearchParams();

    const [activeTab, setActiveTab] = useState(initialUsertype);
    const [showPassword, setShowPassword] = useState(false)


    useEffect(() => {
        if (!dob) {
            goBack()
        }
    }, [])


    if (!dob) return <></>


    // Handle Google Sign Up
    const handleGoogleSignUp = async () => {
        Alert.alert('Google Sign Up', 'Google authentication would be triggered here');
    };

    // Handle navigation to sign in
    const handleSignIn = () => {
        router.push('/auth/signin');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={Logo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Create an account</Text>
                    <Text style={styles.subtitle}>
                        Sign up to connect with {activeTab === 'Flex' ? 'events' : 'people'} that match your vibe.
                    </Text>

                    <Formik
                        validationSchema={yup.object().shape({
                            full_name: yup.string().min(5, "Minimum of 5 characters").required("Full name is required"),
                            email: yup.string().email("Must be a valid email address").required("Email address is required"),
                            country_code: yup.string().required("Country code is required"),
                            phone_number: yup.string().required("Phone number is required"),
                            password: passwordSchema,
                        })}
                        initialValues={{
                            full_name: '', email: '', country_code: '', phone_number: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            router.push({
                                pathname: '/auth/terms-of-service',
                                params: {
                                    ...values,
                                    dob,
                                    usertype: activeTab
                                }
                            });
                        }}
                    >
                        {({ handleBlur, handleChange, handleSubmit, isValid, dirty, setFieldValue, values }) => (
                            <View>
                                {/* Tab Selector */}
                                <View style={styles.tabContainer}>
                                    <TouchableOpacity
                                        style={[styles.tab, activeTab === 'Flex' && styles.activeTab]}
                                        onPress={() => {
                                            setActiveTab('Flex')
                                        }}
                                    >
                                        <Text style={[styles.tabText, activeTab === 'Flex' && styles.activeTabText]}>
                                            Flex
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.tab, activeTab === 'Flexr' && styles.activeTab]}
                                        onPress={() => {
                                            setActiveTab('Flexr')
                                        }}
                                    >
                                        <Text style={[styles.tabText, activeTab === 'Flexr' && styles.activeTabText]}>
                                            Flexr
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Full Name Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Full name</Text>
                                    <Field type="text" name="full_name">
                                        {({
                                            field,
                                            meta: { touched, error }
                                        }) =>
                                            <TextInput
                                                style={[styles.input, (touched && error) && styles.inputError]}
                                                value={values.full_name}
                                                onChangeText={handleChange("full_name")}
                                                onBlur={handleBlur("full_name")}
                                                placeholder="John Doe"
                                                placeholderTextColor="#999"
                                                autoCapitalize="words"
                                            />
                                        }
                                    </Field>
                                    <ErrorMessage name='full_name'>
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                {/* Email Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Enter your email</Text>
                                    <Field type="email" name="email">
                                        {({
                                            field,
                                            meta: { touched, error }
                                        }) =>
                                            <TextInput
                                                style={[styles.input, (touched && error) && styles.inputError]}
                                                value={values.email}
                                                onChangeText={handleChange("email")}
                                                onBlur={handleBlur("email")}
                                                placeholder="yourname@email.com"
                                                placeholderTextColor="#999"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                            />
                                        }
                                    </Field>
                                    <ErrorMessage name='email'>
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                {/* Phone Input */}
                                <View style={[
                                    styles.inputContainer
                                ]}>
                                    <Text style={styles.label}>Enter your phone number</Text>
                                    <View style={{
                                        display: 'flex', flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{
                                            width: '22%'
                                        }}>
                                            <Field type="text" name="country_code">
                                                {({
                                                    field,
                                                    meta: { touched, error }
                                                }) =>
                                                    <CustomDropDown
                                                        options={PHONE_COUNTRY_CODES}
                                                        onValueChange={({ value, title }) => {
                                                            setFieldValue("country_code", value)
                                                        }}
                                                        anchorComponent={
                                                            <View
                                                                style={[
                                                                    styles.input,
                                                                    (touched && error) && styles.inputError
                                                                    // {
                                                                    //     paddingVertical: 22
                                                                    // }
                                                                ]
                                                                }
                                                            >
                                                                <Text style={[
                                                                    textSizes.txt11, fontFamilies.LatoBold,
                                                                    {
                                                                        color: colors._000, textAlign: 'center'
                                                                    }
                                                                ]}>
                                                                    {
                                                                        values.country_code || '+xxx'
                                                                    }
                                                                </Text>
                                                            </View>
                                                        }
                                                    />
                                                }
                                            </Field>
                                        </View>

                                        <View style={{
                                            width: '75%'
                                        }}>
                                            <Field type="text" name="phone_number">
                                                {({
                                                    field,
                                                    meta: { touched, error }
                                                }) =>
                                                    <TextInput
                                                        style={[styles.input, (touched && error) && styles.inputError]}
                                                        value={values.phone_number}
                                                        onChangeText={handleChange("phone_number")}
                                                        onBlur={handleBlur('phone_number')}
                                                        placeholder="00000000000"
                                                        placeholderTextColor="#999"
                                                        keyboardType="phone-pad"
                                                        autoComplete="tel"
                                                    />
                                                }
                                            </Field>
                                        </View>
                                    </View>
                                    <ErrorMessage name='phone_number'>
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Enter your password</Text>
                                    <Field type="text" name="password">
                                        {({
                                            field,
                                            meta: { touched, error }
                                        }) =>
                                            <View style={styles.passwordContainer}>
                                                <TextInput
                                                    style={[
                                                        styles.input,
                                                        (touched && error) && styles.inputError,
                                                        styles.passwordInput
                                                    ]}
                                                    value={values.password}
                                                    onChangeText={handleChange("password")}
                                                    onBlur={handleBlur("password")}
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
                                        }
                                    </Field>
                                    <ErrorMessage name='password'>
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                {/* Sign Up Button */}
                                <TouchableOpacity
                                    style={[styles.signUpButton, !(isValid && dirty) && styles.signUpButtonDisabled]}
                                    onPress={handleSubmit}
                                    disabled={!(isValid && dirty)}
                                >
                                    <Text style={styles.signUpButtonText}>Sign up</Text>
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#7E7E7E33' }}></View>
                                    <Text style={{ marginHorizontal: 10, color: "#7E7E7E80" }}>Sign in with google</Text>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#7E7E7E33' }}></View>
                                </View>

                                {/* Google Sign Up Button */}
                                {/* <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
                                    <Ionicons name="logo-google" size={20} color="#666" />
                                    <Text style={styles.googleButtonText}>Google</Text>
                                </TouchableOpacity> */}

                                {/* Sign In Link */}
                                <View style={styles.signInContainer}>
                                    <Text style={styles.signInText}>Already have an account? </Text>
                                    <TouchableOpacity onPress={handleSignIn}>
                                        <Text style={styles.signInLink}>Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 0.5,
        paddingHorizontal: 24,
        paddingTop: 20,
        // paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoPlaceholder: {
        fontSize: 20,
        fontWeight: '700',
        color: '#5B7FFF',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        lineHeight: 20,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(72, 78, 212, 0.08)',
        borderRadius: 30,
        padding: 6,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#484ED4',
    },
    activeTabText: {
        color: '#484ED4',
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
    inputError: {
        borderColor: '#FF6B6B',
    },
    passwordContainer: {
        position: 'relative',
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
    signUpButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
    },
    signUpButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // divider: {
    //     textAlign: 'center',
    //     color: '#999',
    //     fontSize: 13,
    //     marginBottom: 16,
    // },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        paddingVertical: 14,
        marginBottom: 24,
    },
    googleButtonText: {
        fontSize: 15,
        color: '#1E1E1E',
        marginLeft: 10,
        fontWeight: '500',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        color: '#666',
        fontSize: 14,
    },
    signInLink: {
        color: '#484ED4',
        fontSize: 14,
        fontWeight: '600',
    },
});