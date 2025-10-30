import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReusableModal from '../ReusableModal';

const CreateModal = ({ visible, onClose, onCreatePost, onCreateGroup }) => {
  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      showCloseButton={true}
    >
      <View style={styles.optionsContainer}>
        <Pressable style={styles.optionButton} onPress={onCreatePost}>
          <Ionicons name="document-text-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Create a Post</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.optionButton} onPress={onCreateGroup}>
          <Ionicons name="people-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Create a Group</Text>
        </Pressable>
      </View>

      <Pressable style={styles.createButton} onPress={onCreatePost}>
        <Text style={styles.createButtonText}>Create</Text>
      </Pressable>
    </ReusableModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#5B5BFF',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CreateModal;