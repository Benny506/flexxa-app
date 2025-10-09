import { ImageBackground, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SlideItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      source={item.image}
      style={[styles.container, { width }]}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ alignItems: 'center' }}>
          <Text style={styles.text}>{item.text}</Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28, 
  },
});
