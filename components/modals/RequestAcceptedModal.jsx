import ReusableModal from '../ReusableModal';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RequestAcceptedModal({ visible, onClose, onViewDetails }) {
  const modalTitle = 'Request Accepted!';
  const modalMessage = "You've successfully accepted the request. Ticket has been sent to your email address";

  const primaryButton = {
    text: 'View Event Details',
    onPress: onViewDetails,
  };
  
  const customIcon = (
    <View style={styles.iconPlaceholder}>
    </View>
  );

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      message={modalMessage}
      children={customIcon}
      primaryButton={primaryButton}
      showCloseButton={false}
    />
  );
}

const styles = StyleSheet.create({
  iconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5E5F8',
    marginBottom: 20,
    marginTop: -10,
  },
});