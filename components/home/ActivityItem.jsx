import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityItem({ title, description, isLast }) {
  return (
    <View style={[styles.activityItem, isLast && styles.lastItem]}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activityItem: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});