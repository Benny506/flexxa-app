import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import ReusableModal from '../ReusableModal';

export default function ClockOutSuccessModal({
  visible,
  onClose,
  onRateReview,
  title,
  message,
  flexName,
  secondaryButtonText,
  primaryButtonText,
  hideIcon
}) {
  const modalTitle = title || 'Clock Out Successful!';
  
  const modalMessage = message || (
    flexName 
      ? `You have successfully clocked out ${flexName}.\n\nPlease take a moment to rate ${flexName} and drop your feedback`
      : "You have successfully clocked out.\n\n" +
        "Thank you for attending! Please take a moment to rate the event and the organizer to help us improve future experiences."
  );

  const icon = hideIcon ? null : (
    <View style={styles.successCheckmark}>
      <Ionicons name="checkmark" size={40} color="#10B981" />
    </View>
  );

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      // icon={icon}
      iconBgColor={'#faeaf2'}
      title={modalTitle}
      message={modalMessage}
      secondaryButton={{
        text: secondaryButtonText || 'No, Later',
        onPress: onClose,
      }}
      primaryButton={{
        text: primaryButtonText || 'Rate & Review',
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