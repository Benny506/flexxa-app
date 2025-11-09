import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../../components/back-button';
import { getUserDetailsState } from '../../../redux/slices/userDetailsSlice';

export default function EditProfile() {
    const router = useRouter();

    const profile = useSelector(state => getUserDetailsState(state).profile)

    console.log(profile?.phoneData)

    const [photos, setPhotos] = useState([
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
        null,
    ]);

    // Form state
    const [fullName, setFullName] = useState('John Doe');
    const [email] = useState('johndoe@email.com');
    const [phoneNumber, setPhoneNumber] = useState('00000000000');
    const [dateOfBirth, setDateOfBirth] = useState({
        day: '10',
        month: '05',
        year: '1995',
    });
    const [gender, setGender] = useState('Male');
    const [showGenderPicker, setShowGenderPicker] = useState(false);

    // Interests state
    const [selectedInterests, setSelectedInterests] = useState([
        'Beach party',
        'Boat cruise',
        'Concert',
    ]);
    const [showOthersInput, setShowOthersInput] = useState(true);
    const [otherInterests, setOtherInterests] = useState('Pool party, concert, beach party');

    const interests = [
        { id: 'beach-party', label: 'Beach party', icon: '🏖️' },
        { id: 'boat-cruise', label: 'Boat cruise', icon: '🚤' },
        { id: 'concert', label: 'Concert', icon: '🎸' },
        { id: 'club-party', label: 'Club party', icon: '🎉' },
        { id: 'corporate-events', label: 'Corporate events', icon: '🏢' },
        { id: 'hangouts', label: 'Hangouts', icon: '👥' },
        { id: 'house-party', label: 'House party', icon: '🏠' },
        { id: 'stripping', label: 'Stripping', icon: '💃' },
        { id: 'others', label: 'Others', icon: '🌟' },
    ];

    const pickImage = async (index) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });

            if (!result.canceled) {
                const newPhotos = [...photos];
                newPhotos[index] = result.assets[0].uri;
                setPhotos(newPhotos);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleDeletePhoto = (index) => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const newPhotos = [...photos];
                        newPhotos[index] = null;
                        setPhotos(newPhotos);
                    },
                },
            ]
        );
    };

    const toggleInterest = (interest) => {
        if (interest === 'Others') {
            setShowOthersInput(!showOthersInput);
            if (!showOthersInput) {
                setSelectedInterests([...selectedInterests, 'Others']);
            } else {
                setSelectedInterests(selectedInterests.filter(i => i !== 'Others'));
                setOtherInterests('');
            }
        } else {
            if (selectedInterests.includes(interest)) {
                setSelectedInterests(selectedInterests.filter(i => i !== interest));
            } else {
                setSelectedInterests([...selectedInterests, interest]);
            }
        }
    };

    const handleSaveChanges = () => {
        Alert.alert('Success', 'Profile updated successfully!');
        router.back();
    };

    const genderOptions = ['Male', 'Female'];

    const selectGender = (selectedGender) => {
        setGender(selectedGender);
        setShowGenderPicker(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.backButtonContainer}>
                    <BackButton onPress={() => router.back()} />
                </View>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Photo Grid */}
                <View style={styles.photoGridContainer}>
                    {/* First Row - 3 photos */}
                    <View style={styles.photoRow}>
                        {[0, 1, 2].map((index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.photoBox}
                                onPress={() => photos[index] ? null : pickImage(index)}
                                activeOpacity={0.7}
                            >
                                {photos[index] ? (
                                    <View style={styles.photoContainer}>
                                        <Image source={{ uri: photos[index] }} style={styles.photo} />
                                        {index === 0 && (
                                            <View style={styles.profilePhotoBadge}>
                                                <Text style={styles.profilePhotoText}>Profile photo</Text>
                                            </View>
                                        )}
                                        <TouchableOpacity
                                            style={styles.deletePhotoButton}
                                            onPress={() => handleDeletePhoto(index)}
                                        >
                                            <Ionicons name="trash-outline" size={14} color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.emptyPhotoContent}>
                                        <Ionicons name="image-outline" size={24} color="#999" />
                                        <Text style={styles.addPhotoText}>+ Add Photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Second Row - 2 photos */}
                    <View style={styles.photoRow}>
                        {[3, 4].map((index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.photoBox}
                                onPress={() => photos[index] ? null : pickImage(index)}
                                activeOpacity={0.7}
                            >
                                {photos[index] ? (
                                    <View style={styles.photoContainer}>
                                        <Image source={{ uri: photos[index] }} style={styles.photo} />
                                        <TouchableOpacity
                                            style={styles.deletePhotoButton}
                                            onPress={() => handleDeletePhoto(index)}
                                        >
                                            <Ionicons name="trash-outline" size={14} color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.emptyPhotoContent}>
                                        <Ionicons name="image-outline" size={24} color="#999" />
                                        <Text style={styles.addPhotoText}>+ Add Photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Personal Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            editable={false}
                            style={[styles.input, styles.disabledInput]}
                            value={profile?.full_name}
                            onChangeText={setFullName}
                            placeholder="John Doe"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Email address</Text>
                            <View style={styles.verifiedBadge}>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                <Text style={styles.verifiedText}>Verified</Text>
                            </View>
                        </View>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={email}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone number</Text>
                        <TextInput
                            style={styles.input}
                            value={profile?.phoneData?.phone_number}
                            onChangeText={setPhoneNumber}
                            placeholder={profile?.phoneData?.phone_number}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date of birth</Text>
                        <View style={styles.dateRow}>
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                value={dateOfBirth.day}
                                onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, day: text })}
                                placeholder="10"
                                keyboardType="number-pad"
                                maxLength={2}
                            />
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                value={dateOfBirth.month}
                                onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, month: text })}
                                placeholder="05"
                                keyboardType="number-pad"
                                maxLength={2}
                            />
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                value={dateOfBirth.year}
                                onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, year: text })}
                                placeholder="1995"
                                keyboardType="number-pad"
                                maxLength={4}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <TouchableOpacity
                            style={styles.genderContainer}
                            onPress={() => setShowGenderPicker(!showGenderPicker)}
                        >
                            <Ionicons name="male" size={20} color="#999" />
                            <Text style={styles.genderText}>{gender}</Text>
                            <Ionicons name="chevron-down" size={20} color="#999" style={styles.chevronIcon} />
                        </TouchableOpacity>

                        {showGenderPicker && (
                            <View style={styles.genderDropdown}>
                                {genderOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.genderOption,
                                            gender === option && styles.genderOptionSelected
                                        ]}
                                        onPress={() => selectGender(option)}
                                    >
                                        <Text style={[
                                            styles.genderOptionText,
                                            gender === option && styles.genderOptionTextSelected
                                        ]}>
                                            {option}
                                        </Text>
                                        {gender === option && (
                                            <Ionicons name="checkmark" size={20} color="#484ED4" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.infoBox}>
                        <Ionicons name="information-circle-outline" size={20} color="#666" />
                        <Text style={styles.infoText}>
                            All personal information are linked to your account and cannot be changed.
                        </Text>
                    </View>
                </View>

                {/* Your Interests */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Interests</Text>
                    <Text style={styles.sectionSubtitle}>
                        Update your interests to tailor your experience on Flexxa
                    </Text>

                    <View style={styles.interestsGrid}>
                        {interests.map((interest) => (
                            <TouchableOpacity
                                key={interest.id}
                                style={[
                                    styles.interestChip,
                                    selectedInterests.includes(interest.label) && styles.interestChipSelected,
                                ]}
                                onPress={() => toggleInterest(interest.label)}
                            >
                                <Text style={styles.interestIcon}>{interest.icon}</Text>
                                <Text
                                    style={[
                                        styles.interestLabel,
                                        selectedInterests.includes(interest.label) && styles.interestLabelSelected,
                                    ]}
                                >
                                    {interest.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {showOthersInput && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Input other interests</Text>
                            <View style={styles.otherInterestsContainer}>
                                <TextInput
                                    style={styles.otherInterestsInput}
                                    value={otherInterests}
                                    onChangeText={setOtherInterests}
                                    placeholder="Enter your interests"
                                />
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={() => setOtherInterests('')}
                                >
                                    <Ionicons name="close-circle" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 24, 
        marginBottom: 15        
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        paddingTop: 10,
    },
    backButtonContainer: {
        // paddingHorizontal: 24, 
        // marginBottom: 15
    },
    headerSpacer: {
        width: 24,
    },
    scrollView: {
        flex: 1,
    },
    photoGridContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    photoRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    photoBox: {
        width: 108,
        height: 130,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderStyle: 'dashed',
    },
    photoContainer: {
        flex: 1,
        position: 'relative',
    },
    photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profilePhotoBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 6,
    },
    profilePhotoText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '600',
        textAlign: 'center',
    },
    deletePhotoButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 6,
        borderRadius: 50,
    },
    emptyPhotoContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoText: {
        color: '#999',
        fontSize: 11,
        marginTop: 6,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#999',
        marginBottom: 12,
        lineHeight: 18,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#FFF',
    },
    disabledInput: {
        backgroundColor: '#F9FAFB',
        color: '#999',
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    verifiedText: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '500',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    dateInput: {
        flex: 1,
        textAlign: 'center',
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: '#FFF',
    },
    genderText: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    chevronIcon: {
        marginLeft: 'auto',
    },
    genderDropdown: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    genderOptionSelected: {
        backgroundColor: '#F9FAFB',
    },
    genderOptionText: {
        fontSize: 14,
        color: '#333',
    },
    genderOptionTextSelected: {
        color: '#484ED4',
        fontWeight: '600',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        padding: 12,
        marginTop: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 8,
    },
    interestChip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#FFF',
    },
    interestChipSelected: {
        backgroundColor: '#484ED4',
        borderColor: '#484ED4',
    },
    interestIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    interestLabel: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    interestLabelSelected: {
        color: '#FFF',
    },
    otherInterestsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    otherInterestsInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        paddingRight: 40,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#FFF',
    },
    clearButton: {
        position: 'absolute',
        right: 12,
    },
    saveButton: {
        backgroundColor: '#484ED4',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSpacer: {
        height: 40,
    },
});