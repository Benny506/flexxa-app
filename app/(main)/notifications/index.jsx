import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Notifications() {
  const router = useRouter();

  const notifications = {
    today: [
      {
        id: 1,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've attended the tenth date! Life of the Party",
        description: 'You can know consider all given...',
        time: '2 mins ago',
        action: 'View invite'
      },
      {
        id: 2,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '3 mins ago',
        action: 'View invite'
      },
      {
        id: 3,
        type: 'comment',
        icon: '👤',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post',
        time: '3 mins ago',
        action: 'View comment'
      }
    ],
    yesterday: [
      {
        id: 4,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've attended the tenth date! Life of the Party",
        description: 'You can know consider all given...',
        time: '2 days ago',
        action: 'View invite'
      },
      {
        id: 5,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '2 days ago',
        action: 'View invite'
      },
      {
        id: 6,
        type: 'comment',
        icon: '👤',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post',
        time: '2 days ago',
        action: 'View comment'
      }
    ],
    fiveDaysAgo: [
      {
        id: 7,
        type: 'event',
        icon: '🎉',
        iconBg: '#E3F2FD',
        title: "You've attended the tenth date! Life of the Party",
        description: 'You can know consider all given...',
        time: '5 days ago',
        action: 'View invite'
      },
      {
        id: 8,
        type: 'invitation',
        icon: '🎊',
        iconBg: '#FCE4EC',
        title: "You've been invited to Beach Party",
        time: '5 days ago',
        action: 'View invite'
      },
      {
        id: 9,
        type: 'comment',
        icon: '👤',
        iconBg: '#E8EAF6',
        title: 'John Doe commented on your post',
        time: '5 days ago',
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
        <Text style={styles.notificationTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.notificationDescription}>{item.description}</Text>
        )}
        <View style={styles.notificationFooter}>
          <Text style={styles.notificationTime}>{item.time}</Text>
          <TouchableOpacity>
            <Text style={styles.actionLink}>{item.action}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  actionLink: {
    fontSize: 12,
    color: '#00BFA6',
    fontWeight: '500',
  },
});