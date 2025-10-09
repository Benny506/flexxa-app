import { useRouter } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { FlatList, View, useWindowDimensions, ImageBackground } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from '../components/onboarding/pagination';
import SlideItem from '../components/onboarding/slideItem';
import { ONBOARDING_SLIDES } from '../constants/onboarding';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function OnboardingSlider() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const currentBackground = ONBOARDING_SLIDES[currentIndex]?.image;

  // Navigate to Welcome when last slide is fully visible
  useEffect(() => {
    if (currentIndex === ONBOARDING_SLIDES.length - 1) {
      const timeout = setTimeout(() => {
        router.replace('/welcome');
      }, 1500); // delay so user sees last slide
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, router]);

  return (
    <ImageBackground
      source={currentBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <AnimatedFlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          renderItem={({ item }) => <SlideItem item={item} width={width} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        {/* Pagination only */}
        <View style={{ position: 'absolute', bottom: 140, left: 0, right: 0 }}>
          <Pagination data={ONBOARDING_SLIDES} scrollX={scrollX} index={currentIndex} />
        </View>
      </View>
    </ImageBackground>
  );
}
