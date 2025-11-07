import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// This is the ADDITIONAL content that comes after EventDetailsContent
// to match the image showing Event Category, Expected Flexes, Event Status, and Payment

export default function EventDetailsExtended({ event, attendees }) {
  const router = useRouter();
  const [eventStatus, setEventStatus] = useState('started'); // 'started' or 'completed'

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Image with Draft Badge */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event?.image_url }} 
            style={styles.eventImage} 
          />
          <View style={styles.draftBadge}>
            <Text style={styles.draftText}>Draft</Text>
          </View>
        </View>

        {/* Event Title */}
        <View style={styles.titleSection}>
          <Text style={styles.eventTitle}>{event?.title || 'Bikini Pool Party'}</Text>
        </View>

        {/* About Event */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>
            {event?.description || 
              'Dive into the ultimate poolside experience at our Bikini Pool Party! Enjoy refreshing cocktails, vibrant music, and exciting games as you mingle with fellow Flex.'}
          </Text>

          {/* Event Details Row */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.detailText}>Friday, October 20</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>07:00pm - 11:00pm (5 hours)</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.detailText}>Giwa gardens, Lagos</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="cash-outline" size={16} color="#666" />
              <Text style={styles.detailText}>N5,000</Text>
            </View>
          </View>
        </View>

        {/* Gender */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Nonbinary</Text>
            </View>
          </View>
        </View>

        {/* Guest Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Selection</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Early Bird</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Regular</Text>
            </View>
          </View>
        </View>

        {/* Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activities</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Music</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Stripping</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Social</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Games</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Networking</Text>
            </View>
          </View>
        </View>

        {/* Event Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Instructions</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.instructionText}>
              You are required to stay for a minimum of 6 hours.
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.instructionText}>
              Flex must clock in upon arrival and clock out before leaving.
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.instructionText}>
              Rewards are only available upon completion of the full attendance duration and verified clock-out.
            </Text>
          </View>
        </View>

        {/* Event Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Category</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryLabel}>Celebrity Request:</Text>
            <Text style={styles.categoryValue}>Davido</Text>
          </View>
        </View>

        {/* Expected number of Flexes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expected number of Flexes</Text>
          <View style={styles.flexesInfo}>
            <Text style={styles.flexesText}>Total number required : 15-20</Text>
            <Text style={styles.flexesConfirmed}>Flexes confirmed : 0</Text>
          </View>

          {/* Attendee Avatars */}
          <TouchableOpacity 
            style={styles.attendeesRow}
            onPress={() => router.push('/flexr/flexes-list')}
          >
            <View style={styles.avatarsContainer}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Image
                  key={index}
                  source={{ uri: `https://i.pravatar.cc/150?img=${index + 20}` }}
                  style={[styles.avatar, index > 0 && styles.avatarOverlap]}
                />
              ))}
              <View style={[styles.avatar, styles.avatarOverlap, styles.moreAvatar]}>
                <Text style={styles.moreText}>+10</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Event Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Status</Text>
          
          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => setEventStatus('started')}
          >
            <Text style={styles.radioLabel}>Started</Text>
            <View style={styles.radioOuter}>
              {eventStatus === 'started' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => setEventStatus('completed')}
          >
            <Text style={styles.radioLabel}>Completed</Text>
            <View style={styles.radioOuter}>
              {eventStatus === 'completed' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentAmount}>N110,000 total payment</Text>
            <Text style={styles.paymentStatus}>Pending payment</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Event</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  draftBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  draftText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsGrid: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#374151',
  },
  instructionItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#666',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666',
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  flexesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flexesText: {
    fontSize: 14,
    color: '#666',
  },
  flexesConfirmed: {
    fontSize: 14,
    color: '#666',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  moreAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  radioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  radioLabel: {
    fontSize: 16,
    color: '#374151',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  paymentStatus: {
    fontSize: 14,
    color: '#EC4899',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});