import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onPress(event.id)}
    >
      <View style={styles.eventDate}>
        <Text style={styles.eventMonth}>{event.date.month}</Text>
        <Text style={styles.eventDay}>{event.date.day}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.eventDetails}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={[
            styles.eventStatus,
            event.status === 'Regular ticket' ? styles.statusReply : styles.statusIssue
          ]}>
            {event.status}
          </Text>
        </View>
        <Text style={styles.eventTime}>{event.time}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
        <Text style={styles.eventPrice}>{event.price}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#1E1E1E"
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'rgb(246,246,253)',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  eventDate: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  eventMonth: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E1E1E',
  },
  eventDay: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E1E1E',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgb(229,229,249)',
    marginHorizontal: 16,
    alignSelf: 'stretch',
  },
  eventDetails: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusReply: {
    color: 'rgb(215,96,160)',
    backgroundColor: 'rgb(244,236,247)',
  },
  statusIssue: {
    color: 'rgb(86,92,215)',
    backgroundColor: 'rgb(237,238,251)',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  chevronIcon: {
    position: 'absolute',
    right: 40,
    bottom: 20,
  },
});