import { View, Image, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { PrimaryButton, SecondaryButton } from '../components/onboarding/welcomeButtons';
import { setOnboardingComplete } from '../utils/storage';

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = async () => {
    await setOnboardingComplete();
    router.push('/age-verification');
  };

  const handleAlreadyUser = async () => {
    await setOnboardingComplete();
    router.push('/age-verification');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/images/onboarding/welcome-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Main Content Wrapper */}
      <View style={styles.contentWrapper}>
        {/* Centered Content */}
        <Animated.View entering={FadeIn.duration(800)} style={styles.centerContent}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/images/flexxa-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>flexxa</Text>
          </View>
          <Text style={styles.subtitle}>
            Navigate life's journey with {'\n'}
            social planning and services
          </Text>
        </Animated.View>

        {/* Buttons at Bottom */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.buttonContainer}>
          <PrimaryButton title="Get Started as a Flexr" onPress={handleGetStarted} />
          <SecondaryButton title="Get Started as a Flex" onPress={handleAlreadyUser} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: { width: 80, height: 70 },
  welcomeText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  brandText: { color: 'white', fontSize: 82, fontWeight: 'bold'},
  subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 22, textAlign: 'center', lineHeight: 20 },
  buttonContainer: { width: '100%' },
});
