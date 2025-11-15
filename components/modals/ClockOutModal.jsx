import ReusableModal from '../ReusableModal';

export default function ClockOutModal({ 
  visible, 
  onClose, 
  onConfirm,
  title,
  message,
  cancelText,
  confirmText
}) {
  const modalTitle = title || 'Clock Out Confirmation';
  const modalMessage = message || "Are you ready to clock out? Once you confirm, your session will be finalized.";

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      message={modalMessage}
      secondaryButton={{
        text: cancelText || 'Cancel',
        onPress: onClose,
      }}
      primaryButton={{
        text: confirmText || 'Clock Out',
        onPress: onConfirm,
      }}
    />
  );
}