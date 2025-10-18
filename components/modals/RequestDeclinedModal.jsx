import ReusableModal from '../ReusableModal';
import { View, Text, StyleSheet } from 'react-native';

export default function RequestDeclinedModal({ visible, onClose, onViewOtherRequests }) {
  const modalTitle = 'Request Declined!';
  const modalMessage = "You've declined the request. Keep an eye for more opportunities to earn badges and rewards!";

  const primaryButton = {
    text: 'View Other Requests',
    onPress: onViewOtherRequests,
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