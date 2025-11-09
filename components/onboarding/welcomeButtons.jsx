import { Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import colors from '../../utils/colors/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function PrimaryButton({ onPress, title, delay = 0 }) {
  return (
    <AnimatedTouchable
      entering={FadeInUp.delay(delay).duration(600)}
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: colors._171B76FF, // pink-500
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10, 
        width: '100%',
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </AnimatedTouchable>
  );
}

export function SecondaryButton({ onPress, title, delay = 0 }) {
  return (
    <AnimatedTouchable
      entering={FadeInUp.delay(delay).duration(600)}
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: "#13BEBB",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        width: '100%',
      }}
    >
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </AnimatedTouchable>
  );
}
