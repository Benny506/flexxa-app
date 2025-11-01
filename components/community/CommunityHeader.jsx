import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityHeader = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>Flexxa Community</Text>
        <Pressable style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={26} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </Pressable>
      </View>
      
      <View style={styles.tabContainer}>
        <Pressable 
          style={styles.tabButton}
          onPress={() => setActiveTab('My Feed')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'My Feed' && styles.activeTabText
          ]}>
            My Feed
          </Text>
          {activeTab === 'My Feed' && <View style={styles.activeIndicator} />}
        </Pressable>
        
        <Pressable 
          style={styles.tabButton}
          onPress={() => setActiveTab('Groups')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'Groups' && styles.activeTabText
          ]}>
            Groups
          </Text>
          {activeTab === 'Groups' && <View style={styles.activeIndicator} />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: 'rgb(251,245,249)',
    padding: 8,
    borderRadius: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 18,
    // borderRadius: 4,
    backgroundColor: '#484ed4',
    borderRadius: 9,
    minWidth: 18,
    // height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 12,
    paddingRight: 28,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
  },
  activeTabText: {
    color: '#484ed4',
    // fontWeight: '600',
    marginBottom: 4
  },
  activeIndicator: {
  position: 'absolute',
  bottom: 1,
  left: '25%',
  width: '50%',
  height: 6,
  backgroundColor: '#484ed4',
  borderRadius: 6,
}

});

export default CommunityHeader;