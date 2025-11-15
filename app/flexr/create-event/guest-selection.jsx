import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../../components/back-button';
import SetupHeader from '../../(main)/event-setup/auxiliary/SetupHeader';

export default function GuestSelection() {
  const router = useRouter();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFlex, setSelectedFlex] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const flexProfiles = [
    {
      id: 1,
      name: 'Jane Doe',
      handle: '@life of the party',
      image: 'https://i.pravatar.cc/400?img=1',
      events: 15,
      tags: ['Beach party', 'Boat cruise', 'Stripping', 'Clubbing'],
    },
    {
      id: 2,
      name: 'John Smith',
      handle: '@party starter',
      image: 'https://i.pravatar.cc/400?img=2',
      events: 23,
      tags: ['DJ', 'Music', 'Social', 'Networking'],
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      handle: '@vibe curator',
      image: 'https://i.pravatar.cc/400?img=5',
      events: 18,
      tags: ['Concerts', 'Festivals', 'Beach party', 'Social'],
    },
    {
      id: 4,
      name: 'Mike Johnson',
      handle: '@energy master',
      image: 'https://i.pravatar.cc/400?img=12',
      events: 31,
      tags: ['Clubbing', 'Dancing', 'Boat cruise', 'Party'],
    },
    {
      id: 5,
      name: 'Emily Davis',
      handle: '@fun coordinator',
      image: 'https://i.pravatar.cc/400?img=9',
      events: 12,
      tags: ['Beach party', 'Social', 'Networking', 'Events'],
    },
    {
      id: 6,
      name: 'Alex Brown',
      handle: '@hype king',
      image: 'https://i.pravatar.cc/400?img=15',
      events: 27,
      tags: ['Clubbing', 'Music', 'Dancing', 'Party'],
    },
  ];

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const currentProfile = flexProfiles[currentProfileIndex];

  const ticketCategories = [
    { id: 'early_bird', label: 'Early Bird' },
    { id: 'regular', label: 'Regular' },
    { id: 'premium', label: 'Premium' },
  ];

  const handleAccept = () => {
    if (!selectedFlex.find(f => f?.id === currentProfile?.id)) {
      setSelectedFlex([...selectedFlex, currentProfile]);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
    if (currentProfileIndex < flexProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const handleReject = () => {
    if (currentProfileIndex < flexProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const handleRemoveFlex = flexId => {
    setSelectedFlex(selectedFlex.filter(f => f.id !== flexId));
  };

  const handleNext = () => {
    console.log('Selected:', {
      ticketCategory: selectedTicket,
      selectedFlexes: selectedFlex,
    });
    router.push('/flexr/create-event/checkout');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Guest Selection</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.progressContainer}>
        <SetupHeader activeIndex={2} />
      </View>

      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.successText}>Flex Added</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Selection</Text>
          <Text style={styles.sectionSubtitle}>
            Select ticket category for your guest
          </Text>

          <View style={styles.ticketOptions}>
            {ticketCategories.map(ticket => (
              <TouchableOpacity
                key={ticket.id}
                style={[
                  styles.ticketOption,
                  selectedTicket === ticket.id && styles.ticketOptionActive,
                ]}
                onPress={() => setSelectedTicket(ticket.id)}>
                <Text
                  style={[
                    styles.ticketText,
                    selectedTicket === ticket.id && styles.ticketTextActive,
                  ]}>
                  {ticket.label}
                </Text>
                <View
                  style={[
                    styles.radioButton,
                    selectedTicket === ticket.id && styles.radioButtonActive,
                  ]}>
                  {selectedTicket === ticket.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Select Flex Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Flex</Text>

          {currentProfile && (
            <>
              <View style={styles.profileCard}>
                <View style={styles.profileProgressContainer}>
                  {flexProfiles.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.profileProgressDot,
                        index === currentProfileIndex &&
                          styles.profileProgressDotActive,
                      ]}
                    />
                  ))}
                </View>

                <Image
                  source={{ uri: currentProfile.image }}
                  style={styles.profileImage}
                />

                <View style={styles.profileOverlay}>
                  <View style={styles.profileTopRow}>
                    <View style={styles.profileInfo}>
                      <Text style={styles.profileName}>
                        {currentProfile.name}
                      </Text>
                      <Text style={styles.profileHandle}>
                        {currentProfile.handle}
                      </Text>
                    </View>

                    <View style={styles.eventsBadge}>
                      <Text style={styles.eventsNumber}>
                        {currentProfile.events}
                      </Text>
                      <Text style={styles.eventsLabel}>Events</Text>
                    </View>
                  </View>

                  <View style={styles.tagsContainer}>
                    {currentProfile.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleReject}>
                  <Ionicons name="close" size={36} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAccept}>
                  <Ionicons name="checkmark" size={40} color="#FFF" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Selected Flex Section */}
        {selectedFlex.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Flex</Text>
            <View style={styles.selectedFlexContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.selectedFlexList}>
                {selectedFlex.slice(0, 5).map(flex => (
                  <View key={flex.id} style={styles.selectedFlexItem}>
                    <Image
                      source={{ uri: flex.image }}
                      style={styles.selectedFlexImage}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveFlex(flex.id)}>
                      <Ionicons name="close-circle" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}

                {selectedFlex.length > 5 && (
                  <View style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>
                      +{selectedFlex.length - 5}
                    </Text>
                  </View>
                )}

                <TouchableOpacity style={styles.viewAllButton}>
                  <Ionicons name="chevron-forward" size={24} color="#484ED4" />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedFlex.length > 0 && styles.paymentButtonActive,
          ]}
          onPress={handleNext}>
          <Text
            style={[
              styles.paymentButtonText,
              selectedFlex.length > 0 && styles.paymentButtonTextActive,
            ]}>
            Make Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  progressContainer: { paddingHorizontal: 16, marginBottom: 24 },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  successText: { fontSize: 15, fontWeight: '600', color: '#4CAF50' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  ticketOptions: { gap: 12 },
  ticketOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  ticketOptionActive: { borderColor: '#484ED4', backgroundColor: '#F8F8FE' },
  ticketText: { fontSize: 16, color: '#333', fontWeight: '500' },
  ticketTextActive: { color: '#484ED4', fontWeight: '600' },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: { borderColor: '#484ED4' },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#484ED4',
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  profileProgressContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 6,
    zIndex: 10,
  },
  profileProgressDot: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
  profileProgressDotActive: { backgroundColor: '#FFF' },
  profileImage: { width: '100%', height: 500, backgroundColor: '#F0F0F0' },
  profileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  profileHandle: {
    fontSize: 16,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  eventsBadge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventsNumber: { fontSize: 28, fontWeight: '700', color: '#484ED4', lineHeight: 32 },
  eventsLabel: { fontSize: 13, color: '#666', marginTop: 2 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tagText: { fontSize: 14, color: '#FFF', fontWeight: '500' },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  rejectButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  acceptButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedFlexContainer: { marginTop: 8 },
  selectedFlexList: { flexDirection: 'row', gap: 12, paddingRight: 16 },
  selectedFlexItem: { position: 'relative' },
  selectedFlexImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F0F0',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewMoreButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  viewMoreText: { fontSize: 16, fontWeight: '700', color: '#666' },
  viewAllButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F8FE',
    borderWidth: 3,
    borderColor: '#484ED4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  paymentButton: {
    backgroundColor: '#E8E9F8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  paymentButtonActive: { backgroundColor: '#484ED4' },
  paymentButtonText: { color: '#B8BAE8', fontSize: 16, fontWeight: '600' },
  paymentButtonTextActive: { color: '#FFF' },
});
