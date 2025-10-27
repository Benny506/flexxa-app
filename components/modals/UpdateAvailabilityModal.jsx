import { Ionicons } from '@expo/vector-icons';
import ReusableModal from '../ReusableModal';

export default function UpdateAvailabilityModal({
  visible,
  onClose,
  onConfirm,
  eventTitle = 'Event',
}) {
  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      icon={<Ionicons name="time-outline" size={48} color="#F59E0B" />}
      title="Update Your Availability!"
      message={`You are about to update your availability for ${eventTitle}.\n\nIf you mark yourself as unavailable, you will not be able to participate in this event and may miss out on rewards and leaderboard points.`}
      secondaryButton={{
        text: 'Cancel',
        onPress: onClose,
      }}
      primaryButton={{
        text: "I'm Not Available",
        onPress: onConfirm,
      }}
    />
  );
}