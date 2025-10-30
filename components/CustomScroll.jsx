import { ScrollView } from "react-native";
import colors from "../utils/colors/colors";

export default function CustomScroll({
    padding_H=15, 
    padding_V=15,
    bgColor=colors.FFF,

    children
}){
    return(
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: padding_H,
                paddingVertical: padding_V,
                backgroundColor: bgColor
            }}
        >
            { children }
        </ScrollView>
    )
}