import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NumericKeyboard from '../../components/keyboard';

export default function AgeVerification() {
    const router = useRouter();

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const [activeInput, setActiveInput] = useState('day');
    const [showModal, setShowModal] = useState(false);
    const [age, setAge] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBack = () => router.push("/welcome");

    const handleKeyboardPress = (value) => {
        setErrorMessage('');
        
        if (activeInput === 'day') {
            const newDay = (day + value).slice(0, 2);
            setDay(newDay);
            if (newDay.length === 2) {
                monthRef.current?.focus();
            }
        }
        if (activeInput === 'month') {
            const newMonth = (month + value).slice(0, 2);
            setMonth(newMonth);
            if (newMonth.length === 2) {
                yearRef.current?.focus();
            }
        }
        if (activeInput === 'year') {
            setYear((prev) => (prev + value).slice(0, 4));
        }
    };

    const handleDelete = () => {
        setErrorMessage(''); 
        
        if (activeInput === 'day') {
            if (day.length > 0) {
                setDay(day.slice(0, -1));
            }
        }
        if (activeInput === 'month') {
            if (month.length > 0) {
                setMonth(month.slice(0, -1));
            } else {
                dayRef.current?.focus();
            }
        }
        if (activeInput === 'year') {
            if (year.length > 0) {
                setYear(year.slice(0, -1));
            } else {
                monthRef.current?.focus();
            }
        }
    };

    const calculateAge = (birthDay, birthMonth, birthYear) => {
        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        
        return calculatedAge;
    };

    const handleContinue = () => {
        // Validate inputs
        if (!day || !month || !year || day.length < 2 || month.length < 2 || year.length < 4) {
            setErrorMessage('Please enter a valid date of birth');
            return;
        }

        const dayNum = parseInt(day);
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);

        // Basic validation
        if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
            setErrorMessage('Please enter a valid date of birth');
            return;
        }

        const calculatedAge = calculateAge(dayNum, monthNum, yearNum);
        setAge(calculatedAge);

        // Check if under 18
        if (calculatedAge < 18) {
            setErrorMessage('Sorry, you must be at least 18 years old to join Flexxa.');
            return;
        }

        // Show confirmation modal
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        router.push('/auth/signin');
    };

    const handleCheckAgain = () => {
        setShowModal(false);
    };

    const isFormComplete = day.length === 2 && month.length === 2 && year.length === 4;

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Feather name="chevron-left" size={28} color="black" />
            </TouchableOpacity>

            {/* Content */}
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>How Old Are You?</Text>
                    <Text style={styles.subtitle}>Please input your age to continue</Text>
                </View>

                {/* Input Section */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Enter your date of birth</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            ref={dayRef}
                            style={[
                                styles.input,
                                activeInput === 'day' && styles.inputFocused
                            ]}
                            value={day}
                            placeholder="DD"
                            placeholderTextColor="#D1D1D6"
                            showSoftInputOnFocus={false}
                            // caretHidden={true}
                            onFocus={() => setActiveInput('day')}
                        />
                        <TextInput
                            ref={monthRef}
                            style={[
                                styles.input,
                                activeInput === 'month' && styles.inputFocused
                            ]}
                            value={month}
                            placeholder="MM"
                            placeholderTextColor="#D1D1D6"
                            showSoftInputOnFocus={false}
                            // caretHidden={true}
                            onFocus={() => setActiveInput('month')}
                        />
                        <TextInput
                            ref={yearRef}
                            style={[
                                styles.input,
                                activeInput === 'year' && styles.inputFocused
                            ]}
                            value={year}
                            placeholder="YYYY"
                            placeholderTextColor="#D1D1D6"
                            showSoftInputOnFocus={false}
                            // caretHidden={true}
                            onFocus={() => setActiveInput('year')}
                        />
                    </View>

                    {/* Error Message */}
                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            isFormComplete && styles.continueButtonActive
                        ]}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Numeric Keyboard */}
            <NumericKeyboard 
                onPress={handleKeyboardPress} 
                onDelete={handleDelete} 
                onConfirm={handleContinue} 
            />

            {/* Confirmation Modal */}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <Pressable 
                    style={styles.modalOverlay}
                    onPress={() => setShowModal(false)}
                >
                    <BlurView intensity={20} style={styles.blurView}>
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>You are {age}</Text>
                                <Text style={styles.modalSubtitle}>
                                    Confirm your age before proceeding. This cannot be changed.
                                </Text>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.checkAgainButton}
                                        onPress={handleCheckAgain}
                                    >
                                        <Text style={styles.checkAgainButtonText}>Check Again</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={handleConfirm}
                                    >
                                        <Text style={styles.confirmButtonText}>Yes, I am {age}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Pressable>
                    </BlurView>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 24,
        paddingTop: 60,
        justifyContent: 'space-between',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 24,
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '400',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 12,
        fontWeight: '500',
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 12,
        textAlign: 'start',
        fontSize: 18,
        fontWeight: '400',
        color: '#000000',
    },
    inputFocused: {
        borderColor: '#484ED4',
        borderWidth: 1,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        marginBottom: 12,
        textAlign: 'left',
    },
    continueButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#C8CAE8',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonActive: {
        backgroundColor: '#484ED4',
        shadowColor: '#484ED4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 32,
        width: 340,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 12,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    checkAgainButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#484ED4',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkAgainButtonText: {
        color: '#484ED4',
        fontSize: 15,
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#484ED4',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});