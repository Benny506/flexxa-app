import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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
import ReusableModal from '../../../components/ReusableModal';

export default function MenuScreen() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      section: 'main',
      items: [
        { id: 'profile', icon: 'user', label: 'Profile', route: '/profile' },
        { id: 'leaderboard', icon: 'award', label: 'Leaderboard', route: '/menu/leaderboard' },
        { id: 'account', icon: 'credit-card', label: 'My Account Details', route: '/menu/account-details' },
      ],
    },
    {
      section: 'settings',
      items: [
        { id: 'notifications', icon: 'bell', label: 'Notifications Preferences', route: '/menu/notifications' },
        { id: 'security', icon: 'shield', label: 'Security', route: '/menu/security' },
        { id: 'faqs', icon: 'help-circle', label: 'FAQs', route: '/menu/faqs' },
        { id: 'contact', icon: 'mail', label: 'Contact Us', route: '/menu/contact-us' },
        { id: 'review', icon: 'star', label: 'Review & Rate', route: '/menu/review' },
      ],
    },
    {
      section: 'legal',
      items: [
        { id: 'terms', icon: 'file-text', label: 'Terms of Service', route: '/menu/terms' },
        { id: 'privacy', icon: 'lock', label: 'Privacy Policy', route: '/menu/privacy' },
      ],
    },
  ];

  const handleMenuPress = (route) => {
    if (route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Add logout logic here
    router.replace('/auth/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.headerTitle}>Menu</Text>

          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe, 25</Text>
            </View>
            <TouchableOpacity style={styles.flexBadge}>
              <Ionicons name="flame" size={18} color="#FFF" />
              <Text style={styles.flexText}>Flex</Text>
            </TouchableOpacity>
          </View>

          {/* Main Menu Items */}
          <View style={styles.menuSection}>
            {menuItems[0].items.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <Feather name={item.icon} size={20} color="#666" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <Feather name="chevron-right" size={26} color="#1e1e1e" />
                </TouchableOpacity>
                {index !== menuItems[0].items.length - 1 && (
                  <View style={styles.borderDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Settings Menu Items */}
          <View style={styles.menuSection}>
            {menuItems[1].items.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <Feather name={item.icon} size={20} color="#666" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#1e1e1e" />
                </TouchableOpacity>
                {index !== menuItems[1].items.length - 1 && (
                  <View style={styles.borderDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Legal Menu Items */}
          <View style={styles.menuSection}>
            {menuItems[2].items.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <Feather name={item.icon} size={20} color="#666" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#1e1e1e" />
                </TouchableOpacity>
                {index !== menuItems[2].items.length - 1 && (
                  <View style={styles.borderDivider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Logout Button */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.logoutItem}
              onPress={() => setShowLogoutModal(true)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Feather name='log-out' size={20} color="#666" />
                </View>
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <ReusableModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Exit Group?"
        message="Are you sure you want to leave this group?
You’ll no longer have access to posts, updates, or discussions from this group."
        primaryButton={{
          text: 'Confirm Exit',
          onPress: handleLogout,
          backgroundColor: '#484ED4',
        }}
        secondaryButton={{
          text: 'Cancel',
          onPress: () => setShowLogoutModal(false),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 28,
    letterSpacing: -0.5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f6f6fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    letterSpacing: -0.2,
  },
  flexBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFA5',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    gap: 4,
  },
  flexText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#f6f6fd',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  borderDivider: {
    height: 1,
    backgroundColor: '#edeefb',
    marginHorizontal: 18, 
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  logoutText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
    letterSpacing: -0.2,
  },
});