import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Modal,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerificationProgressScreen() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('progress'); // 'progress', 'error', 'saved'
    const scaleAnim = new Animated.Value(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Show progress modal immediately
        setModalType('progress');
        setShowModal(true);
        
        // Simulate progress
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        // Simulate verification completion (show saved modal after 3 seconds)
        const completionTimer = setTimeout(() => {
            setModalType('saved');
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(completionTimer);
        };
    }, []);

    useEffect(() => {
        if (showModal) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 50,
                friction: 7,
            }).start();
        }
    }, [showModal]);

    const handleViewDashboard = () => {
        setShowModal(false);
        router.push('/home');
    };

    const handleGoToDashboard = () => {
        setShowModal(false);
        router.push('/home');
    };

    const handleTryAgain = () => {
        setShowModal(false);
        router.back();
    };

    const handleSaveProgress = () => {
        setModalType('saved');
    };

    const renderModalContent = () => {
        switch (modalType) {
            case 'progress':
                return (
                    <View style={styles.modalContent}>
                        {/* 3D Head Mesh Icon */}
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons 
                                name="head-dots-horizontal" 
                                size={100} 
                                color="#484ED4" 
                            />
                            <View style={styles.checkmarkBadge}>
                                <Ionicons name="checkmark" size={20} color="#fff" />
                            </View>
                        </View>

                        <Text style={styles.modalTitle}>Verification in Progress!</Text>
                        <Text style={styles.modalSubtitle}>
                            We've received your information and are verifying your identity.
                        </Text>
                        <Text style={styles.modalSubtitle}>
                            This process usually takes a few minutes. We'll notify you once it's complete.
                        </Text>

                        <TouchableOpacity 
                            style={styles.primaryButton}
                            onPress={handleViewDashboard}
                        >
                            <Text style={styles.primaryButtonText}>View Pilot Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 'error':
                return (
                    <View style={styles.modalContent}>
                        <View style={[styles.iconContainer, styles.errorIconContainer]}>
                            <Ionicons name="close-circle" size={80} color="#FF5252" />
                        </View>

                        <Text style={styles.modalTitle}>Submission Error!</Text>
                        <Text style={styles.modalSubtitle}>
                            Oops! We couldn't submit your identification due to a network issue.
                        </Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity 
                                style={styles.secondaryButton}
                                onPress={handleSaveProgress}
                            >
                                <Text style={styles.secondaryButtonText}>Save Progress</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.primaryButton}
                                onPress={handleTryAgain}
                            >
                                <Text style={styles.primaryButtonText}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            case 'saved':
                return (
                    <View style={styles.modalContent}>
                        <View style={[styles.iconContainer, styles.successIconContainer]}>
                            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                        </View>

                        <Text style={styles.modalTitle}>Progress Saved!</Text>
                        <Text style={styles.modalSubtitle}>
                            Your progress has been saved successfully. We will send you a reminder to continue your ID submission.
                        </Text>

                        <TouchableOpacity 
                            style={styles.primaryButton}
                            onPress={handleGoToDashboard}
                        >
                            <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            
            {/* Background Content */}
            <View style={styles.backgroundContent}>
                <Text style={styles.backgroundTitle}>Selfie Captured!</Text>
                <Text style={styles.backgroundSubtitle}>
                    Review your selfie before submitting it for verification.
                </Text>
                <View style={styles.imagePlaceholder}>
                    <Ionicons name="person" size={80} color="#ccc" />
                </View>
            </View>

            {/* Modal */}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <Animated.View 
                        style={[
                            styles.modalContainer,
                            { transform: [{ scale: scaleAnim }] }
                        ]}
                    >
                        {renderModalContent()}
                    </Animated.View>
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
    backgroundContent: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    backgroundTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    backgroundSubtitle: {
        fontSize: 14,
        color: '#999',
        lineHeight: 20,
        marginBottom: 32,
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: 3/4,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    errorIconContainer: {
        backgroundColor: '#FFF5F5',
        borderRadius: 60,
        padding: 20,
    },
    successIconContainer: {
        backgroundColor: '#F1F8F4',
        borderRadius: 60,
        padding: 20,
    },
    checkmarkBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#484ED4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: '100%',
        alignItems: 'center',
        marginTop: 12,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
        marginTop: 12,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#484ED4',
    },
    secondaryButtonText: {
        color: '#484ED4',
        fontSize: 16,
        fontWeight: '600',
    },
});