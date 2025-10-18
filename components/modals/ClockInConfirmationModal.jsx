import ReusableModal from '../ReusableModal';

export default function ClockInConfirmationModal({ visible, onClose, onConfirm }) {
  const modalTitle = 'Clock in Confirmation';
  const modalMessage =
    "Are you ready to clock in? The timer will start immediately after you confirm. Ensure you're ready to begin your attendance.";

  const secondaryButton = {
    text: 'Cancel',
    onPress: onClose,
  };

  const primaryButton = {
    text: 'Clock In',
    onPress: onConfirm,
  };

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      message={modalMessage}
      secondaryButton={secondaryButton}
      primaryButton={primaryButton}
      showCloseButton={false}
    />
  );
}