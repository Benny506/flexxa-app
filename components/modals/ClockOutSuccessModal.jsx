import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import ReusableModal from '../ReusableModal';

export default function ClockOutSuccessModal({
  visible,
  onClose,
  onRateReview,
}) {
  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      icon={
        <View style={styles.successCheckmark}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
      }
      title="Clock Out Successful!"
      message={
        "You have successfully clocked out.\n\n" +
        "Thank you for attending! Please take a moment to rate the event and the organizer to help us improve future experiences."
      }
      secondaryButton={{
        text: 'No, Later',
        onPress: onClose,
      }}
      primaryButton={{
        text: 'Rate & Review',
        onPress: onRateReview,
      }}
    />
  );
}

const styles = StyleSheet.create({
  successCheckmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#10B981',
  },
});
