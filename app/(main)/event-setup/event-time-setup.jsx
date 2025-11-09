import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from 'react-redux';
import BackButton from "../../../components/back-button";
import DatePicker from "../../../components/DatePicker";
import CustomDropDown from "../../../components/dropdown/CustomDropDown";
import { fontFamilies, inputStyles, textSizes } from "../../../components/stylesheets/globalStyleSheet";
import { timeUnits } from "../../../constants/constants";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useParsedParams } from '../../../hooks/useParsedParams';
import { setAppAlert } from '../../../redux/slices/appAlertSlice';
import colors from "../../../utils/colors/colors";
import { formatFullDate, formatReadableTime, isBefore, isSame } from "../../../utils/dateUtils";
import { getTomorrowIso, hexToRgba } from "../../../utils/utils";
import SetupHeader from "./auxiliary/SetupHeader";



export default function EventTimeSetup() {
    const dispatch = useDispatch()

    const { goBack } = useAppNavigation()

    const router = useRouter()

    const params = useParsedParams()
    const eventInfo = params?.eventInfo

    const insets = useSafeAreaInsets()

    const [date, setDate] = useState(getTomorrowIso())
    const [durationInput, setDurationInput] = useState('')
    const [multiplyBy, setMultiplyBy] = useState(60 * 60)
    const [minDurationInput, setMinDurationInput] = useState('')
    const [minDurationMultiplyBy, setMinDurationMultiplyBy] = useState(60 * 60)
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(() => {
        if (!eventInfo) {
            goBack()
        }
    }, [])

    if (!eventInfo) return <></>

    const handleNext = () => {
        const today = new Date().toISOString()
        const dateIso = new Date(date).toISOString()

        if(isSame(today, dateIso, 'day')){
            return dispatch(setAppAlert({ msg: 'Event date cannot be set to today', type: 'error' }))
        }

        if(isBefore(dateIso, today)){
            return dispatch(setAppAlert({ msg: 'Event date cannot be set to a previous date', type: 'error' }))
        }

        const durationInput_num = Number(durationInput)
        const minDurationInput_num = Number(minDurationInput)

        if (isNaN(durationInput_num) || isNaN(minDurationInput_num)) {
            return dispatch(setAppAlert({ msg: 'Invalid duration input', type: 'error' }))
        }

        if(durationInput_num <= 0){
            return dispatch(setAppAlert({ msg: 'Event duration cannot be 0', type: 'error' }))
        }

        if(minDurationInput_num <= 0){
            return dispatch(setAppAlert({ msg: 'Flex attendance duration cannot be 0', type: 'error' }))
        }        

        const duration = durationInput_num * multiplyBy
        const attendance_duration = minDurationInput_num * minDurationMultiplyBy

        if (attendance_duration > duration) {
            return dispatch(setAppAlert({ msg: `Flex cannot stay longer than the duration of the event itself`, type: 'error' }))
        }

        router.push({
            pathname: '/event-setup/media-and-summary',
            params: {
                eventInfo: JSON.stringify(eventInfo),
                timeInfo: JSON.stringify({
                    duration,
                    attendance_duration,
                    date: new Date(date).toISOString(), 
                    start_time: new Date(date).toISOString()
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

                <Text style={styles.headerTitle}>Time setup</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{
                paddingHorizontal: 15, marginBottom: 40
            }}>
                <SetupHeader
                    activeIndex={1}
                />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                >
                    <View style={{
                        paddingHorizontal: 15, marginBottom: 20
                    }}>
                        <Text style={{
                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                        }}>
                            Event Date & start time
                        </Text>

                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={[inputStyles.input1, inputStyles.input1Text]}
                        >
                            <Text style={[inputStyles.input1Text, {
                                color: colors._000
                            }]}>
                                {formatFullDate({ date })} {formatReadableTime({ isoString: new Date(date).toISOString() })}
                            </Text>
                        </TouchableOpacity>

                        <DatePicker
                            initialDate={date}
                            visible={showDatePicker}
                            onCancel={() => setShowDatePicker(false)}
                            onConfirm={({ fullDate, year, month, day, hour, minute }) => {
                                setDate(fullDate)
                                setShowDatePicker(false)
                            }}
                        />
                    </View>

                    <View style={{
                        paddingHorizontal: 15, marginBottom: 20
                    }}>
                        <Text style={{
                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                        }}>
                            Event duration
                        </Text>
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextInput
                                keyboardType="numeric"
                                style={[inputStyles.input1, inputStyles.input1Text, { flex: 1 }]}
                                placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                value={durationInput}
                                onChangeText={num => setDurationInput(num)}
                                placeholder='How long?'
                            />
                            <View style={{
                                width: '30%',
                                paddingLeft: 10
                            }}>
                                <CustomDropDown
                                    options={timeUnits}
                                    onValueChange={({ value, title }) => {
                                        setMultiplyBy(value)
                                    }}
                                    anchorComponent={
                                        <View
                                            style={[inputStyles.input1, inputStyles.input1Text, {
                                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }]}
                                        >
                                            <Text style={[
                                                fontFamilies.GtRegular, textSizes.txt14,
                                                {
                                                    color: colors._000, textTransform: 'lowercase'
                                                }
                                            ]}>
                                                {
                                                    timeUnits?.filter(tu => tu?.value === multiplyBy)?.[0]?.title || 'unit'
                                                }
                                            </Text>

                                            <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 15, marginBottom: 20
                    }}>
                        <Text style={{
                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                        }}>
                            Minimum duration for flex
                        </Text>
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextInput
                                keyboardType="numeric"
                                style={[inputStyles.input1, inputStyles.input1Text, { flex: 1 }]}
                                placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                value={minDurationInput}
                                onChangeText={num => setMinDurationInput(num)}
                                placeholder='How long should flex stay for?'
                            />
                            <View style={{
                                width: '30%',
                                paddingLeft: 10
                            }}>
                                <CustomDropDown
                                    options={timeUnits}
                                    onValueChange={({ value, title }) => {
                                        setMinDurationMultiplyBy(value)
                                    }}
                                    anchorComponent={
                                        <View
                                            style={[inputStyles.input1, inputStyles.input1Text, {
                                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }]}
                                        >
                                            <Text style={[
                                                fontFamilies.GtRegular, textSizes.txt14,
                                                {
                                                    color: colors._000, textTransform: 'lowercase'
                                                }
                                            ]}>
                                                {
                                                    timeUnits?.filter(tu => tu?.value === minDurationMultiplyBy)?.[0]?.title || 'unit'
                                                }
                                            </Text>

                                            <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 15, marginTop: 20
                    }}>
                        <TouchableOpacity
                            onPress={handleNext}
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
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingBottom: insets.bottom + 20 }} />
                </ScrollView>
            </KeyboardAvoidingView>
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