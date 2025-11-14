import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReusableModal from '../ReusableModal';

const TimerRing = ({ time }) => ( 
  <View style={timerStyles.ringContainer}>
    <View style={timerStyles.ring}>
      <Text style={timerStyles.timeText}>{time}</Text>
    </View>
  </View>
);

export default function ClockInSuccessModal({ 
  visible, 
  onClose, 
  onFinish, 
  currentTime,
  title,
  message,
  buttonText,
  hideButton
}) { 
  // Use custom props if provided, otherwise use defaults
  const modalTitle = title || 'Clock In Successful!';
  const modalMessage = message || 'Your attendance timer has started.';
  const timeDisplay = currentTime; 
  const buttonLabel = buttonText || 'View Event Details';

  const timerContent = (
    <View style={styles.contentContainer}>
      <TimerRing time={timeDisplay} />
    
      {!hideButton && (
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => {
            onClose();
            if (onFinish) onFinish();
          }}
        >
          <Text style={styles.viewDetailsButtonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ReusableModal
      visible={visible}
      onClose={onClose}
      title={modalTitle}
      message={modalMessage}
      children={timerContent}
      showCloseButton={false}
      primaryButton={false} 
      secondaryButton={false}
      hideFooter={true}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: -10,
  },
  viewDetailsButton: {
    backgroundColor: '#484ED4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  viewDetailsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

const timerStyles = StyleSheet.create({
  ringContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 8,
    borderColor: '#484ED41A',
  },
  ring: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});