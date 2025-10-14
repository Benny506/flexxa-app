import { Text } from "react-native";
import colors from "../utils/colors/colors";
import { fontFamilies, textSizes } from "./stylesheets/globalStyleSheet";

export default function ErrorMsg1({ errorMsg, isCentered }){
    return (
        <Text
            style={[
                fontFamilies.LatoBold, textSizes.txt13,
                {
                    textAlign: isCentered ? 'center' : 'left',
                    marginVertical: 12.5,
                    color: colors.FF6B6B
                }
            ]}
        >
            { errorMsg }
        </Text>
    )
}