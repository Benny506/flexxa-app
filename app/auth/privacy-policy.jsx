import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackButton from '../../components/back-button';

export default function PrivacyPolicy() {
    const router = useRouter();
    const [agreed, setAgreed] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleAccept = () => {
        if (agreed) {
            router.push('/auth/email-verification');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            {/* Back Button */}
            <View style={{ marginBottom: 40 }}>
                <BackButton onPress={() => router.back()} />
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                <Text style={styles.title}>Privacy Policy</Text>

                <Text style={styles.sectionTitle}>Forem ipsum dolor sit amet</Text>
                <Text style={styles.paragraph}>
                    consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur ligula. Ut semper ac turpis ornare, pellentesque eros.
                </Text>

                <Text style={styles.sectionTitle}>Forem ipsum dolor sit amet</Text>
                <Text style={styles.paragraph}>
                    consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur ligula. Ut semper ac turpis ornare, pellentesque eros. Suspendisse lacinia est vel ligula efficitur tempus.
                </Text>

                <Text style={styles.sectionTitle}>Forem ipsum dolor sit amet</Text>
                <Text style={styles.paragraph}>
                    consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur ligula. Ut semper ac turpis ornare, pellentesque eros. Suspendisse lacinia est vel ligula efficitur tempus.
                </Text>

                <Text style={styles.sectionTitle}>Forem ipsum dolor sit amet</Text>
                <Text style={styles.paragraph}>
                    consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur ligula. Ut semper ac turpis ornare, pellentesque eros. Suspendisse lacinia est vel ligula efficitur tempus.
                </Text>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setAgreed(!agreed)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.checkboxText}>
                        Agree with terms of service and privacy policy
                    </Text>
                    <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                        {agreed && <Ionicons name="checkmark" size={16} color="#fff" />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.acceptButton, !agreed && styles.acceptButtonDisabled]}
                    onPress={handleAccept}
                    disabled={!agreed}
                >
                    <Text style={styles.acceptButtonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        paddingTop: 70,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#484ED4',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        marginTop: 8,
    },
    paragraph: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 16,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#484ED4',
        borderColor: '#484ED4',
    },
    checkboxText: {
        fontSize: 14,
        color: '#1a1a1a',
        flex: 1,
    },
    acceptButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    acceptButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});