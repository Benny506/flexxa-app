import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native';
import { ONBOARDING_SLIDES } from '../constants/onboarding';

// --- Group slides by ID (1, 2, 3) ---
const groupedSlides = Object.values(
  ONBOARDING_SLIDES.reduce((acc, item) => {
    if (!acc[item.id]) acc[item.id] = { id: item.id, image: item.image, texts: [] };
    acc[item.id].texts.push(item.text);
    return acc;
  }, {})
);

export default function OnboardingSlider() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  useEffect(() => {
    if (currentIndex === groupedSlides.length - 1) {
      const timeout = setTimeout(() => router.replace('/welcome'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, router]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={groupedSlides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SlideItem item={item} width={width} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {groupedSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function SlideItem({ item, width }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentText = item.texts[currentTextIndex];

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start(() => {
        setCurrentTextIndex((prev) => (prev + 1) % item.texts.length);
      });
    };
    fadeInOut();
  }, [currentTextIndex]);

  return (
    <ImageBackground
      source={item.image}
      style={{ width, flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          {currentText}
        </Animated.Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
});
