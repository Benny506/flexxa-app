import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../utils/colors/colors';
import { fontFamilies, textSizes } from '../stylesheets/globalStyleSheet';

const screenWidth = Dimensions.get('window').width;

export default function CustomDropDown({ 
  options = [], 
  selectedValue, 
  onValueChange, 
  placeholder = "Select...", 
  containerStyle = {},
  anchorComponent = null,
  keyExtractor="value",
  title = 'Select one (scroll to see more options if any)',
  disabled = false
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity disabled={disabled} onPress={() => setVisible(true)} style={[!anchorComponent && styles.trigger]}>
        {anchorComponent ? anchorComponent : (
          <Text style={styles.placeholder}>
            {selectedValue ?? placeholder}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalBackground} 
          activeOpacity={1} 
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={[
              fontFamilies.LatoRegular, textSizes.txt13,
              {
                color: colors._8B8B8A, paddingVertical: 10, paddingHorizontal: 16
              }
            ]}>
              { title }
            </Text>    

            <FlatList
              data={options}
              keyExtractor={(item) => keyExtractor ? item[keyExtractor] : item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item);
                    setVisible(false);
                  }}
                >
                  <Text style={[
                    fontFamilies.LatoBold, textSizes.txt13,
                    {
                      color: colors._141416
                    }
                  ]}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  trigger: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdown: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    maxHeight: 250,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
