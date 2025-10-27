import { BlurView } from 'expo-blur';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Loading({ visible }) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark" />
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/loader.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
