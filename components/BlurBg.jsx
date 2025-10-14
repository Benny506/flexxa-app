import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurBg() {
    return (
        <BlurView
            intensity={100}
            tint='dark'
            style={StyleSheet.absoluteFill}
        />
    )
}