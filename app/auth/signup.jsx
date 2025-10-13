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
    Alert,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import React from 'react';
// import { styles } from './signin';

import Logo from '../../assets/images/flexxa-logo-2.png';

export default function SignUpScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Flex');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validate full name
    const validateFullName = (text) => {
        setFullName(text);
        setFullNameError('');

        if (text && text.length < 2) {
            setFullNameError('Please enter your full name');
        }
    };

    // Validate email
    const validateEmail = (text) => {
        setEmail(text);
        setEmailError('');

        if (text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            setEmailError('Please enter email address');
        }
    };

    // Validate phone
    const validatePhone = (text) => {
        setPhone(text);
        setPhoneError('');

        if (text && (text.length < 10 || !/^\d+$/.test(text))) {
            setPhoneError('Please enter a valid phone number');
        }
    };

    // Validate password
    const validatePassword = (text) => {
        setPassword(text);
        setPasswordError('');

        if (text && text.length < 8) {
            setPasswordError('Create a password with at least 8 characters');
        }
    };

    // Handle sign up
    const handleSignUp = async () => {
        let hasError = false;

        // Reset errors
        setFullNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');

        // Validate full name
        if (!fullName || fullName.length < 2) {
            setFullNameError('Please enter your full name');
            hasError = true;
        }

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        }

        // Validate phone
        if (!phone || phone.length < 10 || !/^\d+$/.test(phone)) {
            setPhoneError('Please enter a valid phone number');
            hasError = true;
        }

        // Validate password
        if (!password || password.length < 8) {
            setPasswordError('Create a password with at least 8 characters');
            hasError = true;
        }

        if (hasError) return;

        try {
            router.push('/auth/terms-of-service');

        } catch (error) {
            Alert.alert('Error', 'Failed to create account. Please try again.');
        }
    };


    // Handle Google Sign Up
    const handleGoogleSignUp = async () => {
        Alert.alert('Google Sign Up', 'Google authentication would be triggered here');
    };

    // Handle navigation to sign in
    const handleSignIn = () => {
        router.push('/auth/signin');
    };

    // Check if form is valid
    const isFormValid =
        fullName.length >= 2 &&
        email.length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        phone.length >= 10 &&
        password.length >= 8;

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

                    {/* Tab Selector */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Flex' && styles.activeTab]}
                            onPress={() => setActiveTab('Flex')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Flex' && styles.activeTabText]}>
                                Flex
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Flexr' && styles.activeTab]}
                            onPress={() => setActiveTab('Flexr')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Flexr' && styles.activeTabText]}>
                                Flexr
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Full Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            style={[styles.input, fullNameError && styles.inputError]}
                            value={fullName}
                            onChangeText={validateFullName}
                            placeholder="John Doe"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                        />
                        {fullNameError && (
                            <Text style={styles.errorText}>{fullNameError}</Text>
                        )}
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your email</Text>
                        <TextInput
                            style={[styles.input, emailError && styles.inputError]}
                            value={email}
                            onChangeText={validateEmail}
                            placeholder="johndoe@email.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        {emailError && (
                            <Text style={styles.errorText}>{emailError}</Text>
                        )}
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your phone number</Text>
                        <TextInput
                            style={[styles.input, phoneError && styles.inputError]}
                            value={phone}
                            onChangeText={validatePhone}
                            placeholder="00000000000"
                            placeholderTextColor="#999"
                            keyboardType="phone-pad"
                            autoComplete="tel"
                        />
                        {phoneError && (
                            <Text style={styles.errorText}>{phoneError}</Text>
                        )}
                    </View>

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

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.signUpButton, !isFormValid && styles.signUpButtonDisabled]}
                        onPress={handleSignUp}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.signUpButtonText}>Sign up</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#7E7E7E33'}}></View>
                        <Text style={{marginHorizontal: 10, color: "#7E7E7E80"}}>Sign in with google</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#7E7E7E33'}}></View>
                    </View>

                    {/* Google Sign Up Button */}
                    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
                        <Ionicons name="logo-google" size={20} color="#666" />
                        <Text style={styles.googleButtonText}>Google</Text>
                    </TouchableOpacity>

                    {/* Sign In Link */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleSignIn}>
                            <Text style={styles.signInLink}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
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