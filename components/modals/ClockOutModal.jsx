import ReusableModal from '../ReusableModal';

export default function ClockOutModal({ visible, onClose, onConfirm }) {
  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title="Clock Out Confirmation"
      message="Are you ready to clock out? Once you confirm, your session will be finalized."
      secondaryButton={{
        text: 'Cancel',
        onPress: onClose,
      }}
      primaryButton={{
        text: 'Clock Out',
        onPress: onConfirm,
      }}
    />
  );
}
