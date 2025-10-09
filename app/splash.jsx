import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SvgSplash from '../assets/images/onboarding/splash-screen.svg';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding-slider');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <SvgSplash width="100%" height="100%" style={styles.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});