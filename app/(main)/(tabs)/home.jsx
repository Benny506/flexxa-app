import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const userStats = {
    eventsAttended: 10,
    eventsCreated: 3,
    eventsHosting: 15
  };

  const events = [
    {
      id: 1,
      date: { month: 'oct', day: '20' },
      title: 'Bikini Pool Party',
      time: 'Fri, 12:00pm - 10:00pm',
      location: 'Chez gardens, legos',
      price: '₦4,000',
      status: 'Reply Post'
    },
    {
      id: 2,
      date: { month: 'dec', day: '21' },
      title: 'Owonishoki Street Carnival',
      time: 'Sat, 12:00pm - 5:00pm',
      location: 'Owonishoki street, lagos',
      price: '₦2,000',
      status: 'Location Issue'
    }
  ];

  const handleProfilePress = () => {
    router.push('/profile')
  }

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleEventPress = (eventId) => {
    // Navigate to event details
    // console.log('Event pressed:', eventId);
  };

  const handleViewInvitations = () => {
    // Navigate to invitations
    // console.log('View invitations pressed');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} >
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerName}>John Doe</Text>
            <Text style={styles.headerHandle}>Life of the party!</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notificationBadge}
          onPress={handleNotificationPress}
        >
          <Ionicons name="notifications" size={22} color="#000" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.eventsAttended}</Text>
            <Text style={styles.statLabel}>Events Attended</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.eventsCreated}</Text>
            <Text style={styles.statLabel}>Events Created</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.eventsHosting}</Text>
            <Text style={styles.statLabel}>Events Hosting</Text>
          </View>
        </View>

        {/* For Requests Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flexr Requests</Text>
        </View>

        {/* Events List */}
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => handleEventPress(event.id)}
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
                  event.status === 'Reply Post' ? styles.statusReply : styles.statusIssue
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
        ))}

        <TouchableOpacity
          style={styles.viewInvitationsBtn}
          onPress={handleViewInvitations}
        >
          <Text style={styles.viewInvitationsText}>View Invitations</Text>
        </TouchableOpacity>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerHandle: {
    fontSize: 12,
    color: '#999',
  },
  notificationBadge: {
    position: 'relative',
    backgroundColor: 'rgb(251,245,249)',
    padding: 8,
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },

  // Stats Card Styles
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgb(19,190,187)',
    margin: 16,
    padding: 14,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(31,193,190)',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },

  // Section Header Styles
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },

  // Event Card Styles
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

  // Event Details Styles
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

  // View Invitations Button
  viewInvitationsBtn: {
    padding: 16,
    alignItems: 'flex-end',
  },
  viewInvitationsText: {
    color: '#484ED4',
    fontSize: 14,
    fontWeight: '500',
  },

  // Utility Styles
  bottomSpacer: {
    height: 20,
  },
});