import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../assets/images/loader.svg';
import BackButton from '../../components/back-button';
import ErrorMsg1 from '../../components/ErrorMsg1';
import ProgressIndicator from '../../components/progress-indicator';
import useApiReqs from '../../hooks/useApiReqs';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { setAppAlert } from '../../redux/slices/appAlertSlice';
import { appLoadStart, appLoadStop } from '../../redux/slices/appLoadingSlice';
import { getUserDetailsState } from '../../redux/slices/userDetailsSlice';
import { getPublicImageUrl, uploadAssets } from '../../utils/apiRequests/requestApi';


export default function AddPhotos() {
    const dispatch = useDispatch()

    const { goBack } = useAppNavigation()

    const router = useRouter();

    const { updateProfile } = useApiReqs()

    const params = useLocalSearchParams()

    const user = useSelector(state => getUserDetailsState(state).user)

    const [photos, setPhotos] = useState([null, null, null, null, null]);
    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null });

    useEffect(() => {
        if (!params?.email || !params?.interests) {
            goBack()
        }
    }, [])

    if (!params?.email || !params?.interests) return <></>

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
            dispatch(setAppAlert({ msg: 'Failed to pick image', type: 'error' }))
        }
    };

    const removePhoto = (index) => {
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
    };

    const uploadFiles = async () => {
        try {
            const hasAtLeastOnePhoto = photos.some(photo => photo !== null);

            if (!hasAtLeastOnePhoto) {
                return dispatch(setAppAlert({ msg: 'Upload at least one photo', type: 'info' }))
            }

            const filteredPhotos = photos?.filter(Boolean)

            dispatch(appLoadStart())

            const { uris, error } = await uploadAssets({ uris: filteredPhotos, bucket_name: 'user_profiles', ext: 'png', id: user?.id })

            if (error) throw new Error();

            const update = {
                gender: params?.gender,
                interests: params?.interests?.split(","),
                profile_imgs: uris?.map(uri => getPublicImageUrl({ path: uri, bucket_name: 'user_profiles' })),
                preferences: {
                    drinking: params?.drinkingPreferences,
                    allergies: params?.hasAllergies,
                    healthConditions: params?.hasHealthConditions,
                    smoking: params?.smokingPreferences,
                    healthConditionsText: params?.healthConditionsText,
                    allergiesText: params?.allergiesText
                }
            }

            await updateProfile({
                update,
                callBack: ({}) => {
                    router.push('/verification');
                }
            })
            

        } catch (error) {
            console.log(error)
            return apiReqError({ errorMsg: 'Error uploading profile pictures! Try again later.' })
        }
    };

    const apiReqError = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg: null, data: null })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))
        dispatch(appLoadStop())

        return;
    }

    const hasAtLeastOnePhoto = photos.some(photo => photo !== null);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <View style={{ paddingHorizontal: 24, marginBottom: 15 }}>
                <BackButton
                    onPress={goBack}
                />
            </View>

            <View style={styles.content}>
                {/* Title */}
                <View style={styles.header}>
                    <Text style={styles.title}>Add Your Photos</Text>
                    <Text style={styles.subtitle}>
                        Show your best side! Upload up to 5 photos to personalize your profile.
                    </Text>
                </View>

                <Text style={styles.note}>Your first photo will be your profile picture.</Text>

                {/* Photos Grid */}
                <View style={styles.photosGrid}>
                    {/* First Row - 3 photos */}
                    <View style={styles.photoRow}>
                        {[0, 1, 2].map((index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.photoBox,
                                    index === 0 && styles.profilePhotoBox,
                                ]}
                                onPress={() => pickImage(index)}
                                activeOpacity={0.7}
                            >
                                {photos[index] ? (
                                    <View style={styles.photoContainer}>
                                        <Image
                                            source={{ uri: photos[index] }}
                                            style={styles.photo}
                                        />
                                        {index === 0 && (
                                            <View style={styles.profileBadge}>
                                                <Text style={styles.profileBadgeText}>Profile photo</Text>
                                            </View>
                                        )}
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => removePhoto(index)}
                                        >
                                            <Ionicons name="trash-outline" size={16} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.emptyPhotoContent}>
                                        <Ionicons name="image-outline" size={28} color="#999" />
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
                                onPress={() => pickImage(index)}
                                activeOpacity={0.7}
                            >
                                {photos[index] ? (
                                    <View style={styles.photoContainer}>
                                        <Image
                                            source={{ uri: photos[index] }}
                                            style={styles.photo}
                                        />
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => removePhoto(index)}
                                        >
                                            <Ionicons name="trash-outline" size={16} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.emptyPhotoContent}>
                                        <Ionicons name="image-outline" size={28} color="#999" />
                                        <Text style={styles.addPhotoText}>+ Add Photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


                <View style={styles.spacer} />

                {
                    apiReqs.errorMsg
                    &&
                    <ErrorMsg1 errorMsg={apiReqs.errorMsg} isCentered={true} />
                }

                {/* Info Message */}
                <View style={styles.infoContainer}>
                    <Ionicons name="information-circle-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>Add at least one photo to proceed</Text>
                </View>

                {/* Progress Bar */}
                <ProgressIndicator currentStep={5} totalSteps={5} />

                {/* Next Button */}
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !hasAtLeastOnePhoto && styles.nextButtonDisabled
                    ]}
                    onPress={uploadFiles}
                    disabled={!hasAtLeastOnePhoto || apiReqs.isLoading}
                >
                    {apiReqs.isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.nextButtonText}>Create Profile</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Loading Overlay */}
            {apiReqs.isLoading && (
                <View style={styles.loadingOverlay}>
                    <Loader />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )}
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
        marginBottom: 16,
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
    note: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    photosGrid: {
        marginBottom: 24,
    },
    photoRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
        justifyContent: 'start',
    },
    photoBox: {
        width: 100,
        height: 130,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        borderStyle: 'dashed',
        overflow: 'hidden',
    },
    profilePhotoBox: {
        // Same size as others
    },
    emptyPhotoContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    addPhotoText: {
        fontSize: 12,
        color: '#999',
        marginTop: 8,
        fontWeight: '500',
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
    profileBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    profileBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    deleteButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'start',
        gap: 8,
        marginVertical: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        margin: 4,
        textAlign: 'center'
    },
});