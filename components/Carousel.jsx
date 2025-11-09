import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    View
} from 'react-native';

export default function Carousel({
  data = [],
  autoPlay = true,
  interval = 3000,
  effect = 'slide', // 'fade' | 'slide'
  height = 200,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoPlay || data.length <= 1 || !containerWidth) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;

      if (effect === 'slide') {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      } else if (effect === 'fade') {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start(() => setCurrentIndex(nextIndex));
      }

      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, data.length, containerWidth]);

  // Render single item (fade or slide)
  const renderItem = ({ item, index }) => {
    if (effect === 'fade') {
      return (
        index === currentIndex && (
          <Animated.View style={[styles.slide, { opacity: fadeAnim, height, width: containerWidth }]}>
            <Image source={{ uri: item }} style={[styles.image, { height }]} />
          </Animated.View>
        )
      );
    }

    return (
      <View style={[styles.slide, { width: containerWidth, height }]}>
        <Image source={{ uri: item }} style={[styles.image, { height }]} />
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { height }]}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {containerWidth > 0 && (
        <>
          {effect === 'slide' ? (
            <Animated.FlatList
              ref={flatListRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, i) => i.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              onMomentumScrollEnd={(e) => {
                const index = Math.floor(e.nativeEvent.contentOffset.x / containerWidth);
                setCurrentIndex(index);
              }}
            />
          ) : (
            renderItem({ item: data[currentIndex], index: currentIndex })
          )}

          {/* Indicator */}
          <View style={styles.indicatorContainer}>
            {data.map((_, i) => {
              const inputRange = [
                (i - 1) * containerWidth,
                i * containerWidth,
                (i + 1) * containerWidth,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.indicator,
                    {
                      opacity,
                      transform: [{ scale }],
                      backgroundColor: i === currentIndex ? '#333' : '#aaa',
                    },
                  ]}
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  indicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
  },
});
