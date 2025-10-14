import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef } from "react";
import {
    AccessibilityInfo,
    Animated,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { clearAppAlert, getAppAlertState } from "../../redux/slices/appAlertSlice";
import colors from "../../utils/colors/colors";
import { fontFamilies, textSizes } from "../stylesheets/globalStyleSheet";

/**
 * AlertModal
 *
 * Props:
 * - visible: boolean -> show the alert when true
 * - onHide: function -> called when the alert finishes and is hidden
 * - stayDuration: number (ms) -> how long the alert stays in center (default 3000)
 * - entranceDuration: number (ms) (default 350)
 * - exitDuration: number (ms) (default 350)
 * - renderContent: function -> optional custom content renderer (receives styles object)
 * - message: string -> simple text message (used if renderContent not provided)
 * - containerStyle, contentStyle -> style overrides
 * - dismissOnPress: boolean -> whether tapping the alert should dismiss immediately (default true)
 */

export default function AppAlert({
    stayDuration = 3000,
    entranceDuration = 350,
    exitDuration = 350,
    dismissOnPress = true,
}) {

    const dispatch = useDispatch()

    const msg = useSelector(state => getAppAlertState(state).msg)
    const type = useSelector(state => getAppAlertState(state).type)

    const visible = (msg && type) ? true : false
    const onHide = () => {
        dispatch(clearAppAlert())
    }

    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
    const insets = useSafeAreaInsets()

    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const timerRef = useRef(null);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        if (visible) {
            show();
        } else {
            // If parent toggles visible=false while visible, force-hide
            hide();
        }

        return () => {
            clearTimer();
            // reset values
            translateX.setValue(-SCREEN_WIDTH);
            opacity.setValue(0);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    function clearTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function show() {
        clearTimer();
        isAnimatingRef.current = true;

        // Ensure screen reader is aware (announce)
        if (msg) {
            AccessibilityInfo.announceForAccessibility?.(msg);
        }

        // start off-screen left
        translateX.setValue(-SCREEN_WIDTH);
        opacity.setValue(0);

        Animated.parallel([
            Animated.timing(translateX, {
                toValue: 0,
                duration: entranceDuration,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: Math.min(entranceDuration, 250),
                useNativeDriver: true,
            }),
        ]).start(() => {
            isAnimatingRef.current = false;
            // schedule exit
            timerRef.current = setTimeout(() => {
                hide();
            }, stayDuration);
        });
    }

    function hide() {
        clearTimer();
        if (isAnimatingRef.current) {
            // if entrance animation still running, wait a tick
            setTimeout(() => hide(), 50);
            return;
        }
        isAnimatingRef.current = true;

        Animated.parallel([
            Animated.timing(translateX, {
                toValue: SCREEN_WIDTH,
                duration: exitDuration,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: exitDuration,
                useNativeDriver: true,
            }),
        ]).start(() => {
            isAnimatingRef.current = false;
            // reset for next show
            translateX.setValue(-SCREEN_WIDTH);
            opacity.setValue(0);
            if (typeof onHide === "function") onHide();
        });
    }

    function handlePress() {
        if (dismissOnPress) {
            hide();
        }
    }

    // If not visible and not animating, render nothing (keeps screen tree light)
    // However, we still need to render to allow exit animation when visible -> false.
    const shouldRender = visible || isAnimatingRef.current;

    if (!shouldRender) return null;

    const styles = StyleSheet.create({
        overlayContainer: {
            position: "absolute",
            // top: SCREEN_HEIGHT / 2 - (insets.bottom + 20), 
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            // allow touches to pass through outside the alert
            justifyContent: "center",
            alignItems: "center",
        },
        animatedWrapper: {
            // center horizontally (translateX controls entrance/exit)
            position: "absolute",
            left: 0,
            right: 0,
            // center vertically
            // top: SCREEN_HEIGHT / 2 - 40, // approximate vertical center; you can pass containerStyle to override
            bottom: insets.bottom,
            alignSelf: "flex-end",
            paddingHorizontal: 16,
        },
        content: {
            paddingHorizontal: 18,
            paddingVertical: 14,
            borderRadius: 12,
            minWidth: Math.min(320, SCREEN_WIDTH - 48),
            maxWidth: Math.min(600, SCREEN_WIDTH - 32),
            // subtle shadow
            ...Platform.select({
                ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                },
                android: {
                    elevation: 6,
                },
            }),
        },
    });


    const bgColor =
        type === 'error'
            ?
            colors.FF6B6B
            :
            type === 'success'
                ?
                colors._13BEBB
                :
                colors._484ED4

    const Icon = () =>
        type === 'error'
            ?
            <MaterialIcons name="error" size={19} color={colors.FFF} />
            :
            type === 'success'
                ?
                <Feather name="check-square" size={19} color={colors.FFF} />
                :
                <AntDesign name="info-circle" size={19} color={colors.FFF} />


    return (
        <View
            pointerEvents="box-none"
            style={styles.overlayContainer}
            accessible={false}
        >
            <TouchableWithoutFeedback onPress={handlePress}>
                <Animated.View
                    // container containing the animated card
                    style={[
                        styles.animatedWrapper,
                        {
                            transform: [{ translateX }],
                            opacity,
                        },
                    ]}
                    accessibilityRole="alert"
                    accessibilityLiveRegion="assertive"
                >
                    <View style={[styles.content, { backgroundColor: bgColor }]}>
                        <Icon />

                        <Text
                            style={[
                                fontFamilies.LatoRegular, textSizes.txt16,
                                {
                                    color: colors.FFF, marginTop: 5
                                }
                            ]}
                        >
                            {msg}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}