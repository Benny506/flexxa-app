import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import BackButton from '../../components/back-button';
import ProgressIndicator from '../../components/progress-indicator';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';

export default function InterestsScreen() {
    const dispatch = useDispatch()
    
    const { goBack } = useAppNavigation()
    
    const router = useRouter();

    const params = useLocalSearchParams()

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [otherInterestsText, setOtherInterestsText] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    useEffect(() => {
        if(!params?.email || !params?.hasHealthConditions || !params?.hasAllergies){
            goBack()
        }
    }, [])

    if(!params?.email || !params?.hasHealthConditions || !params?.hasAllergies) return <></>

    const interests = [
        { id: 'beach-party', label: 'Beach party', emoji: '🏖️' },
        { id: 'boat-cruise', label: 'Boat cruise', emoji: '🚢' },
        { id: 'concert', label: 'Concert', emoji: '🎤' },
        { id: 'club-party', label: 'Club party', emoji: '🎊' },
        { id: 'corporate-events', label: 'Corporate events', emoji: '🏢' },
        { id: 'hangouts', label: 'Hangouts', emoji: '👥' },
        { id: 'house-party', label: 'House party', emoji: '🏠' },
        { id: 'stripping', label: 'Stripping', emoji: '💃' },
    ];

    const toggleInterest = (interestId) => {
        setSelectedInterests(prev => {
            if (prev.includes(interestId)) {
                return prev.filter(id => id !== interestId);
            } else {
                return [...prev, interestId];
            }
        });
    };

    const toggleOthers = () => {
        if (selectedInterests.includes('others')) {
            setSelectedInterests(prev => prev.filter(id => id !== 'others'));
            setShowOtherInput(false);
            setOtherInterestsText('');
        } else {
            setSelectedInterests(prev => [...prev, 'others']);
            setShowOtherInput(true);
        }
    };

    const clearOtherInterests = () => {
        setOtherInterestsText('');
    };

    const canNext = () => {
        if(selectedInterests.length <= 0) return false;

        if(selectedInterests.includes('others') && !otherInterestsText) return false

        return true;
    }

    const handleNext = () => {
        if (!canNext()) {
            dispatch(setAppAlert({ msg: 'All fields are required', type: 'info' }))
            return
        }

        let interests = [selectedInterests]

        if(interests.includes('others')){
            
            if(!otherInterestsText){
                dispatch(setAppAlert({ msg: 'All fields are required', type: 'info' }))                
                return;
            }

            interests.map(i => {
                if(i === 'others'){
                    return otherInterestsText
                }

                return i
            })
        }

        router.push({
            pathname: '/onboarding/add-photos',
            params: {
                ...params, 
                interests
            }
        });
    };

    const isFormComplete = canNext()

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={{ paddingHorizontal: 24, marginBottom: 15 }}>
                <BackButton
                    onPress={goBack}
                />
            </View>            
            
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
                            <Text style={styles.title}>What are your interests?</Text>
                            <Text style={styles.subtitle}>
                                Choose the activities you love,this helps us tailor your Flexxa experience!
                            </Text>
                        </View>

                        {/* Interests Grid */}
                        <View style={styles.interestsGrid}>
                            {interests.map((interest) => (
                                <TouchableOpacity
                                    key={interest.id}
                                    style={[
                                        styles.interestChip,
                                        selectedInterests.includes(interest.id) && styles.interestChipSelected
                                    ]}
                                    onPress={() => toggleInterest(interest.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.emoji}>{interest.emoji}</Text>
                                    <Text style={[
                                        styles.interestLabel,
                                        selectedInterests.includes(interest.id) && styles.interestLabelSelected
                                    ]}>
                                        {interest.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity
                                style={[
                                    styles.interestChip,
                                    selectedInterests.includes('others') && styles.interestChipSelected
                                ]}
                                onPress={toggleOthers}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.emoji}>😎</Text>
                                <Text style={[
                                    styles.interestLabel,
                                    selectedInterests.includes('others') && styles.interestLabelSelected
                                ]}>
                                    Others
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Other Interests Input */}
                        {showOtherInput && (
                            <View style={styles.otherInputContainer}>
                                <Text style={styles.otherInputLabel}>Input other interests</Text>
                                <View style={styles.otherInputWrapper}>
                                    <TextInput
                                        style={styles.otherInput}
                                        value={otherInterestsText}
                                        onChangeText={setOtherInterestsText}
                                        placeholder="e.g pool party..."
                                        placeholderTextColor="#999"
                                    />
                                    {otherInterestsText.length > 0 && (
                                        <TouchableOpacity 
                                            onPress={clearOtherInterests}
                                            style={styles.clearButton}
                                        >
                                            <Ionicons name="close-circle" size={20} color="#999" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    {/* Progress Bar */}
                    <ProgressIndicator currentStep={4} totalSteps={5} />

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
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    interestChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        // borderWidth: 1.5,
        // borderColor: '#E5E5E5',
        borderRadius: 12,
        backgroundColor: 'rgba(72, 78, 212, 0.05)',
    },
    interestChipSelected: {
        borderColor: '#882FAE',
        borderWidth: 1,
        // backgroundColor: '#F5F6FF',
    },
    emoji: {
        fontSize: 18,
        marginRight: 6,
    },
    interestLabel: {
        fontSize: 15,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    interestLabelSelected: {
        color: '#484ED4',
        fontWeight: '600',
    },
    otherInputContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    otherInputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    otherInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    otherInput: {
        flex: 1,
        fontSize: 15,
        color: '#1a1a1a',
    },
    clearButton: {
        padding: 4,
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