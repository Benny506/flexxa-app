import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaceMesh from '../../assets/images/face-mesh.svg';
import IdIcon from '../../assets/images/icons/id.svg';
import SelfieIcon from '../../assets/images/icons/selfie.svg';
import BackButton from '../../components/back-button';
import CustomScroll from '../../components/CustomScroll';
import { useAppNavigation } from '../../hooks/useAppNavigation';

export default function VerificationIndexScreen() {

    const { goBack } = useAppNavigation()

    const router = useRouter();

    const handleStartVerification = () => {
        router.push({
            pathname: '/verification/upload-id',
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={{ paddingHorizontal: 24, marginBottom: 15 }}>
                <BackButton
                    onPress={goBack}
                />
            </View>

            <CustomScroll padding_H={0} padding_V={0}>
                <View style={styles.content}>
                    {/* Face ID Illustration - Replace with your SVG/Image */}
                    <View style={styles.illustrationContainer}>
                        <FaceMesh />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Verify your identity!</Text>
                    <Text style={styles.subtitle}>
                        We need to verify your identity to ensure a safe and trusted community for everyone.
                    </Text>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        {/* Upload Government ID */}
                        <View style={styles.optionCard}>
                            <IdIcon style={styles.optionIcon} />
                            <View style={styles.optionContent}>
                                <Text style={styles.optionTitle}>Upload a Government-Issued ID</Text>
                                <Text style={styles.optionSubtitle}>
                                    Passport, Driver's License, National ID Card
                                </Text>
                                <View style={styles.infoRow}>
                                    <Ionicons name="information-circle-outline" size={16} color="#999" />
                                    <Text style={styles.infoText}>
                                        Take a clear photo or upload a scanned copy of your ID
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Take a Selfie */}
                        <View style={styles.optionCard}>
                            <SelfieIcon style={styles.optionIcon} />
                            <View style={styles.optionContent}>
                                <Text style={styles.optionTitle}>Take a Selfie</Text>
                                <Text style={styles.optionSubtitle}>
                                    Take a selfie to match your ID and confirm your identity.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spacer} />

                    {/* Start Button */}
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={handleStartVerification}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.startButtonText}>Start Verification</Text>
                    </TouchableOpacity>
                </View>
            </CustomScroll>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 28,
    },
    illustrationPlaceholder: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderStyle: 'dashed',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8EAFF',
    },
    optionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    optionSubtitle: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#999',
        lineHeight: 16,
    },
    spacer: {
        flex: 1,
    },
    startButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 20
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});