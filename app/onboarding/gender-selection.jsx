import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProgressIndicator from '../../components/progress-indicator';

export default function GenderSelectionScreen() {
    const router = useRouter();
    const [selectedGender, setSelectedGender] = useState('');

    const handleNext = () => {
        if (selectedGender) {
            router.push('/onboarding/lifestyle-preferences');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.content}>
                {/* Title */}
                <View style={styles.header}>
                    <Text style={styles.title}>What is your gender?</Text>
                    <Text style={styles.subtitle}>
                        Pick a gender that best describes you. This helps us personalize your experience on Flexxa.
                    </Text>
                </View>

                {/* Gender Options */}
                <View style={styles.optionsContainer}>
                    <Text style={styles.label}>Select your gender</Text>
                    
                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedGender === 'Male' && styles.optionButtonSelected
                        ]}
                        onPress={() => setSelectedGender('Male')}
                        activeOpacity={0.7}
                    >
                        <Ionicons 
                            name="male" 
                            size={20} 
                            color={selectedGender === 'Male' ? '#484ED4' : '#1a1a1a'} 
                            style={styles.icon}
                        />
                        <Text style={[
                            styles.optionText,
                            selectedGender === 'Male' && styles.optionTextSelected
                        ]}>
                            Male
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionButton,
                            selectedGender === 'Female' && styles.optionButtonSelected
                        ]}
                        onPress={() => setSelectedGender('Female')}
                        activeOpacity={0.7}
                    >
                        <Ionicons 
                            name="female" 
                            size={20} 
                            color={selectedGender === 'Female' ? '#484ED4' : '#1a1a1a'} 
                            style={styles.icon}
                        />
                        <Text style={[
                            styles.optionText,
                            selectedGender === 'Female' && styles.optionTextSelected
                        ]}>
                            Female
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.spacer} />

                {/* Progress Bar */}
                <ProgressIndicator currentStep={1} totalSteps={5} />

                {/* Next Button */}
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !selectedGender && styles.nextButtonDisabled
                    ]}
                    onPress={handleNext}
                    disabled={!selectedGender}
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
    content: {
        flex: 1,
        paddingHorizontal: 24,
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
    optionsContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    optionButtonSelected: {
        borderColor: '#484ED4',
        backgroundColor: '#F5F6FF',
    },
    icon: {
        marginRight: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#484ED4',
        fontWeight: '600',
    },
    spacer: {
        flex: 1,
    },
    nextButton: {
        backgroundColor: '#484ED4',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    nextButtonDisabled: {
        backgroundColor: '#D9DFFE',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});