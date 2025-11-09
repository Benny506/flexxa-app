import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ErrorMessage, Formik } from "formik";
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import BackButton from "../../../components/back-button";
import CustomDropDown from "../../../components/dropdown/CustomDropDown";
import ErrorMsg1 from "../../../components/ErrorMsg1";
import { fontFamilies, inputStyles, textSizes } from "../../../components/stylesheets/globalStyleSheet";
import { countries, currencies, genders, NigerianCities, states } from '../../../constants/constants';
import { eventActivities, eventTypes } from "../../../constants/eventContants";
import { setAppAlert } from '../../../redux/slices/appAlertSlice';
import colors from "../../../utils/colors/colors";
import { hexToRgba } from "../../../utils/utils";
import SetupHeader from "./auxiliary/SetupHeader";

export default function EventSetup() {
    const dispatch = useDispatch()

    const router = useRouter()

    const insets = useSafeAreaInsets()

    const [instructionsTxt, setInstructionsTxt] = useState('')
    const [instructions, setInstructions] = useState([])
    const [activities, setActivities] = useState([])

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />

                <Text style={styles.headerTitle}>Event Setup</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={{
                paddingHorizontal: 15, marginBottom: 40
            }}>
                <SetupHeader
                    activeIndex={0}
                />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                >
                    <Formik
                        validationSchema={yup.object().shape({
                            title: yup.string().required("Title is required"),
                            about: yup.string().required("About is required"),
                            type: yup.string().required("Type is required"),
                            gender: yup.string().required("Gender is required"),
                            min_flex_count: yup
                                .number()
                                .typeError("Minimum flex count must be a number")
                                .min(0, "Minimum flex count cannot be negative")
                                .required("Minimum flex count is required"),
                            max_flex_count: yup
                                .number()
                                .typeError("Maximum flex count must be a number")
                                .min(0, "Maximum flex count cannot be negative")
                                .required("Maximum flex count is required")
                                .test(
                                    "max-greater-than-min",
                                    "Maximum flex count must be greater than or equal to minimum flex count",
                                    function (value) {
                                        return value >= this.parent.min_flex_count;
                                    }
                                ),
                            price_reward: yup
                                .number()
                                .typeError("Price reward must be a number")
                                .min(0, "Price reward cannot be negative")
                                .required("Price reward is required"),
                            price_reward_currency: yup.string().required("Currency is required"),
                            country: yup.string().required("Country is required"),
                            state: yup.string().required("State is required"),
                            city: yup.string().required("City is required"),
                            address: yup.string().required("Address is required"),
                        })}
                        initialValues={{
                            title: '', about: '', type: '', gender: '',
                            min_flex_count: '', max_flex_count: '',
                            price_reward: '', price_reward_currency: 'NGN', country: '', state: '', city: '', address: '',
                        }}
                        onSubmit={values => {
                            if(instructions?.length === 0) return dispatch(setAppAlert({ msg: 'Add at least 1 instruction', type: 'info '}));

                            if(activities?.length === 0) return dispatch(setAppAlert({ msg: 'Add at least 1 activity', type: 'info '}));

                            router.push({
                                pathname: '/event-setup/event-time-setup',
                                params: {
                                    eventInfo: JSON.stringify({
                                        ...values,
                                        instructions,
                                        activities
                                    })
                                }
                            })
                        }}
                    >
                        {({ handleBlur, handleChange, setFieldValue, handleSubmit, isValid, dirty, values }) => (
                            <View>
                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Event Name
                                    </Text>
                                    <TextInput
                                        style={[inputStyles.input1, inputStyles.input1Text]}
                                        placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                        name="title"
                                        value={values.title}
                                        onChangeText={handleChange("title")}
                                        onBlur={handleBlur("title")}
                                        placeholder={'Name of your event'}
                                    />
                                    <ErrorMessage name="title">
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        About Event
                                    </Text>
                                    <TextInput
                                        style={[inputStyles.input1, inputStyles.input1Text]}
                                        placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                        name="about"
                                        value={values.about}
                                        onChangeText={handleChange("about")}
                                        onBlur={handleBlur("about")}
                                        placeholder={'Describe your event'}
                                    />
                                    <ErrorMessage name="about">
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Event Type
                                    </Text>
                                    <CustomDropDown
                                        options={eventTypes?.map(t => ({ title: t, value: t }))}
                                        onValueChange={({ title, value }) => setFieldValue("type", value)}
                                        anchorComponent={
                                            <View
                                                style={[inputStyles.input1, inputStyles.input1Text]}
                                            >
                                                <Text style={[inputStyles.input1Text, {
                                                    color: values?.type ? colors._000 : hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })
                                                }]}>
                                                    {values.type || 'Select an event type'}
                                                </Text>
                                            </View>
                                        }
                                    />
                                    <ErrorMessage name="type">
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Country where the event is taking place
                                    </Text>

                                    <CustomDropDown
                                        options={countries}
                                        selectedValue={values.country}
                                        onValueChange={({ title, value }) => {
                                            setFieldValue('country', value)
                                            setFieldValue('city', '')
                                            setFieldValue('state', '')
                                            setFieldValue("address", '')
                                        }}
                                        placeholder="Select Country"
                                        anchorComponent={(
                                            <View
                                                style={[inputStyles.input1, inputStyles.input1Text, {
                                                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }]}
                                            >
                                                <Text style={[
                                                    fontFamilies.GtRegular, textSizes.txt14,
                                                    {
                                                        color: values?.country ? colors._000 : colors._8B8B8A, textTransform: 'capitalize'
                                                    }
                                                ]}>
                                                    {values?.country.replaceAll("_", " ") || 'Select Country'}
                                                </Text>

                                                <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                            </View>
                                        )}
                                    />
                                    <ErrorMessage name="country">
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                {
                                    values?.country
                                    &&
                                    <View style={{
                                        paddingHorizontal: 15, marginBottom: 20
                                    }}>
                                        <Text style={{
                                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                        }}>
                                            State where the event is taking place
                                        </Text>

                                        <CustomDropDown
                                            options={states.filter(s => s.country === values.country).map(s => {
                                                return {
                                                    value: s?.value,
                                                    title: s?.title
                                                }
                                            })}
                                            selectedValue={values.state}
                                            onValueChange={({ title, value }) => {
                                                setFieldValue('state', value)
                                                setFieldValue('city', '')
                                                setFieldValue("address", '')
                                            }}
                                            placeholder="Select State"
                                            anchorComponent={(
                                                <View
                                                    style={[inputStyles.input1, inputStyles.input1Text, {
                                                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }]}
                                                >
                                                    <Text style={[
                                                        fontFamilies.GtRegular, textSizes.txt14,
                                                        {
                                                            color: values?.state ? colors._000 : colors._8B8B8A, textTransform: 'capitalize'
                                                        }
                                                    ]}>
                                                        {values?.state.replaceAll("_", " ") || 'Select State'}
                                                    </Text>

                                                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                                </View>
                                            )}
                                        />
                                        <ErrorMessage name="state">
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                        </ErrorMessage>
                                    </View>
                                }

                                {
                                    values?.country && values?.state
                                    &&
                                    <View style={{
                                        paddingHorizontal: 15, marginBottom: 20
                                    }}>
                                        <Text style={{
                                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                        }}>
                                            City/L.G.A where the event is taking place
                                        </Text>

                                        <CustomDropDown
                                            options={NigerianCities.filter(c => c?.state === values.state)[0]?.lgas.map(c => {
                                                return {
                                                    value: c,
                                                    title: c
                                                }
                                            })}
                                            selectedValue={values.city}
                                            onValueChange={({ title, value }) => {
                                                setFieldValue('city', value)
                                                setFieldValue("address", '')
                                            }}
                                            placeholder="Select City"
                                            anchorComponent={(
                                                <View
                                                    style={[inputStyles.input1, inputStyles.input1Text, {
                                                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }]}
                                                >
                                                    <Text style={[
                                                        fontFamilies.GtRegular, textSizes.txt14,
                                                        {
                                                            color: values?.city ? colors._000 : colors._8B8B8A, textTransform: 'capitalize'
                                                        }
                                                    ]}>
                                                        {values?.city.replaceAll("_", " ") || 'Select City'}
                                                    </Text>

                                                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                                </View>
                                            )}
                                        />
                                        <ErrorMessage name="city">
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                        </ErrorMessage>
                                    </View>
                                }

                                {
                                    values?.country && values?.state && values?.city
                                    &&
                                    <View style={{
                                        paddingHorizontal: 15, marginBottom: 20
                                    }}>
                                        <Text style={{
                                            marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                            color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                        }}>
                                            Address where the event is taking place {'('}venue{')'}
                                        </Text>
                                        <TextInput
                                            style={[inputStyles.input1, inputStyles.input1Text]}
                                            placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                            name="address"
                                            value={values.address}
                                            onChangeText={handleChange("address")}
                                            onBlur={handleBlur("address")}
                                            placeholder={'Address'}
                                        />
                                        <ErrorMessage name="address">
                                            {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                        </ErrorMessage>
                                    </View>
                                }

                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Gender request
                                    </Text>

                                    <CustomDropDown
                                        options={genders.map(g => ({ title: g, value: g }))}
                                        selectedValue={values.gender}
                                        onValueChange={({ title, value }) => {
                                            setFieldValue('gender', value)
                                        }}
                                        placeholder="Select Gender"
                                        anchorComponent={(
                                            <View
                                                style={[inputStyles.input1, inputStyles.input1Text, {
                                                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }]}
                                            >
                                                <Text style={[
                                                    fontFamilies.GtRegular, textSizes.txt14,
                                                    {
                                                        color: values?.gender ? colors._000 : colors._8B8B8A, textTransform: 'capitalize'
                                                    }
                                                ]}>
                                                    {values?.gender.replaceAll("_", " ") || 'Select Gender'}
                                                </Text>

                                                <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                            </View>
                                        )}
                                    />
                                    <ErrorMessage name="gender">
                                        {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                    </ErrorMessage>
                                </View>

                                <View style={{
                                    paddingHorizontal: 15,
                                }}>
                                    <Text style={{
                                        marginBottom: 10, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Expected number of flexes
                                    </Text>
                                    <View style={{
                                        display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20
                                    }}>
                                        <View style={{
                                            paddingRight: 10, width: '50%'
                                        }}>
                                            <Text style={{
                                                marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                                color: colors._7E7E7E, fontSize: textSizes.txt14.fontSize
                                            }}>
                                                Minimum
                                            </Text>
                                            <TextInput
                                                style={[inputStyles.input1, inputStyles.input1Text]}
                                                placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                                name="min_flex_count"
                                                value={values.min_flex_count}
                                                onChangeText={handleChange("min_flex_count")}
                                                onBlur={handleBlur("min_flex_count")}
                                                placeholder={'0'}
                                            />
                                            <ErrorMessage name="min_flex_count">
                                                {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                            </ErrorMessage>
                                        </View>

                                        <View style={{
                                            paddingLeft: 10, width: '50%'
                                        }}>
                                            <Text style={{
                                                marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                                color: colors._7E7E7E, fontSize: textSizes.txt14.fontSize
                                            }}>
                                                Maximum
                                            </Text>
                                            <TextInput
                                                style={[inputStyles.input1, inputStyles.input1Text]}
                                                placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                                name="max_flex_count"
                                                value={values.max_flex_count}
                                                onChangeText={handleChange("max_flex_count")}
                                                onBlur={handleBlur("max_flex_count")}
                                                placeholder={'0'}
                                            />
                                            <ErrorMessage name="max_flex_count">
                                                {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                            </ErrorMessage>
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
                                        Flex payment
                                    </Text>

                                    <View style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: '40%', paddingRight: 10
                                        }}>
                                            <CustomDropDown
                                                options={currencies}
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
                                                                color: values?.price_reward_currency ? colors._000 : colors._8B8B8A, textTransform: 'uppercase'
                                                            }
                                                        ]}>
                                                            {values?.price_reward_currency.replaceAll("_", " ") || 'Currency'}
                                                        </Text>

                                                        <MaterialCommunityIcons name="chevron-down" size={20} color={colors._020201} />
                                                    </View>
                                                }
                                            />
                                        </View>

                                        <View style={{
                                            flex: 1
                                        }}>
                                            <TextInput
                                                style={[inputStyles.input1, inputStyles.input1Text]}
                                                placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                                name="price_reward"
                                                value={values.price_reward}
                                                onChangeText={handleChange("price_reward")}
                                                onBlur={handleBlur("price_reward")}
                                                placeholder={'e.g 20,000'}
                                            />
                                            <ErrorMessage name="price_reward">
                                                {errorMsg => <ErrorMsg1 errorMsg={errorMsg} />}
                                            </ErrorMessage>
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
                                        Instructions
                                    </Text>
                                    <View style={{
                                        display: 'flex', flexDirection: 'row', alignItems: 'stretch',
                                        justifyContent: 'space-between'
                                    }}>
                                        <TextInput
                                            style={[inputStyles.input1, inputStyles.input1Text, { flex: 1 }]}
                                            placeholderTextColor={hexToRgba({ hex: colors._7E7E7E, opacity: 0.8 })}
                                            // name="address"
                                            value={instructionsTxt}
                                            onChangeText={txt => setInstructionsTxt(txt)}
                                            placeholder={'Add instructions'}
                                        />

                                        <TouchableOpacity
                                            onPress={() => {
                                                if (instructionsTxt) {
                                                    const updatedIns = [...instructions, instructionsTxt]
                                                    setInstructions(updatedIns)
                                                    setInstructionsTxt('')
                                                }
                                            }}
                                            style={{
                                                width: '20%', backgroundColor: colors._484ED4,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}
                                        >
                                            <Text style={[
                                                fontFamilies.LatoRegular, textSizes.txt13,
                                                {
                                                    color: colors.FFF, textAlign: 'center'
                                                }
                                            ]}>
                                                Add
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        instructions?.map((ins, i) => {

                                            const handleRemoveInstruction = () => {
                                                const updatedIns = instructions?.filter(i => i !== ins)
                                                setInstructions(updatedIns)

                                                return;
                                            }

                                            return (
                                                <TouchableOpacity
                                                    key={i}
                                                    onPress={handleRemoveInstruction}
                                                    style={{
                                                        display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                                                        justifyContent: 'space-between', marginTop: 12.5
                                                    }}
                                                >
                                                    <Text style={[
                                                        fontFamilies.LatoBold, textSizes.txt13,
                                                        {
                                                            color: colors._7E7E7E, width: '80%'
                                                        }
                                                    ]}>
                                                        {ins}
                                                    </Text>

                                                    <AntDesign name="close-circle" size={24} color={colors._7E7E7E} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                                <View style={{
                                    paddingHorizontal: 15, marginBottom: 20
                                }}>
                                    <Text style={{
                                        marginBottom: 8, fontFamily: fontFamilies.LatoBold.fontFamily,
                                        color: colors._1E1E1E, fontSize: textSizes.txt14.fontSize
                                    }}>
                                        Activities
                                    </Text>

                                    <View style={{
                                        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15,
                                        flexWrap: 'wrap'
                                    }}>
                                        {
                                            eventActivities?.map((_a, i) => {

                                                const isActive = activities?.includes(_a)

                                                const handleEvtAcPress = () => {
                                                    if(isActive){
                                                        const filtered = activities?.filter(a => a !== _a)
                                                        setActivities(filtered)
                                                    
                                                    } else{
                                                        const updated = [...activities, _a]
                                                        setActivities(updated)
                                                    }
                                                }

                                                return (
                                                    <TouchableOpacity
                                                        onPress={handleEvtAcPress}
                                                        key={i}
                                                        style={{
                                                            paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10,
                                                            backgroundColor: isActive ? colors._484ED4 : hexToRgba({ hex: colors._484ED4, opacity: 0.05 })
                                                        }}
                                                    >
                                                        <Text style={[
                                                            fontFamilies.LatoRegular, textSizes.txt13,
                                                            {
                                                                color: isActive ? colors.FFF : colors._1E1E1E
                                                            }
                                                        ]}>
                                                            { _a }
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>

                                <View style={{
                                    paddingHorizontal: 15, marginTop: 20
                                }}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        disabled={!(isValid && dirty) ? true : false}
                                        style={{
                                            width: '100%',
                                            backgroundColor: colors._484ED4,
                                            paddingVertical: 16.7,
                                            borderRadius: 10,
                                            opacity: !(isValid && dirty) ? 0.5 : 1
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
                            </View>
                        )}
                    </Formik>

                    <View style={{ paddingBottom: insets.bottom + 20 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
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