import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../../components/back-button';
import { dummyImages } from '../../../constants/constants';
import { getColorSchemeState } from '../../../redux/slices/colorSchemeSlice';
import { getUserDetailsState } from '../../../redux/slices/userDetailsSlice';
import { hexToRgba } from '../../../utils/utils';

export default function Profile() {
  const router = useRouter();

  const profile = useSelector(state => getUserDetailsState(state).profile)
  const myEvents = useSelector(state => getUserDetailsState(state).myEvents)
  const defaultDark = useSelector(state => getColorSchemeState(state).defaultDark)
  const flexrRequests = useSelector(state => getUserDetailsState(state).flexrRequests)

  const [activeTab, setActiveTab] = useState('badges');
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);

  const userStats = {
    eventsAttended: 10,
    eventsCreated: myEvents?.length,
    eventsInvitedFor: flexrRequests?.length
  };

  const badges = [
    {
      id: 1,
      title: 'Early Bird',
      icon: '🏅',
      earned: true,
      eventCount: 5,
    },
    {
      id: 2,
      title: 'Regular',
      icon: '🏅',
      earned: false,
      eventCount: 10,
    },
    // {
    //   id: 3,
    //   title: 'Premium',
    //   subtitle: 'N9,999 for premium upgrade',
    //   icon: '🏅',
    //   earned: false,
    //   progress: 0  // Empty bar
    // }
  ];

  const leaderboardUsers = [
    {
      id: 1,
      place: '1st place',
      events: '40 events',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      place: '2nd place',
      events: '35 events',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      place: '3rd place',
      events: '20 events',
      image: 'https://via.placeholder.com/50',
    }
  ];

  const styles = StyleSheet.create({
    // Container
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    // Header Styles
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      paddingTop: 50,
      paddingHorizontal: 24,
      marginBottom: 15
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
      paddingTop: 10,
    },
    backButtonContainer: {
      bottom: 70,
      left: -20,
    },
    headerSpacer: {
      width: 24,
    },

    // Profile Card Styles
    profileCard: {
      backgroundColor: defaultDark,
      margin: 16,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      marginTop: 70,
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 20,
      backgroundColor: '#FFF',
      marginTop: -70,
      marginBottom: 16,
      overflow: 'hidden',
      borderWidth: 4,
      borderColor: defaultDark,
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
    },
    profileName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFF',
    },
    hostBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 10,
      marginBottom: 24,
      gap: 4,
    },
    hostText: {
      fontSize: 16,
      color: defaultDark,
      fontWeight: '500',
      textTransform: 'capitalize'
    },

    // Stats Styles
    statsRow: {
      flexDirection: 'row',
      width: '100%',
      borderRadius: 12,
      justifyContent: 'space-between',
      gap: 10,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: hexToRgba({ hex: defaultDark, opacity: 0.8 }),
      paddingVertical: 20,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 11,
      color: '#FFF',
      textAlign: 'center',
    },

    // ID Verification Banner
    verificationBanner: {
      backgroundColor: '#484ED4',
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 12,
      padding: 16,
    },
    verificationBannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    verificationContent: {
      flex: 1,
    },
    verificationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      marginBottom: 4,
    },
    verificationSubtitle: {
      fontSize: 13,
      color: '#FFF',
      opacity: 0.9,
      marginBottom: 12,
    },
    verificationProgressBar: {
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      overflow: 'hidden',
    },
    verificationProgressFill: {
      height: '100%',
      width: '60%', // Adjust this to match the progress in your image
      backgroundColor: '#FFF',
      borderRadius: 2,
    },

    // Section and Tab Styles
    section: {
      backgroundColor: '#FFF',
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    tabHeader: {
      flexDirection: 'row',
      // borderBottomWidth: 1,
      // borderBottomColor: '#F0F0F0',
      gap: 20,
    },
    tab: {
      paddingTop: 16,
      paddingBottom: 8,
      alignItems: 'center',
      position: 'relative',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#999',
    },
    tabTextActive: {
      color: '#484ED4',
      fontWeight: '600',
    },
    tabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: '25%',
      right: '25%',
      height: 3,
      backgroundColor: '#484ED4',
      borderRadius: 1.5,
    },

    // Badge Styles
    tabContent: {
      padding: 16,
      backgroundColor: '#F6F6FD',
      borderRadius: 12,
      marginTop: 12,
    },
    badgeItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginBottom: 4,
    },
    badgeLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    badgeIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#FFD700',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    badgeEmoji: {
      fontSize: 28,
    },
    lockEmoji: {
      fontSize: 24,
    },
    badgeInfo: {
      flex: 1,
    },
    badgeTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
      marginBottom: 6,
    },
    badgeSubtitle: {
      fontSize: 13,
      color: '#999',
      marginTop: 4,
    },
    progressBar: {
      height: 6,
      backgroundColor: '#E0E0E0',
      borderRadius: 3,
      width: '100%',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#484ED4',
      borderRadius: 3,
    },

    // Leaderboard Styles
    leaderboardHeader: {
      backgroundColor: '#F6F6FD',
      padding: 10,
      borderRadius: 12,
      // marginBottom: 16,
    },
    leaderboardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      marginBottom: 8,
    },
    leaderboardSubtitle: {
      fontSize: 14,
      color: '#666',
      lineHeight: 18,
    },
    leaderboardGrid: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'space-between',
    },
    leaderboardUsersContainer: {
      flexDirection: 'row',
      gap: 30,
    },
    leaderboardCard: {
      alignItems: 'center',
    },
    leaderboardImageWrapper: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#E0E0E0',
      marginBottom: 8,
      overflow: 'hidden',
    },
    leaderboardUserImage: {
      width: '100%',
      height: '100%',
    },
    leaderboardPlace: {
      fontSize: 12,
      fontWeight: '600',
      color: '#484ED4',
      marginBottom: 2,
    },
    leaderboardEvents: {
      fontSize: 10,
      color: '#999',
    },
    arrowButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: '#484ED4',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },

    // Utility Styles
    bottomSpacer: {
      height: 100,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{}}>
          <BackButton onPress={() => router.back()} />
        </View>

        <Text style={styles.headerTitle}>Your Profile</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile?.profile_img || dummyImages.profile }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{profile?.full_name}, {profile?.age}</Text>
            <TouchableOpacity onPress={() => router.push('/profile/edit-profile')}>
              <Ionicons name="create-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.hostBadge}>
            <Ionicons name="flame" size={16} color={defaultDark} />
            <Text style={styles.hostText}>{profile?.usertype}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userStats.eventsAttended}</Text>
              <Text style={styles.statLabel}>Events Attended</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userStats?.eventsCreated}</Text>
              <Text style={styles.statLabel}>Events Created</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userStats?.eventsInvitedFor}</Text>
              <Text style={styles.statLabel}>Current Event Invites</Text>
            </View>
          </View>
        </View>

        {/* ID Verification Banner */}
        {showVerificationBanner && (
          <TouchableOpacity
            style={styles.verificationBanner}
            onPress={() => {
              // Handle navigation to ID verification
              console.log('Navigate to ID verification');
            }}
          >
            <View style={styles.verificationBannerContent}>
              <View style={styles.verificationContent}>
                <Text style={styles.verificationTitle}>Complete ID Verification</Text>
                <Text style={styles.verificationSubtitle}>
                  Finish verifying your ID to enjoy flexin
                </Text>
                {/* Progress Bar */}
                <View style={styles.verificationProgressBar}>
                  <View style={styles.verificationProgressFill} />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
        )}

        {/* Tabs Section */}
        <View style={styles.section}>
          {/* Tab Headers */}
          <View style={styles.tabHeader}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setActiveTab('badges')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'badges' && styles.tabTextActive
              ]}>
                Badges
              </Text>
              {activeTab === 'badges' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => setActiveTab('leaderboard')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'leaderboard' && styles.tabTextActive
              ]}>
                Leader Board
              </Text>
              {activeTab === 'leaderboard' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'badges' ? (
            // Badges Content
            <View style={styles.tabContent}>
              {badges.map((badge) => {

                const { eventCount } = badge
                
                const progress = 0 // for events that have been attended

                return(
                  <View key={badge.id} style={styles.badgeItem}>
                    <View style={styles.badgeLeft}>
                      <View style={styles.badgeIcon}>
                        <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                      </View>
                      <View style={styles.badgeInfo}>
                        <Text style={styles.badgeTitle}>{badge.title}</Text>


                        <View style={styles.progressBar}>
                          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                        </View>

                        <Text style={styles.badgeSubtitle}>{`Min of ${eventCount} events attended`}</Text>
                      </View>
                    </View>
                    <Text style={styles.lockEmoji}>
                      {true ? '🔒' : '🔓'}
                    </Text>
                  </View>
                )
              })}
            </View>
          ) : (
            // Leaderboard Content
            <View style={styles.tabContent}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.leaderboardTitle}>Life of the party</Text>
                <Text style={styles.leaderboardSubtitle}>
                  You're currently ranked 15th with 12 events. Keep partying to climb higher!
                </Text>
              </View>

              <View style={{ backgroundColor: '#efeff5', width: 'full', height: 1, marginVertical: 20, marginTop: 8 }}></View>

              <View style={styles.leaderboardGrid}>
                <View style={styles.leaderboardUsersContainer}>
                  {leaderboardUsers.map((user) => (
                    <View key={user.id} style={styles.leaderboardCard}>
                      <View>
                        <View style={styles.leaderboardImageWrapper}>
                          <Image
                            source={{ uri: user.image }}
                            style={styles.leaderboardUserImage}
                          />
                        </View>
                        <Text style={styles.leaderboardPlace}>{user.place}</Text>
                      </View>
                      <Text style={styles.leaderboardEvents}>{user.events}</Text>
                    </View>
                  ))}
                </View>

                {/* Arrow Button */}
                <TouchableOpacity style={styles.arrowButton}>
                  <Feather name="chevron-right" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}