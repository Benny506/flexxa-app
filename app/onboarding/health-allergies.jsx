import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProgressIndicator from '../../components/progress-indicator';

export default function HealthAllergiesScreen() {
    const router = useRouter();
    const [hasHealthConditions, setHasHealthConditions] = useState('');
    const [healthConditionsText, setHealthConditionsText] = useState('');
    const [hasAllergies, setHasAllergies] = useState('');
    const [allergiesText, setAllergiesText] = useState('');

    const handleNext = () => {
        if (hasHealthConditions && hasAllergies) {
            router.push('/onboarding/interests');
        }
    };

    const isFormComplete = hasHealthConditions && hasAllergies;

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

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {/* Title */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Health & Allergies</Text>
                            <Text style={styles.subtitle}>
                                Let us know about any health conditions or allergies to ensure your safety at events.
                            </Text>
                        </View>

                        {/* Health Conditions Question */}
                        <View style={styles.questionContainer}>
                            <Text style={styles.questionTitle}>Do you have any health conditions?</Text>

                            <RadioOption
                                label="Yes"
                                selected={hasHealthConditions === 'Yes'}
                                onPress={() => setHasHealthConditions('Yes')}
                            />
                            <RadioOption
                                label="No"
                                selected={hasHealthConditions === 'No'}
                                onPress={() => setHasHealthConditions('No')}
                            />

                            {/* Show text input if Yes is selected */}
                            {hasHealthConditions === 'Yes' && (
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.inputLabel}>Describe any health conditions</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={healthConditionsText}
                                        onChangeText={setHealthConditionsText}
                                        placeholder="e.g asthma, high blood pressure, diabetes..."
                                        placeholderTextColor="#999"
                                        multiline
                                    />
                                </View>
                            )}
                        </View>

                        {/* Allergies Question */}
                        <View style={styles.questionContainer}>
                            <Text style={styles.questionTitle}>Do you have any allergies?</Text>

                            <RadioOption
                                label="Yes"
                                selected={hasAllergies === 'Yes'}
                                onPress={() => setHasAllergies('Yes')}
                            />
                            <RadioOption
                                label="No"
                                selected={hasAllergies === 'No'}
                                onPress={() => setHasAllergies('No')}
                            />

                            {/* Show text input if Yes is selected */}
                            {hasAllergies === 'Yes' && (
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.inputLabel}>List your allergies</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={allergiesText}
                                        onChangeText={setAllergiesText}
                                        placeholder="Peanuts, chocolate, alcohol..."
                                        placeholderTextColor="#999"
                                        multiline
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    {/* Progress Bar */}
                    <ProgressIndicator currentStep={3} totalSteps={5} />

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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flex: {
        flex: 1,
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
    textInputContainer: {
        marginTop: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1a1a1a',
        minHeight: 60,
        textAlignVertical: 'top',
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
        backgroundColor: '#D9DFFE',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});