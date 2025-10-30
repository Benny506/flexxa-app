import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Video } from 'expo-av';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = () => {
    const router = useRouter();
    const { groupId } = useLocalSearchParams();
    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState('back');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [capturedMedia, setCapturedMedia] = useState(null);
    const [mediaType, setMediaType] = useState('photo');
    const [caption, setCaption] = useState('');
    const [mode, setMode] = useState('photo');

    const timerRef = useRef(null);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [permission]);

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRecording]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedMedia(photo.uri);
            setMediaType('photo');
        }
    };

    const startRecording = async () => {
        if (cameraRef.current && !isRecording) {
            setIsRecording(true);
            setRecordingTime(0);
            const video = await cameraRef.current.recordAsync();
            setCapturedMedia(video.uri);
            setMediaType('video');
        }
    };

    const stopRecording = () => {
        if (cameraRef.current && isRecording) {
            cameraRef.current.stopRecording();
            setIsRecording(false);
        }
    };

    const handleCapture = () => {
        if (mode === 'video') {
            if (isRecording) {
                stopRecording();
            } else {
                startRecording();
            }
        } else {
            takePicture();
        }
    };

    const handleRetake = () => {
        setCapturedMedia(null);
        setRecordingTime(0);
        setCaption('');
    };

    const handleSend = () => {
        console.log('Sending:', { media: capturedMedia, type: mediaType, caption });
        router.back();
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.noAccessText}>No access to camera</Text>
                <Pressable onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    if (capturedMedia) {
        return (
            <SafeAreaView style={styles.previewContainer}>
                <StatusBar barStyle="light-content" />
                <View style={styles.previewHeader}>
                    <Pressable onPress={handleRetake} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </Pressable>
                </View>

                <View style={styles.previewMediaContainer}>
                    {mediaType === 'photo' ? (
                        <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
                    ) : (
                        <Video
                            source={{ uri: capturedMedia }}
                            style={styles.previewVideo}
                            useNativeControls
                            resizeMode="contain"
                        />
                    )}
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.captionContainer}
                >
                    <View style={styles.captionInputContainer}>
                        <Pressable style={styles.galleryIconButton}>
                            <Ionicons name="image-outline" size={24} color="#999" />
                        </Pressable>
                        <TextInput
                            style={styles.captionInput}
                            placeholder="Add a caption..."
                            placeholderTextColor="#999"
                            value={caption}
                            onChangeText={setCaption}
                            multiline
                        />
                        <Pressable onPress={handleSend} style={styles.sendButton}>
                            <Ionicons name="send" size={24} color="#5B5BFF" />
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={cameraType}
            >
                <View style={styles.cameraHeader}>
                    <Pressable onPress={() => router.back()} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </Pressable>
                    {isRecording && (
                        <View style={styles.recordingBadge}>
                            <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.cameraControls}>
                    <View style={styles.modeSelector}>
                        <Pressable onPress={() => setMode('photo')}>
                            <Text style={[styles.modeText, mode === 'photo' && styles.activeModeText]}>
                                Photo
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setMode('video')}>
                            <Text style={[styles.modeText, mode === 'video' && styles.activeModeText]}>
                                Video
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.bottomControls}>
                        <Pressable style={styles.galleryButton}>
                            <Ionicons name="image-outline" size={28} color="#fff" />
                        </Pressable>

                        <Pressable
                            onPress={handleCapture}
                            style={[
                                styles.captureButton,
                                isRecording && styles.captureButtonRecording,
                            ]}
                        >
                            <View style={[
                                styles.captureButtonInner,
                                isRecording && styles.captureButtonInnerRecording,
                            ]} />
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setCameraType(cameraType === 'back' ? 'front' : 'back')
                            }
                            style={styles.flipButton}
                        >
                            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
                        </Pressable>
                    </View>
                </View>
            </CameraView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    noAccessText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#5B5BFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cameraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingBadge: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    recordingTime: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 40,
    },
    modeSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        marginBottom: 40,
    },
    modeText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontWeight: '600',
    },
    activeModeText: {
        color: '#fff',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    galleryButton: {
        width: 50,
        height: 50,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonRecording: {
        borderColor: '#FF3B30',
    },
    captureButtonInner: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#5B5BFF',
    },
    captureButtonInnerRecording: {
        width: 40,
        height: 40,
        borderRadius: 6,
        backgroundColor: '#FF3B30',
    },
    flipButton: {
        width: 50,
        height: 50,
    },
    previewContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    previewHeader: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    previewMediaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewVideo: {
        width: '100%',
        height: '100%',
    },
    captionContainer: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    captionInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    galleryIconButton: {
        marginRight: 12,
    },
    captionInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        marginRight: 12,
    },
    sendButton: {
        padding: 8,
    },
});

export default CameraScreen;