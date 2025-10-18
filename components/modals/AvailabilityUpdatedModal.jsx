import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import ReusableModal from '../ReusableModal';

export default function AvailabilityUpdatedModal({
  visible,
  onClose,
  onBackToDashboard,
  eventTitle = 'Event',
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
      title="Availability Updated!"
      message={`You have successfully updated your availability for ${eventTitle}. Your acceptance has been revoked, and you will not participate in this event.`}
      primaryButton={{
        text: 'Back to Dashboard',
        onPress: onBackToDashboard,
      }}
      secondaryButton={false} 
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