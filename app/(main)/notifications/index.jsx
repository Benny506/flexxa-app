import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackButton from '../../../components/back-button';

export default function Notifications() {
  const router = useRouter();

  const notifications = {
    today: [
      {
        id: 1,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've unlocked the next stage: Life of the Party!",
        description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        time: '2 mins ago',
      },
      {
        id: 2,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '2 mins ago',
        action: 'View invite'
      },
      {
        id: 3,
        type: 'comment',
        icon: '💬',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post.',
        time: '2 mins ago',
        action: 'View comment'
      }
    ],
    yesterday: [
      {
        id: 4,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've unlocked the next stage: Life of the Party!",
        description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        time: '2 mins ago',
      },
      {
        id: 5,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '2 mins ago',
        action: 'View invite'
      },
      {
        id: 6,
        type: 'comment',
        icon: '💬',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post.',
        time: '2 mins ago',
        action: 'View comment'
      }
    ],
    fiveDaysAgo: [
      {
        id: 7,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've unlocked the next stage: Life of the Party!",
        description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        time: '2 mins ago',
      },
      {
        id: 8,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '2 mins ago',
        action: 'View invite'
      },
      {
        id: 9,
        type: 'comment',
        icon: '💬',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post.',
        time: '2 mins ago',
        action: 'View comment'
      }
    ]
  };

  const renderNotificationItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.notificationItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
        <Text style={styles.iconEmoji}>{item.icon}</Text>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>

        {item.description && (
          <Text style={styles.notificationDescription}>{item.description}</Text>
        )}

        {item.action && (
          <TouchableOpacity style={styles.actionContainer}>
            <Text style={styles.actionLink}>{item.action}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => router.back()} />
        </View>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {notifications.today.map(renderNotificationItem)}
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday</Text>
          {notifications.yesterday.map(renderNotificationItem)}
        </View>

        {/* 5 Days Ago Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5 days ago</Text>
          {notifications.fiveDaysAgo.map(renderNotificationItem)}
        </View>

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
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 16,
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

  // Section Styles
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 12,
  },

  // Notification Item Styles
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  iconContainer: {
    width: 52,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 20,
  },

  // Notification Content Styles
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    lineHeight: 20,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    paddingRight: 14,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },

  // Action Styles
  actionContainer: {
    marginTop: 4,
  },
  actionLink: {
    fontSize: 12,
    color: '#484ED4',
    fontWeight: '500',
  },

  // Utility Styles
  bottomSpacer: {
    height: 100,
  },
});