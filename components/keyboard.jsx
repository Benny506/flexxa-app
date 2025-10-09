import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function NumericKeyboard({ onPress, onDelete, onConfirm }) {
  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onPress('1')} style={styles.key}>
          <Text style={styles.keyText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('2')} style={styles.key}>
          <Text style={styles.keyText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('3')} style={styles.key}>
          <Text style={styles.keyText}>3</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onPress('4')} style={styles.key}>
          <Text style={styles.keyText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('5')} style={styles.key}>
          <Text style={styles.keyText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('6')} style={styles.key}>
          <Text style={styles.keyText}>6</Text>
        </TouchableOpacity>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onPress('7')} style={styles.key}>
          <Text style={styles.keyText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('8')} style={styles.key}>
          <Text style={styles.keyText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress('9')} style={styles.key}>
          <Text style={styles.keyText}>9</Text>
        </TouchableOpacity>
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <View style={styles.emptySpace} />
        <TouchableOpacity onPress={() => onPress('0')} style={styles.key}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.key}>
          <Feather name="x-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  key: {
    flex: 1,
    height: 60,
    maxHeight: 60,
    backgroundColor: '#E8E9F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  emptySpace: {
    flex: 1,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});