import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data - replace with actual data from API/props
const sampleFlexes = [
  { id: '1', name: 'John Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: '2', name: 'Jane Doe', role: '@life of the party', status: 'declined', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: '3', name: 'James Doe', role: '@life of the party', status: 'pending', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: '4', name: 'Queen Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: '5', name: 'Queen Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=24' },
  { id: '6', name: 'John Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: '7', name: 'Jane Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: '8', name: 'James Doe', role: '@life of the party', status: 'accepted', avatar: 'https://i.pravatar.cc/150?img=27' },
];

export default function FlexesListScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('selected'); // 'selected', 'accepted', 'declined'

  // Filter flexes based on active tab
  const getFilteredFlexes = () => {
    switch (activeTab) {
      case 'selected':
        return sampleFlexes; // Show all in selected tab
      case 'accepted':
        return sampleFlexes.filter(flex => flex.status === 'accepted');
      case 'declined':
        return sampleFlexes.filter(flex => flex.status === 'declined');
      default:
        return sampleFlexes;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'accepted') {
      return {
        text: 'Accepted',
        color: '#10B981',
        bgColor: '#D1FAE5',
      };
    } else if (status === 'declined') {
      return {
        text: 'Declined',
        color: '#EF4444',
        bgColor: '#FEE2E2',
      };
    } else if (status === 'pending') {
      return {
        text: 'Pending',
        color: '#6366F1',
        bgColor: '#E0E7FF',
      };
    }
    return null;
  };

  const renderFlexItem = ({ item }) => {
    const statusBadge = getStatusBadge(item.status);

    return (
      <TouchableOpacity 
        style={styles.flexItem}
        onPress={() => {
          // Navigate to flex profile or details
          // router.push(`/flex-profile/${item.id}`);
        }}
      >
        <View style={styles.flexLeft}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.flexInfo}>
            <Text style={styles.flexName}>{item.name}</Text>
            <Text style={styles.flexRole}>{item.role}</Text>
          </View>
        </View>

        <View style={styles.flexRight}>
          {statusBadge && activeTab === 'selected' && (
            <View style={[styles.statusBadge, { backgroundColor: statusBadge.bgColor }]}>
              <Text style={[styles.statusText, { color: statusBadge.color }]}>
                {statusBadge.text}
              </Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flexes</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'selected' && styles.activeTab]}
          onPress={() => setActiveTab('selected')}
        >
          <Text style={[styles.tabText, activeTab === 'selected' && styles.activeTabText]}>
            Selected
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'accepted' && styles.activeTab]}
          onPress={() => setActiveTab('accepted')}
        >
          <Text style={[styles.tabText, activeTab === 'accepted' && styles.activeTabText]}>
            Accepted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'declined' && styles.activeTab]}
          onPress={() => setActiveTab('declined')}
        >
          <Text style={[styles.tabText, activeTab === 'declined' && styles.activeTabText]}>
            Declined
          </Text>
        </TouchableOpacity>
      </View>

      {/* Flexes List */}
      <FlatList
        data={getFilteredFlexes()}
        renderItem={renderFlexItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#6366F1',
  },
  listContainer: {
    paddingTop: 8,
  },
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  flexLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  flexInfo: {
    flex: 1,
  },
  flexName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  flexRole: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  flexRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
});