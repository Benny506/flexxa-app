import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('badges'); // 'badges' or 'leaderboard'

  const badges = [
    {
      id: 1,
      title: 'Early Bird',
      subtitle: '5/5 events attended',
      icon: '🏅',
      earned: true
    },
    {
      id: 2,
      title: 'Regular',
      subtitle: '15/20 events attended',
      icon: '🏅',
      earned: false
    },
    {
      id: 3,
      title: 'Premium',
      subtitle: '50/100 for premium upgrade',
      icon: '🏅',
      earned: false
    }
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/100' }} 
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>John Doe, 25</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.hostBadge}>
            <Ionicons name="flame" size={14} color="#FF6B6B" />
            <Text style={styles.hostText}>Host</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Events Attended</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Badges Earned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Event Invites</Text>
            </View>
          </View>
        </View>

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
              {badges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                  <View style={styles.badgeLeft}>
                    <View style={styles.badgeIcon}>
                      <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                      <Text style={styles.badgeTitle}>{badge.title}</Text>
                      <Text style={styles.badgeSubtitle}>{badge.subtitle}</Text>
                      {badge.earned && (
                        <View style={styles.progressBar}>
                          <View style={styles.progressFill} />
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.badgeEmoji}>👍</Text>
                </View>
              ))}
            </View>
          ) : (
            // Leaderboard Content
            <View style={styles.tabContent}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.leaderboardTitle}>Life of the party</Text>
                <Text style={styles.leaderboardSubtitle}>
                  You're currently ranked 15th with 12 events. Keep partCCoding to climb higher!
                </Text>
              </View>

              <View style={styles.leaderboardGrid}>
                {leaderboardUsers.map((user) => (
                  <View key={user.id} style={styles.leaderboardCard}>
                    <View style={styles.leaderboardImageWrapper}>
                      <Image 
                        source={{ uri: user.image }} 
                        style={styles.leaderboardUserImage}
                      />
                    </View>
                    <Text style={styles.leaderboardPlace}>{user.place}</Text>
                    <Text style={styles.leaderboardEvents}>{user.events}</Text>
                  </View>
                ))}

                {/* Arrow Button */}
                <TouchableOpacity style={styles.arrowButton}>
                  <Ionicons name="arrow-forward" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  profileCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00BFA6',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  hostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  hostText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginLeft: 4,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#00BFA6',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  tabTextActive: {
    color: '#5B4FFF',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#5B4FFF',
  },
  tabContent: {
    padding: 16,
  },
  badgeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  badgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  badgeSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginTop: 4,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00BFA6',
    borderRadius: 2,
    width: '100%',
  },
  leaderboardHeader: {
    backgroundColor: '#F8F4FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  leaderboardSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  leaderboardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leaderboardCard: {
    alignItems: 'center',
    flex: 1,
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
    color: '#000',
    marginBottom: 2,
  },
  leaderboardEvents: {
    fontSize: 10,
    color: '#999',
  },
  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5B4FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});