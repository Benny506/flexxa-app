import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const ScaleAnimation = ({ children, scaleTo = 1.2, duration = 600 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: scaleTo,
          duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop(); // Cleanup on unmount
  }, [scaleAnim, scaleTo, duration]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {children}
    </Animated.View>
  );
};

export default ScaleAnimation;
