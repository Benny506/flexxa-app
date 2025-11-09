// app/(flexr)/(tabs)/dashboard.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import HomeHeader from '../../../components/home/HomeHeader';
import StatsCard from '../../../components/home/StatsCard';
import EventCard from '../../../components/EventCard';
import FlexRequestCard from '../../../components/home/FlexRequestCard';
import ActivityItem from '../../../components/home/ActivityItem';

export default function FlexrDashboard() {
  const router = useRouter();

  const events = [
    {
      id: '1',
      title: 'Bikini Beach Party',
      date: '2025-01-30',
      start_time: '16:00:00',
      duration: 360,
      address: 'Giwa gardens',
      city: 'lagos',
      state: 'Lagos',
      country: 'Nigeria',
      price_reward: 0,
    },
    {
      id: '2',
      title: 'Bikini Beach Party',
      date: '2025-01-30',
      start_time: '16:00:00',
      duration: 360,
      address: 'Giwa gardens',
      city: 'lagos',
      state: 'Lagos',
      country: 'Nigeria',
      price_reward: 0,
    }
  ];

  const flexRequests = [
    {
      id: '1',
      name: 'John Doe',
      bio: '@life of the party',
      image: 'https://i.pravatar.cc/150?img=33',
    },
    {
      id: '2',
      name: 'John Doe',
      bio: '@life of the party',
      image: 'https://i.pravatar.cc/150?img=34',
    },
    {
      id: '3',
      name: 'John Doe',
      bio: '@life of the party',
      image: 'https://i.pravatar.cc/150?img=35',
    }
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'Attendance Confirmed',
      description: "You confirmed John Doe's clock-in for Concert Party at 5:30pm.",
    },
    {
      id: '2',
      title: 'Pending Payment',
      description: 'Your payment for Party Vibes is pending. Complete payment to secure your flexes.',
    },
    {
      id: '3',
      title: 'Payment Successful',
      description: 'You completed payment for Party on 20th Oct 2025',
    },
    {
      id: '4',
      title: 'Event Canceled',
      description: 'You canceled Party. Flexes have been notified.',
    }
  ];

  return (
    <View style={styles.container}>
      <HomeHeader
        profileImage="https://via.placeholder.com/40"
        name="John Doe"
        handle="Life of the party!"
        showBadge={true}
        badgeCount={3}
        onProfilePress={()=>{router.push('/flexr/profile')}}
        onActionPress={()=>{router.push('/flexr/notifications');}}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <StatsCard
          stats={[
            { number: 10, label: 'Events Organized' },
            { number: 2, label: 'Badges Earned' },
            { number: 50, label: 'Invited Guests' }
          ]}
          styles={{
            statLabel: {
              fontSize: 10,
              fontWeight: '400',
            }
          }}
        />

        {/* Your Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Events</Text>
            <TouchableOpacity onPress={() => router.push('/(flexr)/events')}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              styles={{
                eventCard: {
                  backgroundColor: '#F0F1FA',
                  marginHorizontal: 0,
                  marginBottom: 12,
                  padding: 16,
                  borderRadius: 12,
                },
                eventDate: {
                  display: 'none',
                },
                divider: {
                  display: 'none',
                },
                eventDetails: {
                  width: '90%',
                },
                eventTitle: {
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: 4,
                },
                eventTime: {
                  fontSize: 13,
                  color: '#6B7280',
                  marginBottom: 2,
                  fontWeight: '400',
                },
                eventLocation: {
                  fontSize: 13,
                  color: '#9CA3AF',
                  fontWeight: '400',
                },
                eventPrice: {
                  display: 'none',
                },
                chevronIcon: {
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: [{ translateY: 10 }],
                },
                chevronIconSize: 20,
                chevronIconColor: '#1F2937',
              }}
            />
          ))}
        </View>

        {/* Flex Requests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flex Requests</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.requestsScroll}>
            {flexRequests.map((request) => (
              <FlexRequestCard
                key={request.id}
                name={request.name}
                bio={request.bio}
                image={request.image}
                onPress={() => router.push(`/(flexr)/flex-profile/${request.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          
          <View style={styles.activitiesContainer}>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                description={activity.description}
                isLast={index === recentActivities.length - 1}
              />
            ))}

            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  requestsScroll: {
    marginTop: 12,
  },
  activitiesContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 18,
    marginTop: 12,
  },
  viewMoreButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4F46E5',
    borderRadius: 12,
    alignSelf: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
});