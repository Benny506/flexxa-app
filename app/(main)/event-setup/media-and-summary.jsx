import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import BackButton from "../../../components/back-button";
import { fontFamilies, textSizes } from '../../../components/stylesheets/globalStyleSheet';
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useParsedParams } from '../../../hooks/useParsedParams';
import { setAppAlert } from "../../../redux/slices/appAlertSlice";
import colors from '../../../utils/colors/colors';
import { formatDuration, formatFullDate, formatReadableTime } from '../../../utils/dateUtils';
import { formatNumberWithCommas, hexToRgba } from '../../../utils/utils';
import SetupHeader from "./auxiliary/SetupHeader";

const platformFeePercent = 10
const VAT_PERCENT = 7.5

export default function MediaAndSummary() {
    const dispatch = useDispatch()

    const router = useRouter()

    const { goBack } = useAppNavigation()

    const insets = useSafeAreaInsets()

    const params = useParsedParams()
    const eventInfo = params?.eventInfo
    const timeInfo = params?.timeInfo

    const [photos, setPhotos] = useState([null, null, null]);

    useEffect(() => {
        if (!eventInfo || !timeInfo) {
            goBack()
        }
    }, [])

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

    if (!eventInfo || !timeInfo) return <></>

    const totalFlexReward = eventInfo?.price_reward * eventInfo?.max_flex_count
    const VAT_increment = VAT_PERCENT / 100 * totalFlexReward
    const platformFeeIncrement = platformFeePercent / 100 * totalFlexReward
    const totalPaymentAmount = totalFlexReward + VAT_increment + platformFeeIncrement

    const handlePay = () => {
        const hasAtLeastOnePhoto = photos.some(photo => photo !== null);

        if(!hasAtLeastOnePhoto) return dispatch(setAppAlert({ msg: 'Add at least one photo', type: 'error' }));

        const filteredPhotos = photos?.filter(Boolean)

        router.push({
            pathname: '/event-setup/pay',
            params: {
                eventInfo: JSON.stringify({
                    ...eventInfo,
                    cover_imgs: photos
                }),
                timeInfo: JSON.stringify(timeInfo),
                pricingInfo: JSON.stringify({
                    totalPaymentAmount, VAT_increment, platformFeeIncrement
                })
            }
        })
    }    

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />

                <Text style={styles.headerTitle}>Media & Summary</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{
                paddingHorizontal: 15, marginBottom: 40
            }}>
                <SetupHeader
                    activeIndex={2}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1
                }}
            >

                {/* Photos Grid */}
                <View style={{
                    paddingHorizontal: 15, marginBottom: 25
                }}>
                    <Text style={{
                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                    }}>
                        Event Pre-Photos {'('}Add photos that tell people about your new event{')'}
                    </Text>
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
                    </View>
                </View>

                <View style={{
                    height: 5, backgroundColor: hexToRgba({ hex: colors._484ED4, opacity: 0.05 }), width: '100%',
                    marginBottom: 25
                }} />

                <View style={{
                    paddingHorizontal: 15, marginBottom: 25
                }}>
                    <Text style={[
                        fontFamilies.LatoBold, textSizes.txt16,
                        {
                            color: colors._1E1E1E, fontWeight: 'bold', marginBottom: 20
                        }
                    ]}>
                        Event Summary
                    </Text>

                    {
                        [
                            { title: 'Event Name:', value: eventInfo?.title },
                            { title: 'Event Date & Time:', value: `${formatFullDate({ date: timeInfo?.date })} ${formatReadableTime({ isoString: timeInfo?.start_time })}` },
                            { title: 'Flexes Requested:', value: `${eventInfo?.min_flex_count} -  ${eventInfo?.max_flex_count}` },
                            { title: 'Total event duration:', value: `${formatDuration({ seconds: timeInfo?.duration })}` },
                        ]
                            .map((info, i) => {
                                const { title, value } = info

                                return (
                                    <View
                                        key={i}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15,
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <View style={{
                                            width: '50%'
                                        }}>
                                            <Text style={[
                                                fontFamilies.LatoRegular, textSizes.txt13,
                                                {
                                                    color: colors._7E7E7E,
                                                }
                                            ]}>
                                                {title}
                                            </Text>
                                        </View>

                                        <View style={{
                                            width: '50%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={[
                                                fontFamilies.LatoRegular, textSizes.txt13,
                                                {
                                                    color: colors._1E1E1E, textAlign: 'right'
                                                }
                                            ]}>
                                                {value}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                    }
                </View>

                <View style={{
                    height: 5, backgroundColor: hexToRgba({ hex: colors._484ED4, opacity: 0.05 }), width: '100%',
                    marginBottom: 25
                }} />

                <View style={{
                    paddingHorizontal: 15, marginBottom: 25
                }}>
                    <Text style={[
                        fontFamilies.LatoBold, textSizes.txt16,
                        {
                            color: colors._1E1E1E, fontWeight: 'bold', marginBottom: 20
                        }
                    ]}>
                        Cost Breakdown
                    </Text>

                    {
                        [
                            { title: 'Flex reward:', value: `(${eventInfo?.price_reward_currency}) ${formatNumberWithCommas({ value: eventInfo?.price_reward })} per flex X ${formatNumberWithCommas({ value: eventInfo?.max_flex_count })} Flexes = ${formatNumberWithCommas({ value: eventInfo?.price_reward * eventInfo?.max_flex_count })}` },
                            { title: 'Platform fee:', value: `${platformFeePercent}%` },
                            { title: 'VAT:', value: `${VAT_PERCENT}%` },
                            { title: 'Total payment amount:', value: `${formatNumberWithCommas({ value: totalPaymentAmount })}` },
                        ]
                            .map((info, i) => {
                                const { title, value } = info

                                return (
                                    <View
                                        key={i}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15,
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <View style={{
                                            width: '50%'
                                        }}>
                                            <Text style={[
                                                fontFamilies.LatoRegular, textSizes.txt13,
                                                {
                                                    color: colors._7E7E7E,
                                                }
                                            ]}>
                                                {title}
                                            </Text>
                                        </View>

                                        <View style={{
                                            width: '50%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={[
                                                fontFamilies.LatoRegular, textSizes.txt13,
                                                {
                                                    color: colors._1E1E1E, textAlign: 'right'
                                                }
                                            ]}>
                                                {value}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                    }
                </View>

                <View style={{
                    paddingHorizontal: 15, marginTop: 20
                }}>
                    <TouchableOpacity
                        onPress={handlePay}
                        style={{
                            width: '100%',
                            backgroundColor: colors._484ED4,
                            paddingVertical: 16.7,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={[
                            fontFamilies.LatoBold, textSizes.txt14,
                            {
                                color: colors.FFF, textAlign: 'center'
                            }
                        ]}>
                            Pay {eventInfo?.price_reward_currency} {formatNumberWithCommas({ value: totalPaymentAmount })}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: insets.bottom + 20 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    photosGrid: {
        // marginBottom: 24,
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
})