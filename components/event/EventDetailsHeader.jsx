import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetailsHeader({
  event,
  showDetails,
  onToggleDetails,
  status,
  onUpdateAvailability,
}) {
  return (
    <>
      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      {/* Title & Price */}
      <View style={styles.titleContainer}>
        {/* Ticket Badge */}
        <View style={styles.ticketBadge}>
          <Text style={styles.ticketText}>{event.ticketType}</Text>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.priceCol}>
            <Text style={styles.eventPrice}>{event.price}</Text>
            <View style={styles.rewardBadge}>
              <Ionicons name="gift" size={12} color="#000" />
              <Text style={styles.rewardText}>{event.reward}</Text>
            </View>
          </View>
        </View>

        {status === 'available' && (
          <TouchableOpacity
            style={styles.expandButton}
            onPress={onToggleDetails}
          >
            <Ionicons
              name={showDetails ? 'chevron-up' : 'chevron-down'}
              size={34}
              color="#484ed4"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* Status Section: Renders based on status
      */}
      <View style={styles.statusContainer}>
        {status === 'available' ? (
          <View style={styles.statusRow}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={styles.statusLabel}>Status</Text>
              <View style={styles.statusLeft}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#10B981"
                />
                <Text style={styles.statusTextAvailable}>Accepted</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onUpdateAvailability}>
              <Text style={styles.updateLink}>Update Availability</Text>
            </TouchableOpacity>
          </View>
        ) : status === 'unavailable' && (
          <View style={styles.statusRow}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text style={styles.statusLabel}>Status</Text>
              <Text style={styles.statusTextUnavailable}>Unavailable</Text>
            </View>
            <TouchableOpacity onPress={onUpdateAvailability}>
              <Text style={[styles.updateLink, styles.fadedLink]}>Update Availability</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  ticketBadge: {
    backgroundColor: '#FCF4F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ticketText: {
    color: '#D75A9C',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  titleContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  expandButton: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#484ed4',
    borderRadius: 30,
    alignSelf: 'center',
    width: 70,
    height: 40,
  },
  priceCol: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f6f6fd',
    borderRadius: 10,
    padding: 4
  },
  eventPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#484ed4',
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  rewardText: {
    color: '#000',
    fontSize: 16,
  },
  statusContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: { // Added a specific style for the 'Status' header text
    fontSize: 18,
    marginTop: 4
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#cdffeeff',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  statusTextAvailable: { // Renamed from statusText for clarity
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  statusTextUnavailable: { // New style for unavailable status
    fontSize: 18,
    color: '#000', // Black text for unavailable status
    fontWeight: '400',
    paddingTop: 4
  },
  updateLink: {
    fontSize: 18,
    color: '#484ED4',
    fontWeight: '400',
  },
  fadedLink: { // New style to dim the link text
    opacity: 0.5,
  }
});