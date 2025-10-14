import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopInsets(){

    const insets = useSafeAreaInsets()

    return (
        <View 
            style={{
                paddingTop: 20
            }}
        />
    )
}