import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SelfieReviewScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageUri = params.imageUri;

    const handleRetake = () => {
        router.back();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        // Simulate submission delay
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/verification/verification-progress');
        }, 1500);
    };

    const handleClose = () => {
        router.push('/verification/selfie-verification');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={handleClose}
                >
                    <Ionicons name="close" size={24} color="#1a1a1a" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Selfie Captured!</Text>
                <Text style={styles.subtitle}>
                    Review your selfie before submitting it for verification.
                </Text>

                {/* Image Preview */}
                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image 
                            source={{ uri: imageUri }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons name="person" size={80} color="#ccc" />
                        </View>
                    )}
                </View>

                <Text style={styles.helperText}>
                    Looks good? Submit your selfie to complete verification.
                </Text>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={handleRetake}
                    disabled={isSubmitting}
                >
                    <Text style={styles.retakeButtonText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
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
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
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
    imageContainer: {
        width: '100%',
        aspectRatio: 3/4,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    bottomSection: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        gap: 12,
    },
    retakeButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#484ED4',
    },
    retakeButtonText: {
        color: '#484ED4',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});