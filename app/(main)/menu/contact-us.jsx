import { Ionicons } from '@expo/vector-icons';
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
            <View style={styles.illustration} />
          </View>

          {/* Main Content */}
          <Text style={styles.title}>Need Help?</Text>
          <Text style={styles.subtitle}>
            {"We're here for you. Reach out anytime!"}
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
                <Ionicons name="mail" size={24} color="#5B5FED" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email address</Text>
                <Text style={styles.contactValue}>info@flexxa.com</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Phone */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={handlePhone}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="call" size={24} color="#5B5FED" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone number</Text>
                <Text style={styles.contactValue}>03930930300</Text>
              </View>
            </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    padding: 18,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    width: '100%',
    height: 220,
    backgroundColor: '#f6f6fd',
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 14,
  },
  contactContainer: {
    gap: 0,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 68,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#f6f6fd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 15,
    color: '#6B7280',
  },
});