import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button';

export default function NotificationsScreen() {
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [notifications, setNotifications] = useState({
    pushNotifications: false,
    eventUpdates: true,
    communityUpdates: false,
    earningsUpdates: true,
    achievements: false,
    generalUpdates: false,
  });

  const initialState = {
    pushNotifications: false,
    eventUpdates: true,
    communityUpdates: false,
    earningsUpdates: true,
    achievements: false,
    generalUpdates: false,
  };

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setHasChanges(true);
  };

  const handleReset = () => {
    setNotifications(initialState);
    setHasChanges(false);
  };

  const handleSave = () => {
     setHasChanges(false);
  };

  const notificationItems = [
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Toggle to enable/disable all notifications.',
    },
    {
      key: 'eventUpdates',
      title: 'Event Updates',
      description: 'Toggle to receive notifications about event invitations, reminders, and attendance confirmations.',
    },
    {
      key: 'communityUpdates',
      title: 'Community Updates',
      description: 'Toggle to get notified about group invites, post engagements, and community activities.',
    },
    {
      key: 'earningsUpdates',
      title: 'Earnings Updates',
      description: 'Toggle to get updates about earnings, withdrawals, and rewards.',
    },
    {
      key: 'achievements',
      title: 'Achievements',
      description: 'Toggle to receive notifications for badges, rankings, and milestones.',
    },
    {
      key: 'generalUpdates',
      title: 'General Updates',
      description: 'Toggle to receive notifications about app updates, maintenance, or announcements.',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {notificationItems.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.notificationItem,
                index === 0 && styles.firstItem,
                index === notificationItems.length - 1 && styles.lastItem
              ]}
            >
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>
                  {item.description}
                </Text>
              </View>
              <Switch
                value={notifications[item.key]}
                onValueChange={() => handleToggle(item.key)}
                trackColor={{ false: '#D1D5DB', true: '#6B7FED' }}
                thumbColor="#FFF"
                ios_backgroundColor="#D1D5DB"
                style={styles.switch}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Reset Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !hasChanges && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!hasChanges}
          activeOpacity={hasChanges ? 0.7 : 1}
        >
          <Text style={[
            styles.saveButtonText,
            !hasChanges && styles.saveButtonTextDisabled
          ]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  content: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  firstItem: {
    paddingTop: 24,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#FFF',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  resetButtonText: {
    color: '#CCC',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6B7FED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#C5CCF5',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#E8EBFC',
  },
});