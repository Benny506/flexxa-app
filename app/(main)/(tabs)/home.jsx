import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EventCard from '../../../components/EventCard';

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
      status: 'Regular ticket'
    },
    {
      id: 2,
      date: { month: 'dec', day: '21' },
      title: 'Owonishoki Street Carnival',
      time: 'Sat, 12:00pm - 5:00pm',
      location: 'Owonishoki street, lagos',
      price: '₦2,000',
      status: 'Earlybird ticket'
    }
  ];

  const handleProfilePress = () => {
    router.push('/profile')
  }

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleEventPress = (eventId) => {
    router.push(`/event-details/${eventId}`);
  };

  const handleViewInvitations = () => {
  };

  return (
    <View style={styles.container}>
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flexr Requests</Text>
        </View>

        {events.map((event) => (
          <EventCard 
            key={event.id}
            event={event}
            onPress={handleEventPress}
          />
        ))}

        <TouchableOpacity
          style={styles.viewInvitationsBtn}
          onPress={handleViewInvitations}
        >
          <Text style={styles.viewInvitationsText}>View Invitations</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  viewInvitationsBtn: {
    padding: 16,
    alignItems: 'flex-end',
  },
  viewInvitationsText: {
    color: '#484ED4',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 20,
  },
});