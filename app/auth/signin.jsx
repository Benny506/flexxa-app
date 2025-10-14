import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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

import Logo from '../../assets/images/flexxa-logo-2.png';

export default function SignInScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Flex');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    // Email validation
    const validateEmail = (text) => {
        setEmail(text);
        setEmailError('');
        setLoginError('');

        if (text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            setEmailError('Please enter email address');
        }
    };

    // Password validation
    const validatePassword = (text) => {
        setPassword(text);
        setPasswordError('');
        setLoginError('');

        if (text && text.length < 6) {
            setPasswordError('Please enter your password');
        }
    };

    // Handle sign in
    const handleSignIn = async () => {
        let hasError = false;

        // Reset errors
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        // Validate email
        if (!email) {
            setEmailError('Please enter email address');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter email address');
            hasError = true;
        }

        // Validate password
        if (!password) {
            setPasswordError('Please enter your password');
            hasError = true;
        }

        if (hasError) return;

        // Simulate API call
        try {
            setTimeout(() => {
                setLoginError('Invalid login details!\nPlease check your email address and password and try again.');
            }, 500);

        } catch (error) {
            setLoginError('Invalid login details!\nPlease check your email address and password and try again.');
        }
    };

    // Google Sign In
    const handleGoogleSignIn = async () => {
        Alert.alert('Google Sign In', 'Google authentication would be triggered here');
    };

    // Handle Forgot Password
    // const handleForgotPassword = () => {
    //     router.push('/auth/forgot-password');
    // };

    // Handle Sign Up
    const handleSignUp = () => {
        router.push('/auth/signup');
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
                    <Text style={styles.title}>Sign into your account</Text>
                    <Text style={styles.subtitle}>
                        Sign in to connect with {activeTab === 'Flex' ? 'events' : 'people'} that match your vibe.
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

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your email</Text>
                        <TextInput
                            style={[styles.input, emailError && styles.inputError]}
                            value={email}
                            onChangeText={validateEmail}
                            placeholder=""
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        {emailError && (
                            <Text style={styles.errorText}>{emailError}</Text>
                        )}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, passwordError && styles.inputError, styles.passwordInput]}
                                value={password}
                                onChangeText={validatePassword}
                                placeholder=""
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoComplete="password"
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

                    {/* /* Login Error Message */}
                    {loginError && (
                        <View style={styles.loginErrorContainer}>
                            <View style={styles.errorIcon}>
                                <Ionicons name="alert-circle" size={16} color="#E33629" />
                            </View>
                            <Text style={styles.loginErrorText}>{loginError}</Text>
                        </View>
                    )}

                    {/* /* Forgot Password */}
                    <TouchableOpacity
                        onPress={() => router.push('/auth/forgot-password')}
                        style={styles.forgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        style={[styles.signInButton, (!email || !password) && styles.signInButtonDisabled]}
                        onPress={handleSignIn}
                        disabled={!email || !password}
                    >
                        <Text style={styles.signInButtonText}>Sign in</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#7E7E7E33'}}></View>
                        <Text style={{marginHorizontal: 10, color: "#7E7E7E80"}}>Sign in with google</Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#7E7E7E33'}}></View>
                    </View>

                    {/* Google Sign In Button */}
                    <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                        <FontAwesome name="google" size={20} />
                        <Text style={styles.googleButtonText}>Google</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpLink}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    loginErrorContainer: {
        backgroundColor: 'rgba(227, 54, 41, 0.05)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'column',
        alignItems: 'center',
    },
    errorIcon: {
        marginRight: 8,
        marginTop: 2,
    },
    loginErrorText: {
        color: '#E33629',
        fontSize: 13,
        lineHeight: 18,
        flex: 1,
        textAlign: "center",
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#7E7E7E',
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 10,
    },
    signInButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
    },
    signInButtonText: {
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: '#666',
        fontSize: 14,
    },
    signUpLink: {
        color: '#484ED4',
        fontSize: 14,
        fontWeight: '600',
    },
});