import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/back-button';

export default function ContactUsScreen() {
  const handleEmail = () => {
    Linking.openURL('mailto:info@flexxa.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:03930930300');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Contact us</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Illustration Placeholder */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <Ionicons name="chatbubbles-outline" size={80} color="#484ED4" />
            </View>
          </View>

          {/* Main Content */}
          <Text style={styles.title}>Need Help?</Text>
          <Text style={styles.subtitle}>
            We're here for you. Reach out anytime!
          </Text>

          {/* Contact Methods */}
          <View style={styles.contactContainer}>
            {/* Email */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={28} color="#484ED4" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email address</Text>
                <Text style={styles.contactValue}>info@flexxa.com</Text>
              </View>
            </TouchableOpacity>

            {/* Phone */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={handlePhone}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={28} color="#484ED4" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone number</Text>
                <Text style={styles.contactValue}>03930930300</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.infoBox}>
            <Feather name="info" size={20} color="#484ED4" />
            <Text style={styles.infoText}>
              Our support team typically responds within 24 hours during business days.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  illustration: {
    width: 160,
    height: 160,
    backgroundColor: '#F0F1FF',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  contactContainer: {
    gap: 16,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#E8E9FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F1FF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#484ED4',
    lineHeight: 20,
  },
});