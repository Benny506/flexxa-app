import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../../components/back-button';
import TopInsets from '../../../components/TopInsets';
import ReusableModal from '../../../components/ReusableModal';
import { router } from 'expo-router';

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [showCongrats, setShowCongrats] = useState(false);

  // User's current stage
  const userStage = {
    rank: 5,
    title: 'Life of the Party',
    message: 'You are doing better than some flexes!',
    eventsAttended: 25,
  };

  // Top 3 leaders
  const topThree = [
    {
      id: 2,
      name: 'John Doe',
      image: 'https://i.pravatar.cc/150?img=12',
      events: 35,
      position: 2,
    },
    {
      id: 1,
      name: 'Jane Doe',
      image: 'https://i.pravatar.cc/150?img=45',
      events: 50,
      position: 1,
    },
    {
      id: 3,
      name: 'James Doe',
      image: 'https://i.pravatar.cc/150?img=33',
      events: 32,
      position: 3,
    },
  ];

  // Leaderboard list
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'John Doe',
      image: 'https://i.pravatar.cc/150?img=12',
      stage: 'Life of the Party',
      events: 30,
    },
    {
      id: 2,
      rank: 2,
      name: 'John Doe',
      image: 'https://i.pravatar.cc/150?img=13',
      stage: 'Life of the Party',
      events: 28,
    },
    {
      id: 3,
      rank: 2,
      name: 'John Doe',
      image: 'https://i.pravatar.cc/150?img=14',
      stage: 'Life of the Party',
      events: 28,
    },
  ];

  // Stages data
  const stages = [
    {
      id: 1,
      title: 'Life of the Party',
      range: '0-30 events attended',
      progress: 0.8,
      unlocked: true,
    },
    {
      id: 2,
      title: 'Social Connector',
      range: '30-50 events attended',
      progress: 0,
      unlocked: true,
    },
    {
      id: 3,
      title: 'Dependable Attendee',
      range: '50-70 events attended',
      progress: 0,
      unlocked: false,
      showDot: true,
    },
    {
      id: 4,
      title: 'Star Performance',
      range: '70-100 events attended',
      progress: 0,
      unlocked: false,
    },
  ];

  const renderLeaderboardTab = () => (
    <View style={styles.content}>
      {/* User Stage Card */}
      <View style={styles.stageCard}>
        <View style={styles.stageHeader}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>#{userStage.rank}</Text>
          </View>
          <View style={styles.stageInfo}>
            <Text style={styles.stageTitle}>{userStage.title}</Text>
            <Text style={styles.stageMessage}>{userStage.message}</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>
        <Text style={styles.eventsText}>
          {userStage.eventsAttended} events attended
        </Text>
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        <View style={styles.podiumWrapper}>
          {/* Second Place */}
          <View style={styles.podiumItem}>
            <View style={styles.positionBadge}>
              <Text style={styles.positionText}>2</Text>
            </View>
            <Image
              source={{ uri: topThree[0].image }}
              style={styles.podiumImage}
            />
            <Text style={styles.podiumName}>{topThree[0].name}</Text>
            <Text style={styles.podiumEvents}>{topThree[0].events} events</Text>
          </View>

          {/* First Place */}
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <Ionicons name="crown" size={32} color="#FFD700" />
            <Image
              source={{ uri: topThree[1].image }}
              style={[styles.podiumImage, styles.podiumImageFirst]}
            />
            <Text style={styles.podiumName}>{topThree[1].name}</Text>
            <Text style={styles.podiumEvents}>{topThree[1].events} events</Text>
          </View>

          {/* Third Place */}
          <View style={styles.podiumItem}>
            <View style={styles.positionBadge}>
              <Text style={styles.positionText}>3</Text>
            </View>
            <Image
              source={{ uri: topThree[2].image }}
              style={styles.podiumImage}
            />
            <Text style={styles.podiumName}>{topThree[2].name}</Text>
            <Text style={styles.podiumEvents}>{topThree[2].events} events</Text>
          </View>
        </View>
      </View>

      {/* Leaderboard List */}
      <View style={styles.leaderboardList}>
        {leaderboardData.map((item) => (
          <View key={item.id} style={styles.leaderboardItem}>
            <View style={styles.leaderboardLeft}>
              <Text style={styles.leaderRank}>#{item.rank}</Text>
              <Image
                source={{ uri: item.image }}
                style={styles.leaderImage}
              />
              <View>
                <Text style={styles.leaderName}>{item.name}</Text>
                <Text style={styles.leaderStage}>{item.stage}</Text>
              </View>
            </View>
            <View style={styles.leaderboardRight}>
              <Text style={styles.leaderEvents}>{item.events}</Text>
              <Text style={styles.leaderEventsLabel}>events</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStagesTab = () => (
    <View style={styles.content}>
      {stages.map((stage) => (
        <View key={stage.id} style={styles.stageItem}>
          <View style={styles.stageItemHeader}>
            <Text style={styles.stageItemTitle}>
              {stage.title}
              {stage.showDot && <Text style={styles.newDot}> •</Text>}
            </Text>
            {stage.unlocked ? (
              <Ionicons name="lock-open" size={24} color="#FFB800" />
            ) : (
              <Ionicons name="lock-closed" size={24} color="#FFB800" />
            )}
          </View>
          <View style={styles.stageProgressBar}>
            <View
              style={[
                styles.stageProgressFill,
                { width: `${stage.progress * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.stageRange}>{stage.range}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TopInsets />
      
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'leaderboard' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'leaderboard' && styles.tabTextActive,
            ]}
          >
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'stages' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('stages')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'stages' && styles.tabTextActive,
            ]}
          >
            Stages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'leaderboard' ? renderLeaderboardTab() : renderStagesTab()}
      </ScrollView>

      {/* Congratulations Modal */}
      <ReusableModal
        visible={showCongrats}
        onClose={() => setShowCongrats(false)}
        title="Congratulations!"
        message="You've unlocked the next stage Social Connector! Your dedication and participation are truly impressive. Keep attending events to climb even higher and earn more rewards!"
        iconBgColor="#FFE5F0"
        icon={
          <View style={styles.congratsIcon}>
            <View style={styles.congratsCircle} />
          </View>
        }
        primaryButton={{
          text: 'View Leaderboard',
          onPress: () => setShowCongrats(false),
          backgroundColor: 'transparent',
          textColor: '#484ED4',
          style: { borderWidth: 1, borderColor: '#484ED4' },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8E9F5',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 50,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B7DB8',
  },
  tabTextActive: {
    color: '#484ED4',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  stageCard: {
    backgroundColor: 'linear-gradient(135deg, #5B5FD4, #7B4DB8)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rankBadge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#484ED4',
  },
  stageInfo: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  stageMessage: {
    fontSize: 14,
    color: '#E8E9F5',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  eventsText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  podiumContainer: {
    backgroundColor: 'linear-gradient(180deg, #7B4DB8, #C94DB8)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  podiumWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumFirst: {
    marginTop: -20,
  },
  positionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  positionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#484ED4',
  },
  podiumImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  podiumImageFirst: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  podiumEvents: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leaderRank: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    width: 40,
  },
  leaderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  leaderStage: {
    fontSize: 13,
    color: '#666',
  },
  leaderboardRight: {
    alignItems: 'flex-end',
  },
  leaderEvents: {
    fontSize: 20,
    fontWeight: '700',
    color: '#484ED4',
  },
  leaderEventsLabel: {
    fontSize: 12,
    color: '#666',
  },
  stageItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  stageItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  newDot: {
    color: '#FF4B8B',
    fontSize: 24,
  },
  stageProgressBar: {
    height: 8,
    backgroundColor: '#E8E9F5',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  stageProgressFill: {
    height: '100%',
    backgroundColor: '#484ED4',
    borderRadius: 4,
  },
  stageRange: {
    fontSize: 14,
    color: '#666',
  },
  congratsIcon: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD0E5',
  },
});