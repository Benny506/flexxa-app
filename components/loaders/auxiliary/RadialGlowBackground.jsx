import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const RadialGlowBackground = ({
  innerColor = '#160633',
  outerColor = '#160633',
  innerOpacity = 1,
  outerOpacity = 0.9,
  radius = 50,
  containerStyle = {},
  children,
}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, containerStyle]}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="glow"
            cx="50%"
            cy="50%"
            r={radius}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={innerColor} stopOpacity={innerOpacity} />
            <Stop offset="100%" stopColor={outerColor} stopOpacity={outerOpacity} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
      </Svg>

      {children}
    </View>
  );
};

export default RadialGlowBackground;
