import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import SkipButton from '../../components/skip-button';
import useApiReqs from '../../hooks/useApiReqs';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';

export default function UploadIDScreen() {
    const dispatch = useDispatch()

    const { fullNavigateTo } = useAppNavigation()

    const router = useRouter();

    const params = useLocalSearchParams()

    const { updateProfile } = useApiReqs()

    const [selectedIDType, setSelectedIDType] = useState('');
    const [frontSide, setFrontSide] = useState(false);
    const [backSide, setBackSide] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);

    const idTypes = [
        { id: 'drivers-license', label: "Driver's License" },
        { id: 'national-id', label: 'National ID' },
        { id: 'international-passport', label: 'International Passport' },
    ];

    const handlePickDocument = async (side) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*', 'application/pdf'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                if (side === 'front') {
                    setFrontSide(result.assets[0]?.uri);
                } else {
                    setBackSide(result.assets[0]?.uri);
                }
            }
        } catch (error) {
            dispatch(setAppAlert({ msg: 'Failed to pick document', type: 'error' }))
            return;
        }
    };

    const handleNext = () => {
        if (selectedIDType && frontSide && backSide) {
            router.push({
                pathname: '/verification/selfie-verification',
                params: {
                    ...params,
                    government_id: {
                        type: selectedIDType,
                        frontSide, backSide
                    }
                }
            });
        }
    };

    const handleSkip = () => {
        setShowSkipModal(true);
    };

    const handleContinueVerification = () => {
        setShowSkipModal(false);
    };

    const handleVerifyLater = () => {
        setShowSkipModal(false);
        console.log(params)

        fullNavigateTo({
            path: '/(main)/(tabs)/home'
        });
        
        //RESUME FROM PROFILE UPDATING

        // updateProfile({
        //     callBack: ({ updatedProfile }) => {
        //         router.push('/(main)/(tabs)');
        //     },
        //     update: {

        //     }
        // })
    };

    const isFormComplete = selectedIDType && frontSide && backSide;

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
                    <Text style={styles.title}>Upload Your Government-Issued ID</Text>
                    <Text style={styles.subtitle}>
                        Please upload a clear photo or scanned copy of a government-issued ID.
                    </Text>

                    {/* ID Type Selection */}
                    <View style={styles.section}>
                        {idTypes.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.radioOption,
                                    selectedIDType === type.id && styles.radioOptionSelected
                                ]}
                                onPress={() => setSelectedIDType(type.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.radioText,
                                    selectedIDType === type.id && styles.radioTextSelected
                                ]}>
                                    {type.label}
                                </Text>
                                <View style={styles.radioCircle}>
                                    {selectedIDType === type.id ? (
                                        <View style={styles.radioCircleFilled} />
                                    ) : (
                                        <View style={styles.radioCircleEmpty} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Upload Section */}
                    <View style={styles.uploadSection}>
                        <Text style={styles.uploadTitle}>Upload a photo of your ID</Text>
                        
                        <View style={styles.uploadRow}>
                            {/* Front View */}
                            <View style={styles.uploadCard}>
                                <Text style={styles.uploadLabel}>Front view</Text>
                                <TouchableOpacity
                                    style={styles.uploadBox}
                                    onPress={() => handlePickDocument('front')}
                                    activeOpacity={0.7}
                                >
                                    {frontSide ? (
                                        <Ionicons name="checkmark-circle" size={32} color="#484ED4" />
                                    ) : (
                                        <Ionicons name="cloud-upload-outline" size={32} color="#999" />
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.uploadHint}>
                                    Click to upload. <Text style={styles.uploadSize}>max 5mb</Text>
                                </Text>
                                <View style={styles.formatTags}>
                                    <Text style={styles.formatTag}>PNG</Text>
                                    <Text style={styles.formatTag}>JPG</Text>
                                    <Text style={styles.formatTag}>PDF</Text>
                                </View>
                            </View>

                            {/* Divider */}
                            <View style={styles.divider} />

                            {/* Back View */}
                            <View style={styles.uploadCard}>
                                <Text style={styles.uploadLabel}>Back view</Text>
                                <TouchableOpacity
                                    style={styles.uploadBox}
                                    onPress={() => handlePickDocument('back')}
                                    activeOpacity={0.7}
                                >
                                    {backSide ? (
                                        <Ionicons name="checkmark-circle" size={32} color="#484ED4" />
                                    ) : (
                                        <Ionicons name="cloud-upload-outline" size={32} color="#999" />
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.uploadHint}>
                                    Click to upload. <Text style={styles.uploadSize}>max 5mb</Text>
                                </Text>
                                <View style={styles.formatTags}>
                                    <Text style={styles.formatTag}>PNG</Text>
                                    <Text style={styles.formatTag}>JPG</Text>
                                    <Text style={styles.formatTag}>PDF</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Next Button */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={[styles.nextButton, !isFormComplete && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={!isFormComplete}
                >
                    <Text style={styles.nextButtonText}>Next: Selfie Verification</Text>
                </TouchableOpacity>
            </View>

            {/* Skip Modal */}
            <Modal
                visible={showSkipModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSkipModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Skip Verification?</Text>
                        <Text style={styles.modalText}>
                            Skipping will limit your access to key features. You can verify later in your profile settings.
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonSecondary}
                                onPress={handleContinueVerification}
                            >
                                <Text style={styles.modalButtonSecondaryText}>Continue Verification</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonPrimary}
                                onPress={handleVerifyLater}
                            >
                                <Text style={styles.modalButtonPrimaryText}>Verify Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingVertical: 16,
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
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    radioOptionSelected: {
        borderColor: '#484ED4',
        backgroundColor: '#F5F6FF',
    },
    radioText: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    radioTextSelected: {
        color: '#484ED4',
        fontWeight: '600',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleEmpty: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#D1D1D1',
    },
    radioCircleFilled: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#484ED4',
        borderWidth: 5,
        borderColor: '#fff',
    },
    uploadSection: {
        marginBottom: 24,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    uploadRow: {
        flexDirection: 'row',
        gap: 16,
    },
    uploadCard: {
        flex: 1,
        alignItems: 'center',
    },
    uploadLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    uploadBox: {
        width: '100%',
        height: 120,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        marginBottom: 8,
    },
    uploadHint: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    uploadSize: {
        color: '#999',
    },
    formatTags: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    formatTag: {
        fontSize: 11,
        color: '#484ED4',
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#F5F6FF',
        borderRadius: 4,
    },
    divider: {
        width: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 40,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    nextButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: '#D9DFFE',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    modalButtons: {
        gap: 12,
        flexDirection: 'row',
    },
    modalButtonSecondary: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    modalButtonSecondaryText: {
        color: '#484ED4',
        fontSize: 15,
        fontWeight: '600',
    },
    modalButtonPrimary: {
        flex: 1,
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    modalButtonPrimaryText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});