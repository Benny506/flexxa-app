import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SkipButton({
  onPress,
  style,
  textColor = '#484ED4',
  text = 'Skip',
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.skipButton, style]}>
      <Text style={[styles.skipText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '400',
  },
});