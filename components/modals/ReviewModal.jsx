import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ReviewModal({ visible, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const isFormValid = rating > 0;

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ rating, review });
      setRating(0);
      setReview('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Reviews and Ratings</Text>
            <View style={{ width: 44, height: 44 }} /> 
          </View>

          {/* Scrollable body */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.question}>How was the event?</Text>

            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => setRating(star)} 
                  style={styles.starTouchArea}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={42}
                    color={star <= rating ? '#FFD700' : '#A3A7ED'} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Write a review</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="#B0B0B0" 
              multiline
              value={review}
              onChangeText={setReview}
              textAlignVertical="top"
            />
          </ScrollView>

          {/* Submit button */}
          <TouchableOpacity 
            style={[styles.button, !isFormValid && styles.buttonDisabled]} 
            onPress={handleSubmit} 
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 10, 
  },
  closeButtonContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  question: {
    fontSize: 22, 
    fontWeight: '500',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16, 
    marginBottom: 30,
  },
  starTouchArea: {
    
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0', 
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#000',
    minHeight: 150,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#484ED4', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF', 
  },
});