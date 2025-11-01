import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const DUMMY_GROUPS = [
  {
    id: 'g1',
    name: 'Life of the party gang',
    description: 'A group to talk about the fun we had last night',
    icon: '🎉',
    members: [
      { id: 'm1', avatar: 'https://i.pravatar.cc/100?img=1' },
      { id: 'm2', avatar: 'https://i.pravatar.cc/100?img=2' },
      { id: 'm3', avatar: 'https://i.pravatar.cc/100?img=3' },
    ],
    memberCount: 25,
    lastMessage: '@charley: I couldn\'t meet up the hangout tim...',
    isJoined: true,
  },
  {
    id: 'g2',
    name: 'Life of the party gang',
    description: 'A group to talk about the fun we had last night',
    icon: '🎉',
    members: [
      { id: 'm1', avatar: 'https://i.pravatar.cc/100?img=4' },
      { id: 'm2', avatar: 'https://i.pravatar.cc/100?img=5' },
      { id: 'm3', avatar: 'https://i.pravatar.cc/100?img=6' },
    ],
    memberCount: 25,
    lastMessage: '@charley: I couldn\'t meet up the hangout tim...',
    isJoined: false,
  },
  {
    id: 'g3',
    name: 'Life of the party gang',
    description: 'A group to talk about the fun we had last night',
    icon: '🎉',
    members: [
      { id: 'm1', avatar: 'https://i.pravatar.cc/100?img=7' },
      { id: 'm2', avatar: 'https://i.pravatar.cc/100?img=8' },
      { id: 'm3', avatar: 'https://i.pravatar.cc/100?img=9' },
    ],
    memberCount: 25,
    lastMessage: '@charley: I couldn\'t meet up the hangout tim...',
    isJoined: false,
  },
  {
    id: 'g4',
    name: 'Life of the party gang',
    description: 'A group to talk about the fun we had last night',
    icon: '🎉',
    members: [
      { id: 'm1', avatar: 'https://i.pravatar.cc/100?img=10' },
      { id: 'm2', avatar: 'https://i.pravatar.cc/100?img=11' },
      { id: 'm3', avatar: 'https://i.pravatar.cc/100?img=12' },
    ],
    memberCount: 25,
    lastMessage: '@charley: I couldn\'t meet up the hangout tim...',
    isJoined: false,
  },
];

const GroupCard = ({ group, onJoinGroup, onGroupPress }) => {
  return (
    <Pressable style={styles.groupCard} onPress={() => onGroupPress(group.id)}>
      <View style={styles.groupHeader}>
        <View style={styles.groupIcon}>
          <Text style={styles.iconText}>{group.icon}</Text>
        </View>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.groupDescription}>{group.description}</Text>
        </View>
        <View style={styles.membersDisplay}>
          <View style={styles.memberAvatars}>
            {group.members.map((member, index) => (
              <Image
                key={member.id}
                source={{ uri: member.avatar }}
                style={[
                  styles.memberAvatar,
                  { marginLeft: index > 0 ? -12 : 0, zIndex: group.members.length - index },
                ]}
              />
            ))}
            <View style={[styles.memberAvatar, styles.memberCountBadge]}>
              <Text style={styles.memberCountText}>+{group.memberCount}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.lastMessage}>{group.lastMessage}</Text>

      {!group.isJoined && (
        <Pressable
          style={styles.joinButton}
          onPress={(e) => {
            e.stopPropagation();
            onJoinGroup(group.id);
          }}
        >
          <Text style={styles.joinButtonText}>Join Group</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

const GroupsTab = ({ onGroupPress }) => {
  const [groups, setGroups] = useState(DUMMY_GROUPS);

  const joinedGroups = groups.filter((g) => g.isJoined);
  const otherGroups = groups.filter((g) => !g.isJoined);

  const handleJoinGroup = (groupId) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, isJoined: true } : g
      )
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Your Groups Section */}
      {joinedGroups.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Your groups</Text>
          {joinedGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoinGroup={handleJoinGroup}
              onGroupPress={onGroupPress}
            />
          ))}
          {otherGroups.length > 0 && (
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Other Groups Section */}
      {otherGroups.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Other groups</Text>
          {otherGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoinGroup={handleJoinGroup}
              onGroupPress={onGroupPress}
            />
          ))}
        </View>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    marginTop: 16,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 12,
    color: '#999',
  },
  membersDisplay: {
    justifyContent: 'flex-end',
  },
  memberAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberCountBadge: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  memberCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  lastMessage: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
    marginBottom: 12,
  },
  joinButton: {
    borderWidth: 1.5,
    borderColor: '#5B5BFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9ff',
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B5BFF',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B5BFF',
  },
});

export default GroupsTab;