import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/back-button';
import TopInsets from '../../components/TopInsets';
import { useAppNavigation } from '../../hooks/useAppNavigation';

export default function TermsOfService() {
    const router = useRouter();

    const { goBack } = useAppNavigation()

    const params = useLocalSearchParams();

    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if(!params?.email){
            goBack()
        }
    }, [])

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        if (agreed) {
            router.push({
                pathname: '/auth/privacy-policy',
                params
            });
        }
    };

    if(!params?.email) return <></>

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <TopInsets />

            {/* Back Button */}
            <View style={{ paddingHorizontal: 24 }}>
                <BackButton onPress={() => router.back()} />
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                <Text style={styles.title}>Term of Service</Text>

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
                    style={[styles.continueButton, !agreed && styles.continueButtonDisabled]}
                    onPress={handleContinue}
                    disabled={!agreed}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
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
        marginTop: 35,
        paddingTop: 35,
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
    continueButton: {
        backgroundColor: '#484ED4',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    continueButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})