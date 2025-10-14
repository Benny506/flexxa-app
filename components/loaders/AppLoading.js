import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ScaleAnimation from '../../components/scale/ScaleAnimation';
import { getAppLoadingState } from "../../redux/slices/appLoadingSlice";
import colors from "../../utils/colors/colors";
import BlurBg from "../BlurBg";
import { fontFamilies, textSizes } from "../stylesheets/globalStyleSheet";


export default function AppLoading({ tempLoading }){

    const appLoading = useSelector(state => getAppLoadingState(state).appLoading)
    const appLoadText = useSelector(state => getAppLoadingState(state).appLoadText)

    if(appLoading || tempLoading){

        return ( 
            <>
                <BlurBg />
                
                <View
                    // innerColor={defaultDark}
                    // outerColor={defaultDark}
                    style={{
                        position: 'absolute', zIndex: 1000, alignItems: 'center',
                        justifyContent: 'center',
                        top: 0, bottom: 0, right: 0, left: 0
                    }}
                >
                    <ScaleAnimation scaleTo={1.4}>
                        <Image 
                            source={require("../../assets/images/loader.png")}
                            style={{
                                width: 70, height: 70
                            }}
                        />
                        {/* {
                            !profile?.is_pregnant
                            ?
                                <LogoIcon />       
                            :
                                <Logo2Icon />
                        } */}
                    </ScaleAnimation>     

                    <Text style={[
                        fontFamilies.LatoRegular, textSizes.txt15,
                        {
                            color: colors.FFF,
                            textAlign: 'center',
                            marginTop: 25
                        }
                    ]}>
                        { appLoadText }
                    </Text>           
                </View>
            </>
        )
    }
}