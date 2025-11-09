import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import EventCard from '../../../components/EventCard';
import HomeHeader from '../../../components/home/HomeHeader';
import StatsCard from '../../../components/home/StatsCard';
import ZeroItems from '../../../components/ZeroItems';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { getUserDetailsState } from '../../../redux/slices/userDetailsSlice';
import colors from '../../../utils/colors/colors';

export default function HomeScreen() {
  const router = useRouter();

  const { fullTabNavigateTo } = useAppNavigation()

  const profile = useSelector(state => getUserDetailsState(state).profile)
  const flexrRequests = useSelector(state => getUserDetailsState(state).flexrRequests)
  const myRequests = useSelector(state => getUserDetailsState(state).myRequests)
  const myEvents = useSelector(state => getUserDetailsState(state).myEvents)

  const userStats = {
    eventsAttended: 10,
    eventsCreated: myEvents?.length,
    eventsInvitedFor: flexrRequests?.length
  };

  const handleProfilePress = () => {
    router.push('/profile')
  }

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleEventPress = ({ event }) => {
    router.push({
      pathname: `/event-details`,
      params: { event: JSON.stringify(event) }
    });
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        profileImage="https://via.placeholder.com/40"
        name="John Doe"
        handle="Life of the party!"
        onProfilePress={handleProfilePress}
        onActionPress={handleNotificationPress}
        showBadge={true}
        badgeCount={3}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <StatsCard
          stats={[
            { number: 10, label: 'Events Attended' },
            { number: 3, label: 'Badges Earned' },
            { number: 15, label: 'Event Invites' }
          ]}
          styles={{
            statsCard: {
              backgroundColor: 'rgb(19,190,187)',
              borderRadius: 16,
            },
            statItem: {
              backgroundColor: 'rgb(31,193,190)',
              paddingVertical: 20,
              borderRadius: 12,
            },
            statNumber: {
              fontSize: 24,
              marginBottom: 4,
            },
            statLabel: {
              fontSize: 12,
              fontWeight: '400',
            }
          }}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Events</Text>
        </View>

        {
          myEvents?.length > 0
            ?
            myEvents.map((ev) => (
              <EventCard 
                key={ev?.id}
                event={ev}
                onPress={() => handleEventPress({ event: { ...ev, hostInfo: { ...profile, image_url: profile?.profile_img }} })}
              />
            ))
            :
            <ZeroItems
              zeroText={'You have not created any event!'}
            />
        }

        <View
          style={{
            height: 1, width: '100%',
            marginVertical: 20,
            backgroundColor: colors._13BEBB
          }}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flexr Requests</Text>
        </View>

        {
          flexrRequests?.length > 0
            ?
            flexrRequests.map((req) => (
              <EventCard
                key={req?.events?.id}
                event={req?.events}
                onPress={() => handleEventPress({ event: req?.events })}
              />
            ))
            :
            <ZeroItems
              zeroText={'No flexr has requested you to partake in their event!'}
            />
        }

        <View
          style={{
            height: 1, width: '100%',
            marginVertical: 20,
            backgroundColor: colors._13BEBB
          }}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Requests</Text>
        </View>

        {
          myRequests?.length > 0
            ?
            myRequests.map((req) => (
              <EventCard
                key={req?.events?.id}
                event={req?.events}
                onPress={() => handleEventPress({ event: req?.events })}
              />
            ))
            :
            <ZeroItems
              zeroText={'You have not requested to partake in any event yet!'}
            />
        }

        {/* <TouchableOpacity
          style={styles.viewInvitationsBtn}
          onPress={handleMyEvents}
        >
          <Text style={styles.viewInvitationsText}>My events</Text>
        </TouchableOpacity> */}

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