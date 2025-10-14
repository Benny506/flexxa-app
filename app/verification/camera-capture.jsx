import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const OVAL_WIDTH = width * 0.7;
const OVAL_HEIGHT = OVAL_WIDTH * 1.3;

export default function CameraCaptureScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [alignmentMessage, setAlignmentMessage] = useState('');
    const [isAligned, setIsAligned] = useState(false);
    const cameraRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            }
        })();
    }, []);

    useEffect(() => {
        // Simulate face alignment detection
        const messages = [
            'Slightly move your head to the left',
            'All set!',
            'Move closer',
            'Perfect position'
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            setAlignmentMessage(messages[index % messages.length]);
            setIsAligned(messages[index % messages.length] === 'All set!');
            index++;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Pulse animation for the oval guide
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleCapture = async () => {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    base64: false,
                });
                
                // Fade out camera view
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    router.push({
                        pathname: '/verification/selfie-review',
                        params: { imageUri: photo.uri }
                    });
                });
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleClose = () => {
        router.back();
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.messageContainer}>
                    <Text style={styles.messageText}>No access to camera</Text>
                    <Text style={[styles.messageText, { fontSize: 14, marginTop: 10 }]}>
                        Camera features require a physical device
                    </Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={handleClose}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            <Animated.View style={[styles.cameraContainer, { opacity: fadeAnim }]}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing="front"
                    onCameraReady={() => setIsCameraReady(true)}
                />
                
                {/* Close Button */}
                <SafeAreaView style={styles.topBar} edges={['top']}>
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={handleClose}
                    >
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Oval Guide Overlay */}
                <View style={styles.overlay}>
                    <View style={styles.overlayTop} />
                    <View style={styles.overlayMiddle}>
                        <View style={styles.overlaySide} />
                        <Animated.View 
                            style={[
                                styles.ovalContainer,
                                { transform: [{ scale: pulseAnim }] }
                            ]}
                        >
                            <View style={[
                                styles.oval,
                                isAligned && styles.ovalAligned
                            ]} />
                        </Animated.View>
                        <View style={styles.overlaySide} />
                    </View>
                    <View style={styles.overlayBottom}>
                        {/* Alignment Message */}
                        {alignmentMessage && (
                            <View style={styles.alignmentMessageContainer}>
                                <Ionicons 
                                    name={isAligned ? "checkmark-circle" : "scan"} 
                                    size={20} 
                                    color="#fff" 
                                />
                                <Text style={styles.alignmentMessage}>
                                    {alignmentMessage}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </Animated.View>

            {/* Bottom Controls */}
            <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
                <View style={styles.captureContainer}>
                    <TouchableOpacity
                        style={[
                            styles.captureButton,
                            !isCameraReady && styles.captureButtonDisabled
                        ]}
                        onPress={handleCapture}
                        disabled={!isCameraReady}
                    >
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                    <Text style={styles.captureText}>Capture</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#484ED4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTop: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayMiddle: {
        flexDirection: 'row',
        width: '100%',
    },
    overlaySide: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ovalContainer: {
        width: OVAL_WIDTH,
        height: OVAL_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    oval: {
        width: '100%',
        height: '100%',
        borderRadius: OVAL_WIDTH / 2,
        borderWidth: 3,
        borderColor: '#fff',
        borderStyle: 'dashed',
    },
    ovalAligned: {
        borderColor: '#4CAF50',
        borderStyle: 'solid',
    },
    overlayBottom: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
    },
    alignmentMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        gap: 8,
    },
    alignmentMessage: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    bottomBar: {
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    captureContainer: {
        alignItems: 'center',
        gap: 8,
    },
    captureButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#484ED4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    captureButtonInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#484ED4',
    },
    captureText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
});