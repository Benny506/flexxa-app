import ReusableModal from '../ReusableModal';

export default function ConfirmAcceptanceModal({ visible, onClose, onConfirm }) {
  const modalTitle = 'Confirm Acceptance';
  const modalMessage =
    'By accepting, you agree to participate in this event and fulfil any specified requirements.';

  const secondaryButton = {
    text: 'Cancel',
    onPress: onClose,
  };

  const primaryButton = {
    text: 'Yes, Accept',
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