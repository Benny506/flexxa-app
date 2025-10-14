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
      date: { month: 'OCT', day: '20' },
      title: 'Blidde Pool Party',
      time: 'Fri, 12:00pm - 10:00pm',
      location: 'Chez gardens, legos',
      price: '₦4,000',
      status: 'Reply Post'
    },
    {
      id: 2,
      date: { month: 'DEC', day: '21' },
      title: 'Owonishoki Street Carnival',
      time: 'Sat, 12:00pm - 5:00pm',
      location: 'Owonishoki street, lagos',
      price: '₦2,000',
      status: 'Location Issue'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }} 
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.headerName}>John Doe</Text>
            <Text style={styles.headerHandle}>@JohnDoe</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationBadge}
          onPress={() => router.push('/notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#000" />
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
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.eventsCreated}</Text>
            <Text style={styles.statLabel}>Events Created</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.eventsHosting}</Text>
            <Text style={styles.statLabel}>Events Hosting</Text>
          </View>
        </View>

        {/* For Requests Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For Requests</Text>
        </View>

        {/* Events List */}
        {events.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.eventCard}
            onPress={() => {/* Navigate to event details */}}
          >
            <View style={styles.eventDate}>
              <Text style={styles.eventMonth}>{event.date.month}</Text>
              <Text style={styles.eventDay}>{event.date.day}</Text>
            </View>

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

            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.viewInvitationsBtn}>
          <Text style={styles.viewInvitationsText}>View Invitations</Text>
        </TouchableOpacity>

        {/* Add padding at bottom for tab bar */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#FFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#00BFA6',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
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
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  eventDate: {
    width: 50,
    alignItems: 'center',
    marginRight: 16,
  },
  eventMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  eventDetails: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusReply: {
    color: '#FF1493',
  },
  statusIssue: {
    color: '#8B7FFF',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  viewInvitationsBtn: {
    margin: 16,
    padding: 12,
    alignItems: 'center',
  },
  viewInvitationsText: {
    color: '#00BFA6',
    fontSize: 14,
    fontWeight: '500',
  },
});