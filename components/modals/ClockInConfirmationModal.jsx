import ReusableModal from '../ReusableModal';

export default function ClockInConfirmationModal({ 
  visible, 
  onClose, 
  onConfirm,
  title,
  message,
  cancelText,
  confirmText
}) {
  const modalTitle = title || 'Clock In Confirmation';
  const modalMessage = message || "Are you ready to clock in? The timer will start immediately after you confirm. Ensure you're ready to begin your attendance.";

  const secondaryButton = {
    text: cancelText || 'Cancel',
    onPress: onClose,
  };

  const primaryButton = {
    text: confirmText || 'Clock In',
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