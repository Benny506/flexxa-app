import ReusableModal from '../ReusableModal';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeclineRequestModal({ visible, onClose, onConfirm }) {
  const modalTitle = 'Decline Request?';
  const modalMessage =
    "Declining means you won't participate in this event, and it may affect your badge progress.";

  const secondaryButton = {
    text: 'Cancel',
    onPress: onClose,
  };

  const primaryButton = {
    text: 'Yes, Decline.',
    onPress: onConfirm,
  };

  const helperText = (
    <View style={styles.helperContainer}>
      <Ionicons name="information-circle-outline" size={20} color="#666" style={styles.helperIcon} />
      <Text style={styles.helperText}>
        Flex who participate more earn higher badge levels and rewards. Think twice before declining!
      </Text>
    </View>
  );

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      message={modalMessage}
      children={helperText}
      secondaryButton={secondaryButton}
      primaryButton={primaryButton}
      showCloseButton={false}
    />
  );
}

const styles = StyleSheet.create({
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginBottom: 10,
    width: '100%',
  },
  helperIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  helperText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});