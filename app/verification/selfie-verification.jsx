import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SkipButton from '../../components/skip-button';

export default function SelfieVerificationScreen() {
    const router = useRouter();

    const handleTakeSelfie = () => {
        router.push('/verification/camera-capture');
    };

    const handleSkip = () => {
        router.push('/dashboard');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                {/* <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity> */}
                <SkipButton onPress={handleSkip} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>Take a Selfie for Verification</Text>
                    <Text style={styles.subtitle}>
                        Please take a clear selfie to match your ID and confirm your identity
                    </Text>

                    {/* Example Images */}
                    <View style={styles.examplesContainer}>
                        <View style={styles.exampleCard}>
                            {/* Add accepted image placeholder */}
                            <View style={styles.exampleImagePlaceholder}>
                                {/* <Ionicons name="person" size={60} color="#4CAF50" /> */}
                                <Image source={require('../../assets/images/selfie-ex1.png')} />
                            </View>
                            <View style={[styles.badge, styles.badgeAccepted]}>
                                <Ionicons name="checkmark" size={18} color="#fff" />
                                <Text style={styles.badgeText}>Accepted</Text>
                            </View>
                        </View>

                        <View style={styles.exampleCard}>
                            {/* Add rejected image placeholder */}
                            <View style={styles.exampleImagePlaceholder}>
                                {/* <Ionicons name="person" size={60} color="#FF5252" /> */}
                                <Image source={require('../../assets/images/selfie-ex2.png')} />
                            </View>
                            <View style={[styles.badge, styles.badgeRejected]}>
                                <Ionicons name="close" size={18} color="#fff" />
                                <Text style={styles.badgeText}>Rejected</Text>
                            </View>
                        </View>
                    </View>

                    {/* Camera Instructions */}
                    <View style={styles.instructionsSection}>
                        <Text style={styles.instructionsTitle}>Camera Instructions</Text>
                        <View style={styles.instructionsList}>
                            <View style={styles.instructionItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.instructionText}>
                                    Align your face within the frame and make sure it's well-lit.
                                </Text>
                            </View>
                            <View style={styles.instructionItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.instructionText}>
                                    Your face should be clearly visible, with no obstructions (like hats or sunglasses).
                                </Text>
                            </View>
                            <View style={styles.instructionItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.instructionText}>
                                    Hold the camera steady to avoid blurry images.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Take Selfie Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.takeSelfieButton}
                    onPress={handleTakeSelfie}
                >
                    <Text style={styles.takeSelfieButtonText}>Take Selfie</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    skipButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    skipText: {
        fontSize: 16,
        color: '#484ED4',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        lineHeight: 20,
        marginBottom: 32,
    },
    examplesContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    exampleCard: {
        flex: 1,
        position: 'relative',
    },
    exampleImagePlaceholder: {
        width: '100%',
        aspectRatio: 3 / 4,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    badge: {
        position: 'absolute',
        bottom: 12,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        gap: 6,
    },
    badgeAccepted: {
        backgroundColor: 'rgba(49, 159, 67, 0.75)',
    },
    badgeRejected: {
        backgroundColor: 'rgba(227, 54, 41, 0.75)',
    },
    badgeText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    instructionsSection: {
        // backgroundColor: '#F8F9FF',
        // borderRadius: 12,
        // padding: 20,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    instructionsList: {
        gap: 12,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#484ED4',
        marginTop: 6,
        marginRight: 12,
    },
    instructionText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    takeSelfieButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    takeSelfieButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});