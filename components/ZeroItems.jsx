import { Text, View } from 'react-native'
import EmptyWallet from '../assets/images/icons/emptyWallet.svg'
import colors from '../utils/colors/colors'
import { fontFamilies, textSizes } from './stylesheets/globalStyleSheet'


export default function ZeroItems({ zeroText }){
    return(
        <View
            style={{
                flex: 1, alignItems: 'center', justifyContent: 'center',
                marginVertical: 10, gap: 10, display: 'flex'
            }}
        >
            <EmptyWallet 
                width={150}
                height={150}
            />

            <Text style={[
                fontFamilies.LatoBold, textSizes.txt15,
                {
                    textAlign: 'center',
                    color: colors._141416,
                    marginHorizontal: 50
                }
            ]}>
                { zeroText }
            </Text>
        </View>
    )
}