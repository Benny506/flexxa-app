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
import ProgressIndicator from '../../components/progress-indicator';

export default function LifestylePreferencesScreen() {
    const router = useRouter();
    const [smokingPreference, setSmokingPreference] = useState('');
    const [drinkingPreference, setDrinkingPreference] = useState('');

    const handleNext = () => {
        if (smokingPreference && drinkingPreference) {
            router.push('/onboarding/health-allergies');
        }
    };

    const isFormComplete = smokingPreference && drinkingPreference;

    const RadioOption = ({ label, selected, onPress }) => (
        <TouchableOpacity
            style={[styles.radioOption, selected && styles.radioOptionSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.radioText, selected && styles.radioTextSelected]}>
                {label}
            </Text>
            <View style={styles.radioCircle}>
                {selected && <Ionicons name="checkmark-circle" size={20} color="#484ED4" />}
                {!selected && <View style={styles.radioCircleEmpty} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Title */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Lifestyle Preferences</Text>
                        <Text style={styles.subtitle}>
                            Tell us a little about your habits to better personalize your experience.
                        </Text>
                    </View>

                    {/* Smoking Question */}
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>Do you smoke?</Text>
                        
                        <RadioOption
                            label="Yes"
                            selected={smokingPreference === 'Yes'}
                            onPress={() => setSmokingPreference('Yes')}
                        />
                        <RadioOption
                            label="No"
                            selected={smokingPreference === 'No'}
                            onPress={() => setSmokingPreference('No')}
                        />
                        <RadioOption
                            label="Social smoker"
                            selected={smokingPreference === 'Social smoker'}
                            onPress={() => setSmokingPreference('Social smoker')}
                        />
                    </View>

                    {/* Drinking Question */}
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>Do you drink alcohol?</Text>
                        
                        <RadioOption
                            label="Yes"
                            selected={drinkingPreference === 'Yes'}
                            onPress={() => setDrinkingPreference('Yes')}
                        />
                        <RadioOption
                            label="No"
                            selected={drinkingPreference === 'No'}
                            onPress={() => setDrinkingPreference('No')}
                        />
                        <RadioOption
                            label="Social drinker"
                            selected={drinkingPreference === 'Social drinker'}
                            onPress={() => setDrinkingPreference('Social drinker')}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                {/* Progress Bar */}
                <ProgressIndicator currentStep={2} totalSteps={5} />

                {/* Next Button */}
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !isFormComplete && styles.nextButtonDisabled
                    ]}
                    onPress={handleNext}
                    disabled={!isFormComplete}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
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
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    header: {
        marginTop: 24,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        lineHeight: 20,
    },
    questionContainer: {
        marginBottom: 32,
    },
    questionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
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
    bottomSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: '#fff',
    },
    nextButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: 'rgba(72, 78, 212, 0.2)',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});