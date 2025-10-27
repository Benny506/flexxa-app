import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceTimer({ isClockedIn, timeDisplay, remainingTime, status }) {

  const timerLabel = remainingTime > 0 
    ? "Attendance Timer Remaining" 
    : "Minimum Duration Met";

  const containerStyle = [
    styles.timerContainer,
    status === 'unavailable' && styles.faded
  ];

  if (status === 'unavailable') {
      return (
          <View style={containerStyle}>
              <Text style={styles.timerLabel}>Attendance Timer Elapsed</Text>
              <Text style={styles.timerDisplay}>00:00:00</Text>
          </View>
      );
  }

  if (!isClockedIn && status === 'available') {
      return null;
  }

  // Render the running timer
  return (
    <View style={containerStyle}>
      <Text style={styles.timerLabel}>{timerLabel}</Text>
      <Text style={styles.timerDisplay}>{timeDisplay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timerDisplay: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  faded: {
    opacity: 0.5,
  }
});