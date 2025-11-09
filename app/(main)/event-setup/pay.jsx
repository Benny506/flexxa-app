import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/back-button";
import ErrorMsg1 from "../../../components/ErrorMsg1";
import AppLoading from "../../../components/loaders/AppLoading";
import { fontFamilies, textSizes } from "../../../components/stylesheets/globalStyleSheet";
import supabase from "../../../database/dbInit";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useParsedParams } from "../../../hooks/useParsedParams";
import { setAppAlert } from "../../../redux/slices/appAlertSlice";
import { getUserDetailsState, setUserDetails } from "../../../redux/slices/userDetailsSlice";
import { getPublicImageUrl, uploadAssets } from "../../../utils/apiRequests/requestApi";
import colors from "../../../utils/colors/colors";
import SetupHeader from "./auxiliary/SetupHeader";
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';

export default function Pay() {
    const dispatch = useDispatch()

    const { goBack } = useAppNavigation()

    const router = useRouter()

    const insets = useSafeAreaInsets()

    const params = useParsedParams()
    const eventInfo = params?.eventInfo
    const timeInfo = params?.timeInfo
    const pricingInfo = params?.pricingInfo

    const user = useSelector(state => getUserDetailsState(state).user)
    const myEvents = useSelector(state => getUserDetailsState(state).myEvents)

    const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null, data: null })

    useEffect(() => {
        if (!eventInfo || !timeInfo || !pricingInfo) {
            goBack()
            return;
        }

        setApiReqs({ isLoading: true, errorMsg: null, data: null })
        makePayment()
    }, [])

    if (!eventInfo || !timeInfo || !pricingInfo) return <></>;

    const makePayment = () => {
        const { totalPaymentAmount, VAT_increment, platformFeeIncrement } = pricingInfo

        setTimeout(() => {
            createEvent()
        }, 3000)
    }

    const createEvent = async () => {
        try {

            const event_id = '123' // uuidv4(); change to this after build

            const { uris } = await uploadAssets({ uris: eventInfo?.cover_imgs, bucket_name: 'events', ext: 'png', id: event_id })

            const requestInfo = {
                // id: event_id,
                title: eventInfo?.title,
                flexr_id: user?.id,
                about: eventInfo?.about,
                date: new Date(timeInfo?.date).toISOString().split("T")[0],
                type: eventInfo?.type,
                gender: eventInfo?.gender,
                duration: timeInfo?.duration,
                start_time: timeInfo?.start_time,
                min_flex_count: eventInfo?.min_flex_count,
                max_flex_count: eventInfo?.max_flex_count,
                instructions: eventInfo?.instructions,
                activities: eventInfo?.activities,
                cover_imgs: uris,
                price_reward: eventInfo?.price_reward,
                price_reward_currency: eventInfo?.price_reward_currency,
                country: eventInfo?.country,
                state: eventInfo?.state,
                city: eventInfo?.city,
                address: eventInfo?.address,
                attendance_duration: timeInfo?.attendance_duration,
            }

            const { data, error } = await supabase
                .from("events")
                .insert(requestInfo)
                .select("*")
                .single()

            if (error) {
                console.log(error)
                throw new Error()
            }

            const enrichedEvent = {
                ...data,
                image_urls: data?.cover_imgs?.map(imgPath => getPublicImageUrl({ path: imgPath, bucket_name: 'events' }))
            }

            const updatedMyEvents = [enrichedEvent, ...(myEvents || [])]

            dispatch(setUserDetails({
                myEvents: updatedMyEvents
            }))

            router.replace("/(main)/(tabs)/home")

            dispatch(setAppAlert({ msg: 'Event created', type: 'success' }))

            return;

        } catch (error) {
            console.log(error)
            return apiReqError({ errorMsg: "Error creating event. Let's do that again." })
        }
    }

    const apiReqError = ({ errorMsg }) => {
        setApiReqs({
            isLoading: false, errorMsg, data: null
        })
        dispatch(setAppAlert({ msg: errorMsg, type: 'error' }))
    }

    const handleRetry = () => {
        makePayment()
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />

                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{
                paddingHorizontal: 15, marginBottom: 40
            }}>
                <SetupHeader
                    activeIndex={3}
                />
            </View>

            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'space-between'
            }}>
                <AppLoading tempLoading={apiReqs.isLoading} />

                <View>

                </View>

                <View>
                    {
                        apiReqs.errorMsg
                        &&
                        <View>
                            <ErrorMsg1 errorMsg={apiReqs.errorMsg} />

                            <TouchableOpacity
                                onPress={handleRetry}
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
                                    Retry
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={{ paddingBottom: insets.bottom + 20 }} />
                </View>
            </View>
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
})