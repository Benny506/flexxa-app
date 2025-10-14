import { View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

function Dot({ idx, scrollX, width }) {
  const inputRange = [
    (idx - 1) * width,
    idx * width,
    (idx + 1) * width,
  ];
  const animatedStyle = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );
    return {
      width: dotWidth,
      opacity,
    };
  });
  return (
    <Animated.View
      style={[animatedStyle, { height: 8, borderRadius: 4, backgroundColor: 'white', marginHorizontal: 4 }]}
    />
  );
}

export default function Pagination({ data, scrollX, index }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
      {data.map((_, idx) => (
        <Dot key={idx} idx={idx} scrollX={scrollX} width={width} />
      ))}
    </View>
  );
}