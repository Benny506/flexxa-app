import { View } from "react-native";
import colors from "../../../../utils/colors/colors";
import { hexToRgba } from "../../../../utils/utils";

export default function SetupHeader({ activeIndex }){
    return(
        <View style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>
            {
                Array.from({ length: 4 }).map((_, i) => {

                    const isActive = i === activeIndex ? true : false

                    return (
                        <View 
                            key={i}
                            style={{
                                height: 7.5, borderRadius: 10,
                                backgroundColor: isActive ? colors._484ED4 : hexToRgba({ hex: colors._484ED4, opacity: 0.2 }),
                                width: '24%'
                            }}
                        />
                    )
                })
            }
        </View>
    )
}