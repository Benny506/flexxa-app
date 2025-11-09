import Entypo from '@expo/vector-icons/Entypo';
import { Text, TouchableOpacity, View } from "react-native";
import colors from '../../utils/colors/colors';
import { fontFamilies, textSizes } from '../stylesheets/globalStyleSheet';

export default function MyEventCard({ event }){

    if(!event) return <></>

    return (
        <TouchableOpacity key={event?.id} style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                display: 'flex', gap: 10
            }}>
                <Text style={[
                    fontFamilies.LatoBold, textSizes.txt14,
                    {
                        color: colors._1E1E1E
                    }
                ]}>
                    { event?.title }
                </Text>
            </View>

            <View>
                <Entypo name="chevron-thin-right" size={24} color="black" />
            </View>
        </TouchableOpacity>
    )
}