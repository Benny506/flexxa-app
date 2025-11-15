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

export default function ReviewModal({ 
  visible, 
  onClose, 
  onSubmit,
  flexName,
  showTipping = false,
  title,
  question
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');

  const tipOptions = [10000, 20000, 50000, 100000];

  const isFormValid = rating > 0;
  const tipAmount = customTip ? parseInt(customTip) : selectedTip;

  const handleTipSelect = (amount) => {
    setSelectedTip(amount);
    setCustomTip('');
  };

  const handleTipSubmit = () => {
    if (isFormValid && tipAmount) {
      // Validate tip amount
      if (tipAmount < 5000 || tipAmount > 150000) {
        alert('Tip amount must be between ₦5,000 and ₦150,000');
        return;
      }
      
      // Submit with tip - this will trigger navigation to payment screen
      onSubmit({ rating, review, tip: tipAmount });
      
      // Reset form
      setRating(0);
      setReview('');
      setSelectedTip(null);
      setCustomTip('');
    }
  };

  const handleSubmitWithoutTip = () => {
    if (isFormValid) {
      onSubmit({ rating, review, tip: null });
      setRating(0);
      setReview('');
      setSelectedTip(null);
      setCustomTip('');
      onClose();
    }
  };

  // Use custom props if provided, otherwise use defaults
  const modalTitle = title || 'Reviews and Ratings';
  const modalQuestion = question || (
    flexName 
      ? `How was ${flexName} at your event?`
      : 'How was the event?'
  );

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
            <Text style={styles.title}>{modalTitle}</Text>
            <View style={{ width: 44, height: 44 }} /> 
          </View>

          {/* Scrollable body */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.question}>{modalQuestion}</Text>

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
                    color={star <= rating ? '#484ED4' : '#A3A7ED'} 
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

            {/* Tipping Section - Only shown when showTipping is true */}
            {showTipping && (
              <>
                <Text style={styles.label}>
                  Tip Your Flex <Text style={styles.optional}>(Optional)</Text>
                </Text>
                
                <View style={styles.tipOptions}>
                  {tipOptions.map((amount) => (
                    <TouchableOpacity
                      key={amount}
                      style={[
                        styles.tipOption,
                        selectedTip === amount && styles.tipOptionSelected
                      ]}
                      onPress={() => handleTipSelect(amount)}
                    >
                      <Text style={[
                        styles.tipOptionText,
                        selectedTip === amount && styles.tipOptionTextSelected
                      ]}>
                        ₦{amount.toLocaleString()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={styles.customTipInput}
                  placeholder="Input amount"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="numeric"
                  value={customTip}
                  onChangeText={(text) => {
                    setCustomTip(text);
                    setSelectedTip(null);
                  }}
                />

                {tipAmount && (
                  <>
                    <View style={styles.tipInfo}>
                      <Ionicons name="information-circle-outline" size={20} color="#666" />
                      <Text style={styles.tipInfoText}>
                        Min tip amount is ₦5,000. Max tip amount is ₦150,000
                      </Text>
                    </View>

                    <TouchableOpacity 
                      style={styles.tipButton}
                      onPress={handleTipSubmit}
                    >
                      <Text style={styles.tipButtonText}>
                        Tip ₦{tipAmount.toLocaleString()}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </ScrollView>

          {/* Submit button */}
          <TouchableOpacity 
            style={[styles.button, !isFormValid && styles.buttonDisabled]} 
            onPress={handleSubmitWithoutTip} 
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
  optional: {
    color: '#666',
    fontWeight: '400',
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
  tipOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tipOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  tipOptionSelected: {
    borderColor: '#484ED4',
    backgroundColor: '#F0F1FF',
  },
  tipOptionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  tipOptionTextSelected: {
    color: '#484ED4',
    fontWeight: '600',
  },
  customTipInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  tipInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tipInfoText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  tipButton: {
    borderWidth: 1,
    borderColor: '#484ED4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  tipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#484ED4',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#484ED4', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF', 
  },
});