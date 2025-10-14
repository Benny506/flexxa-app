import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function BackButton({
  onPress,
  style,
  color = 'black',
  size = 28,
  icon = 'chevron-left',
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.backButton, style]}>
      <Feather name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    // position: 'absolute',
    // top: 50,
    // left: 24,
    width: 44,
    height: 44,
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
});
